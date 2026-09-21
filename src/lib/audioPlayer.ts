'use client';

/**
 * 全局音频播放工具（针对 iOS Safari 自动播放策略专门优化）
 *
 * 原理：
 *   - HTMLAudioElement 的"用户手势解锁"在 iOS Safari 上仅持续约 1–2 秒，
 *     等 5–15 秒的 LLM + TTS 网络往返回来后早已失效，导致必须再点一次。
 *   - 改用 Web Audio API（AudioContext.resume + decodeAudioData + BufferSource）：
 *     只要在用户手势下执行过一次 ctx.resume() 并播放过任意数据，
 *     iOS Safari 就会对该 AudioContext 永久放行，之后（哪怕是几小时后）
 *     的 decodeAudioData/start(0) 都不再做手势检查 → 手机端也能自动播。
 */

// 全局单例：整个应用共用同一个被"祝福"过的 AudioContext
let sharedCtx: AudioContext | null = null;
let isBlessed = false;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedCtx) {
    try {
      const Ctor =
        (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctor) {
        sharedCtx = new Ctor();
      }
    } catch {
      return null;
    }
  }
  return sharedCtx;
}

/**
 * 在用户手势下调用此函数 → 永久解锁 AudioContext。
 * 必须在 click/touchstart 等用户手势事件回调里同步执行（不能 await 任何东西之后）。
 */
export function blessAudioOnUserGesture(): void {
  const ctx = getCtx();
  if (!ctx) {
    // 降级：HTMLAudio 静默播放兜底
    try {
      const silentWav =
        'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=';
      const a = new Audio(silentWav);
      a.volume = 0;
      a.play().catch(() => {});
    } catch {
      /* ignore */
    }
    return;
  }

  // 1) 先 resume（必须在用户手势同步栈里执行才有效）
  if (ctx.state === 'suspended') {
    try {
      ctx.resume().catch(() => {});
    } catch {
      /* ignore */
    }
  }

  // 2) 再播放一个 1-sample 的静音 buffer（iOS 要真正"推了数据过声卡"才算解锁）
  try {
    const buffer = ctx.createBuffer(1, 1, ctx.sampleRate || 22050);
    const data = buffer.getChannelData(0);
    data[0] = 0;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    // 兼容老 Safari：onended 不能为 undefined 时才 start
    try {
      src.start(0);
    } catch {
      /* ignore */
    }
    isBlessed = true;
  } catch {
    /* ignore */
  }
}

/** 当前 AudioContext 是否已被永久解锁（仅用于调试/降级判断） */
export function isAudioBlessed(): boolean {
  return isBlessed && getCtx()?.state === 'running';
}

// 正在播放的 BufferSource（便于 stop/pause 复用）
interface ActivePlayback {
  source: AudioBufferSourceNode;
  gain: GainNode;
  onEnded?: () => void;
  onError?: () => void;
}

let currentPlayback: ActivePlayback | null = null;
let currentStreamReader: ReadableStreamDefaultReader<Uint8Array> | null = null;

/** 停止当前播放（切换消息/静音时调用） */
export function stopActivePlayback(): void {
  // 取消正在进行的流式读取
  if (currentStreamReader) {
    try {
      currentStreamReader.cancel();
    } catch {
      /* ignore */
    }
    currentStreamReader = null;
  }
  if (currentPlayback) {
    try {
      currentPlayback.onEnded = undefined;
      currentPlayback.source.onended = null;
      currentPlayback.source.stop(0);
    } catch {
      /* ignore */
    }
    try {
      currentPlayback.source.disconnect();
      currentPlayback.gain.disconnect();
    } catch {
      /* ignore */
    }
    currentPlayback = null;
  }
}

/**
 * 用 Web Audio API 播放一个远程音频 URL。
 *
 * 返回 Promise：resolve 表示播放启动成功，reject 表示需要降级到 HTMLAudio。
 * @param onPlay 开始播放触发（用于 UI 状态）
 * @param onEnded 自然播放结束时回调
 * @param onError 播放错误回调
 */
export async function playWithWebAudio(
  url: string,
  handlers: {
    onPlay?: () => void;
    onEnded?: () => void;
    onError?: () => void;
  } = {},
): Promise<void> {
  const ctx = getCtx();
  if (!ctx) throw new Error('AudioContext not available');
  // 兜底再 resume 一次（万一之前没 bless 成功）
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      /* ignore */
    }
  }

  // 先下载 + decode
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`fetch ${resp.status}`);
  const ab = await resp.arrayBuffer();
  let buffer: AudioBuffer;
  try {
    buffer = await ctx.decodeAudioData(ab.slice(0));
  } catch (e) {
    // 某些浏览器 decodeAudioData 不接受被 transfer 的 buffer，所以 slice 一份
    buffer = await ctx.decodeAudioData(ab);
  }

  // 停止前一条
  stopActivePlayback();

  // 构造播放管线：BufferSource → GainNode → destination
  const gain = ctx.createGain();
  gain.gain.value = 1;
  gain.connect(ctx.destination);

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.connect(gain);

  src.onended = () => {
    handlers.onEnded?.();
    if (currentPlayback?.source === src) {
      try {
        src.disconnect();
        gain.disconnect();
      } catch {
        /* ignore */
      }
      currentPlayback = null;
    }
  };
  // BufferSource 本身没有 onerror；用 try/catch start + ended 兜底错误状态
  (src as AudioBufferSourceNode & { onerror?: () => void }).onerror = () => {
    handlers.onError?.();
  };

  currentPlayback = { source: src, gain, ...handlers };
  try {
    src.start(0);
    handlers.onPlay?.();
    isBlessed = true;
  } catch (e) {
    handlers.onError?.();
    throw e;
  }
}

// ====== 流式 TTS 播放 ======

function wrapPcmInWav(
  pcm: Uint8Array,
  sampleRate: number,
  bitsPerSample: number,
  channels: number,
): Uint8Array {
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcm.length;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  bytes.set([0x52, 0x49, 0x46, 0x46], 0);
  view.setUint32(4, 36 + dataSize, true);
  bytes.set([0x57, 0x41, 0x56, 0x45], 8);
  bytes.set([0x66, 0x6d, 0x74, 0x20], 12);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  bytes.set([0x64, 0x61, 0x74, 0x61], 36);
  view.setUint32(40, dataSize, true);

  bytes.set(pcm, 44);
  return bytes;
}

function uint8ToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * 流式播放 TTS：读取 SSE 响应流，逐段解码播放。
 *
 * 返回合并后的 WAV data URI，用于后续重播。
 */
export async function playTtsStream(
  response: Response,
  handlers: {
    onPlay?: () => void;
    onEnded?: () => void;
    onError?: () => void;
  } = {},
): Promise<string | null> {
  const ctx = getCtx();
  if (!ctx) throw new Error('AudioContext not available');

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      /* ignore */
    }
  }

  stopActivePlayback();

  const reader = response.body!.getReader();
  currentStreamReader = reader;

  const decoder = new TextDecoder();
  let sseBuffer = '';
  let streamEnded = false;

  const queue: AudioBuffer[] = [];
  let isPlaying = false;
  let startedPlaying = false;

  const allPcmChunks: Uint8Array[] = [];
  const SAMPLE_RATE = 24000;

  const playNext = () => {
    if (queue.length === 0) {
      isPlaying = false;
      if (streamEnded) {
        handlers.onEnded?.();
      }
      return;
    }

    const buffer = queue.shift()!;
    const gain = ctx.createGain();
    gain.gain.value = 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(gain);
    gain.connect(ctx.destination);

    src.onended = () => {
      try {
        src.disconnect();
        gain.disconnect();
      } catch {
        /* ignore */
      }
      if (currentPlayback?.source === src) currentPlayback = null;
      playNext();
    };

    (src as AudioBufferSourceNode & { onerror?: () => void }).onerror = () => {
      handlers.onError?.();
    };

    currentPlayback = { source: src, gain, ...handlers };
    try {
      src.start(0);
      isPlaying = true;
      if (!startedPlaying) {
        startedPlaying = true;
        handlers.onPlay?.();
      }
    } catch {
      handlers.onError?.();
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        streamEnded = true;
        if (!isPlaying && queue.length === 0) {
          handlers.onEnded?.();
        }
        break;
      }

      sseBuffer += decoder.decode(value, { stream: true });
      const lines = sseBuffer.split('\n');
      sseBuffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const jsonStr = line.slice(5).trim();
        if (!jsonStr) continue;

        let event: { audio?: string; done?: boolean; error?: string };
        try {
          event = JSON.parse(jsonStr);
        } catch {
          continue;
        }

        if (event.error) {
          handlers.onError?.();
          return null;
        }

        if (event.done) {
          streamEnded = true;
          if (!isPlaying && queue.length === 0) {
            handlers.onEnded?.();
          }
          continue;
        }

        if (event.audio) {
          // base64 WAV → Uint8Array
          const binaryStr = atob(event.audio);
          const wavBytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
            wavBytes[i] = binaryStr.charCodeAt(i);
          }

          // 提取 PCM（跳过 44 字节 WAV 头），用于后续重播
          const pcm = wavBytes.slice(44);
          if (pcm.length > 0) {
            allPcmChunks.push(pcm);
          }

          // 解码 WAV 片段并加入播放队列
          try {
            const audioBuffer = await ctx.decodeAudioData(wavBytes.buffer.slice(0));
            queue.push(audioBuffer);
            if (!isPlaying) playNext();
          } catch {
            // decodeAudioData 可能因片段过小失败，跳过
          }
        }
      }
    }
  } catch {
    handlers.onError?.();
  } finally {
    currentStreamReader = null;
  }

  // 构建完整 WAV data URI，供重播使用
  if (allPcmChunks.length > 0) {
    const totalLen = allPcmChunks.reduce((s, c) => s + c.length, 0);
    const combined = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of allPcmChunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }
    const wav = wrapPcmInWav(combined, SAMPLE_RATE, 16, 1);
    return `data:audio/wav;base64,${uint8ToBase64(wav)}`;
  }

  return null;
}
