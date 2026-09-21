import { NextRequest, NextResponse } from 'next/server';
import { cleanTextForSpeech, assertQwenEnv, safeLogError } from '@/lib/utils';
import WebSocket from 'ws';

export const runtime = 'nodejs';
export const maxDuration = 15;

interface TTSRequest {
  text: string;
  speaker: string;
  uid: string;
}

interface TTSResponse {
  audioUri: string;
  audioSize: number;
}

const QWEN_TTS_WS_URL =
  'wss://maas.qianwenaiapi.com/api-ws/v1/realtime?model=qwen3-tts-flash-realtime';

function makeEventId(): string {
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function wrapPcmInWav(pcm: Buffer, sampleRate: number, bitsPerSample: number, channels: number): Buffer {
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcm.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcm]);
}

export async function POST(request: NextRequest) {
  try {
    const body: TTSRequest = await request.json();
    const { text, speaker } = body;

    if (!text || !speaker) {
      return NextResponse.json(
        { error: 'Missing required parameters: text, speaker' },
        { status: 400 },
      );
    }

    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) {
      return NextResponse.json(
        { error: 'Text is empty after cleaning' },
        { status: 400 },
      );
    }

    assertQwenEnv('POST /api/tts');

    const apiKey = process.env.QWEN_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'QWEN_API_KEY is not configured', audioUri: '', audioSize: 0 },
        { status: 500 },
      );
    }

    const audioChunks: Buffer[] = [];
    let responseDone = false;
    let ws: WebSocket;

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        try { ws.close(); } catch { /* noop */ }
        reject(new Error('WebSocket timeout after 14s'));
      }, 14000);

      ws = new WebSocket(QWEN_TTS_WS_URL, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      ws.on('open', () => {
        console.log('[POST /api/tts] WebSocket connected');
      });

      ws.on('unexpected-response', (_req, res) => {
        let body = '';
        res.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        res.on('end', () => {
          clearTimeout(timeout);
          reject(new Error(`WebSocket handshake failed: ${res.statusCode} ${body}`));
        });
      });

      ws.on('message', (data: Buffer, isBinary: boolean) => {
        if (isBinary) return;

        let msg: { type?: string; delta?: string; error?: { message?: string } };
        try {
          msg = JSON.parse(data.toString());
        } catch {
          return;
        }

        console.log(`[POST /api/tts] WS message: ${msg.type}`);

        switch (msg.type) {
          case 'session.created':
            console.log(`[POST /api/tts] Session created, voice=${speaker}, text="${cleanText.slice(0, 50)}"`);
            ws.send(JSON.stringify({
              event_id: makeEventId(),
              type: 'session.update',
              session: {
                voice: speaker,
                mode: 'server_commit',
                language_type: 'Chinese',
                response_format: 'pcm',
                sample_rate: 24000,
              },
            }));
            break;

          case 'session.updated':
            console.log(`[POST /api/tts] Sending text to TTS: "${cleanText}" (length=${cleanText.length}, bytes=${Buffer.byteLength(cleanText, 'utf-8')})`);
            ws.send(JSON.stringify({
              event_id: makeEventId(),
              type: 'input_text_buffer.append',
              text: cleanText,
            }));
            // Small delay to ensure append is processed before commit
            setTimeout(() => {
              try {
                ws.send(JSON.stringify({
                  event_id: makeEventId(),
                  type: 'input_text_buffer.commit',
                }));
              } catch { /* ws may have closed */ }
            }, 100);
            break;

          case 'input_text_buffer.committed':
            // Don't send session.finish yet - wait for response.done
            // The server will start synthesis after commit in server_commit mode
            break;

          case 'response.created':
            console.log('[POST /api/tts] Response generation started');
            break;

          case 'response.audio.delta':
            if (msg.delta) {
              audioChunks.push(Buffer.from(msg.delta, 'base64'));
            }
            break;

          case 'response.done':
            responseDone = true;
            console.log(`[POST /api/tts] Response done, audio chunks: ${audioChunks.length}`);
            // Now safe to finish the session
            try {
              ws.send(JSON.stringify({
                event_id: makeEventId(),
                type: 'session.finish',
              }));
            } catch { /* ws may already be closing */ }
            clearTimeout(timeout);
            resolve();
            break;

          case 'session.finished':
            clearTimeout(timeout);
            try { ws.close(); } catch { /* noop */ }
            resolve();
            break;

          case 'error':
            clearTimeout(timeout);
            const errMsg = msg.error?.message || 'Unknown WebSocket error';
            console.error(`[POST /api/tts] WS error: ${errMsg}`);
            try { ws.close(); } catch { /* noop */ }
            reject(new Error(errMsg));
            break;
        }
      });

      ws.on('error', (err: Error) => {
        clearTimeout(timeout);
        reject(new Error(`WebSocket error: ${err.message}`));
      });

      ws.on('close', (code: number, reason: Buffer) => {
        clearTimeout(timeout);
        console.log(`[POST /api/tts] WS closed: code=${code} reason=${reason.toString()}`);
        if (!responseDone && audioChunks.length === 0) {
          reject(new Error(`WebSocket closed before synthesis completed (code=${code})`));
        } else {
          resolve();
        }
      });
    });

    if (audioChunks.length === 0) {
      return NextResponse.json(
        { error: 'TTS generation failed: no audio data', audioUri: '', audioSize: 0 },
        { status: 500 },
      );
    }

    const pcmData = Buffer.concat(audioChunks);
    const wavBuffer = wrapPcmInWav(pcmData, 24000, 16, 1);

    const result: TTSResponse = {
      audioUri: `data:audio/wav;base64,${wavBuffer.toString('base64')}`,
      audioSize: wavBuffer.length,
    };

    return NextResponse.json(result);
  } catch (error) {
    safeLogError('POST /api/tts', error);
    return NextResponse.json(
      { error: 'TTS generation failed', audioUri: '', audioSize: 0 },
      { status: 500 },
    );
  }
}
