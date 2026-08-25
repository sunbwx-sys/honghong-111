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

/** 停止当前播放（切换消息/静音时调用） */
export function stopActivePlayback(): void {
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
