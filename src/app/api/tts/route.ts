import { NextRequest, NextResponse } from 'next/server';
import { cleanTextForSpeech } from '@/lib/utils';

export const runtime = 'nodejs';
export const maxDuration = 15; // Vercel Serverless Function 最大执行时长，EdgeOne 会忽略此字段

interface TTSRequest {
  text: string;
  speaker: string;
  uid: string;
}

interface TTSResponse {
  audioUri: string;
  audioSize: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: TTSRequest = await request.json();
    const { text, speaker, uid } = body;

    if (!text || !speaker || !uid) {
      return NextResponse.json(
        { error: 'Missing required parameters: text, speaker, uid' },
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

    // ⚠️ 动态 import coze SDK，避免模块加载阶段抛异常导致平台层返回 500
    const { TTSClient, Config, HeaderUtils } = await import('coze-coding-dev-sdk');

    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config({ timeout: 15000 });
    const client = new TTSClient(config, customHeaders);

    const response = await client.synthesize({
      uid,
      text: cleanText,
      speaker,
      audioFormat: 'mp3',
    });

    const result: TTSResponse = {
      audioUri: response.audioUri,
      audioSize: response.audioSize,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('TTS API error:', error);
    // ⚠️ 语音生成失败不影响游戏，返回空结果
    return NextResponse.json(
      { error: 'TTS generation failed', audioUri: '', audioSize: 0 },
      { status: 500 },
    );
  }
}
