import { NextRequest, NextResponse } from 'next/server';
import { cleanTextForSpeech, assertQwenEnv, safeLogError, sanitizeSecrets } from '@/lib/utils';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface TTSRequest {
  text: string;
  speaker: string;
  uid: string;
}

interface TTSResponse {
  audioUri: string;
  audioSize: number;
}

const QWEN_TTS_HTTP_URL =
  'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';

interface QwenTTSResponse {
  status_code?: number;
  code?: string;
  message?: string;
  output?: {
    audio?: {
      url?: string;
      data?: string;
    };
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

    const response = await fetch(QWEN_TTS_HTTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
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

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(
        `Qwen TTS HTTP ${response.status}: ${sanitizeSecrets(errText)}`,
      );
    }

    const data: QwenTTSResponse = await response.json();

    if (data.status_code && data.status_code !== 200) {
      throw new Error(
        `Qwen TTS error: ${data.code || ''} ${data.message || ''}`,
      );
    }

    const audio = data.output?.audio;
    if (!audio) {
      throw new Error('Qwen TTS: no audio in response');
    }

    // 非流式模式：data 字段有 base64 音频，url 字段有 OSS 链接
    if (audio.data) {
      const result: TTSResponse = {
        audioUri: `data:audio/wav;base64,${audio.data}`,
        audioSize: audio.data.length,
      };
      return NextResponse.json(result);
    }

    // 如果只有 url，下载音频转成 base64 data URI
    if (audio.url) {
      const audioRes = await fetch(audio.url, {
        signal: AbortSignal.timeout(10000),
      });
      if (!audioRes.ok) {
        throw new Error(`Failed to download audio from OSS: ${audioRes.status}`);
      }
      const audioBuffer = Buffer.from(await audioRes.arrayBuffer());
      const result: TTSResponse = {
        audioUri: `data:audio/wav;base64,${audioBuffer.toString('base64')}`,
        audioSize: audioBuffer.length,
      };
      return NextResponse.json(result);
    }

    throw new Error('Qwen TTS: no audio data or url in response');
  } catch (error) {
    safeLogError('POST /api/tts', error);
    return NextResponse.json(
      { error: 'TTS generation failed', audioUri: '', audioSize: 0 },
      { status: 500 },
    );
  }
}
