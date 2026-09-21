import { NextRequest, NextResponse } from 'next/server';
import { cleanTextForSpeech, assertQwenEnv, safeLogError, sanitizeSecrets } from '@/lib/utils';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface TTSRequest {
  text: string;
  speaker: string;
  uid: string;
}

const QWEN_TTS_HTTP_URL =
  'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';

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

interface QwenTTSChunk {
  status_code?: number;
  code?: string;
  message?: string;
  output?: {
    audio?: {
      url?: string;
      data?: string;
    };
    finish_reason?: string;
  };
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

    // 使用 SSE 流式模式——音频片段边合成边返回
    const qwenResponse = await fetch(QWEN_TTS_HTTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-DashScope-SSE': 'enable',
      },
      body: JSON.stringify({
        model: 'qwen3-tts-flash',
        input: {
          text: cleanText,
          voice: speaker,
          language_type: 'Chinese',
        },
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!qwenResponse.ok) {
      const errText = await qwenResponse.text().catch(() => '');
      throw new Error(`Qwen TTS HTTP ${qwenResponse.status}: ${sanitizeSecrets(errText)}`);
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = qwenResponse.body!.getReader();
        const decoder = new TextDecoder();
        let sseBuffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            sseBuffer += decoder.decode(value, { stream: true });
            const lines = sseBuffer.split('\n');
            sseBuffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.startsWith('data:')) continue;
              const jsonStr = line.slice(5).trim();
              if (!jsonStr) continue;

              try {
                const chunk: QwenTTSChunk = JSON.parse(jsonStr);

                if (chunk.status_code && chunk.status_code !== 200) {
                  throw new Error(`Qwen TTS: ${chunk.code || ''} ${chunk.message || ''}`);
                }

                const audioData = chunk.output?.audio?.data;
                if (audioData) {
                  // 将 PCM 片段包裹成 WAV 发给前端
                  const pcm = Buffer.from(audioData, 'base64');
                  const wav = wrapPcmInWav(pcm, 24000, 16, 1);
                  const b64 = wav.toString('base64');
                  controller.enqueue(encoder.encode(`data:{"audio":"${b64}"}\n\n`));
                }
              } catch {
                // 跳过无法解析的行
              }
            }
          }
          controller.enqueue(encoder.encode('data:{"done":true}\n\n'));
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          controller.enqueue(encoder.encode(`data:{"error":"${msg.replace(/"/g, '\\"')}"}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    safeLogError('POST /api/tts', error);
    return NextResponse.json(
      { error: 'TTS generation failed', audioUri: '', audioSize: 0 },
      { status: 500 },
    );
  }
}
