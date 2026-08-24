'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw, VolumeOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AffectionBar } from '@/components/AffectionBar';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useGame } from '@/context/GameContext';
import {
  type Option,
  VOICE_CONFIG,
  MAX_ROUNDS,
  WIN_AFFECTION,
  MIN_AFFECTION,
  type Message,
} from '@/types/game';

// ⚠️ 清理文本中的括号和动作描述
function cleanTextForSpeech(text: string): string {
  return text
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/[「」『』]/g, '')
    .trim();
}

// 生成唯一消息ID
function getMessageId(message: Message, index: number): string {
  return `${message.role}-${index}-${message.content.slice(0, 20)}`;
}

export default function GameScreen() {
  const {
    gameState,
    selectOption,
    addPartnerMessage,
    resetGame,
  } = useGame();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentAudioMessageId, setCurrentAudioMessageId] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');

  const isGeneratingRef = useRef(false);
  const lastGeneratedMessageCountRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const lastPartnerMessage = gameState.messages.findLast(
    (m) => m.role === 'partner',
  );
  const lastPartnerIndex = gameState.messages.findLastIndex(
    (m) => m.role === 'partner',
  );

  // 滚动到底部
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [gameState.messages, isLoading, scrollToBottom]);

  // ⚠️ 生成下一轮对话
  const generateNextRound = useCallback(async () => {
    // 防重复生成
    // 注意：第一轮（step=1 且消息为空）时不做消息数判断，否则首次永远不会触发
    const isFirstRound = gameState.step === 1 && gameState.messages.length === 0;
    if (
      isGeneratingRef.current ||
      (!isFirstRound &&
        lastGeneratedMessageCountRef.current === gameState.messages.length)
    ) {
      return;
    }

    // 只有当选项为空时才需要生成
    if (gameState.currentOptions.length > 0) {
      return;
    }

    // ⚠️ 根据当前状态计算是否应该结束（不依赖 gameOver 标志）
    // 因为 gameOver 在 ADD_PARTNER_MESSAGE 后才设置
    const shouldEnd =
      gameState.affection >= WIN_AFFECTION ||
      gameState.affection <= MIN_AFFECTION ||
      gameState.step >= MAX_ROUNDS;

    // 如果已经结束且最后一条是对方消息，就不生成了
    if (gameState.gameOver && lastPartnerIndex >= 0) {
      const lastMsg = gameState.messages[gameState.messages.length - 1];
      if (lastMsg?.role === 'partner') {
        return;
      }
    }

    isGeneratingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gender: gameState.gender,
          scenario: gameState.scenario?.title,
          messages: gameState.messages,
          affection: gameState.affection,
          step: gameState.step,
          isGameOver: shouldEnd,
          won: gameState.affection >= WIN_AFFECTION,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      const { partnerMessage, options } = data;

      if (partnerMessage) {
        addPartnerMessage(partnerMessage, options || []);
        lastGeneratedMessageCountRef.current = gameState.messages.length + 1;
      }
    } catch (err) {
      console.error('Generate error:', err);
      setError('生成失败，请重试');
    } finally {
      setIsLoading(false);
      isGeneratingRef.current = false;
    }
  }, [
    gameState.step,
    gameState.gender,
    gameState.scenario,
    gameState.messages,
    gameState.affection,
    gameState.currentOptions.length,
    gameState.gameOver,
    gameState.won,
    addPartnerMessage,
  ]);

  // ⚠️ 监听轮次和选项变化触发生成
  // 触发条件：step > 0 且选项为空
  // 注意：游戏结束时最后一条若是用户消息，也会触发（因为 options 为空）
  useEffect(() => {
    if (gameState.step > 0 && gameState.currentOptions.length === 0) {
      generateNextRound();
    }
  }, [
    gameState.step,
    gameState.currentOptions.length,
    generateNextRound,
  ]);

  // ⚠️ 语音生成逻辑 - 检测新的对方消息
  useEffect(() => {
    if (
      !lastPartnerMessage ||
      !gameState.voiceType ||
      isMuted ||
      (gameState.gameOver === false && gameState.currentOptions.length === 0)
    ) {
      return;
    }

    const messageId = getMessageId(lastPartnerMessage, lastPartnerIndex);

    // 检测到新消息，生成新语音
    if (currentAudioMessageId !== messageId) {
      setAudioUri(undefined);
      setCurrentAudioMessageId(messageId);
      setIsPlaying(false);

      const voiceConfig = VOICE_CONFIG[gameState.voiceType];
      const cleanText = cleanTextForSpeech(lastPartnerMessage.content);

      if (!cleanText) return;

      const generateAudio = async () => {
        try {
          const response = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: cleanText,
              speaker: voiceConfig.speaker,
              uid: `game-${Date.now()}`,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.audioUri) {
              setAudioUri(data.audioUri);
              // ⚠️ 自动播放语音（如果未静音）
              if (!isMuted) {
                setTimeout(() => {
                  const audio = new Audio(data.audioUri);
                  audioRef.current = audio;
                  audio.onplay = () => setIsPlaying(true);
                  audio.onended = () => setIsPlaying(false);
                  audio.onerror = () => setIsPlaying(false);
                  audio.play().catch(() => {
                    setIsPlaying(false);
                  });
                }, 300);
              }
            }
          }
        } catch (err) {
          console.error('TTS error:', err);
          // 语音失败不影响游戏
        }
      };

      generateAudio();
    }
  }, [
    lastPartnerMessage,
    lastPartnerIndex,
    gameState.voiceType,
    currentAudioMessageId,
    gameState.gameOver,
    gameState.currentOptions.length,
    isMuted,
  ]);

  // 播放语音
  const handlePlayAudio = useCallback(() => {
    if (!audioUri) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(audioUri);
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, [audioUri]);

  // 切换静音
  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (newMuted && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (!newMuted && audioUri) {
        // 取消静音后自动播放当前语音
        handlePlayAudio();
      }
      return newMuted;
    });
  }, [audioUri, handlePlayAudio]);

  // 选择选项
  const handleSelectOption = useCallback(
    (option: Option) => {
      if (isLoading || gameState.gameOver) return;

      // ⚠️ 重置语音状态
      setAudioUri(undefined);
      setCurrentAudioMessageId(null);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      selectOption(option);
    },
    [isLoading, gameState.gameOver, selectOption],
  );

  // 自定义回复：固定 +10 分，复用选项提交流程
  const handleSendCustom = useCallback(() => {
    const text = customInput.trim();
    if (!text || isLoading || gameState.gameOver) return;
    handleSelectOption({ id: 'custom', content: text, score: 10 });
    setCustomInput('');
  }, [customInput, isLoading, gameState.gameOver, handleSelectOption]);

  // 重试
  const handleRetry = useCallback(() => {
    setError(null);
    generateNextRound();
  }, [generateNextRound]);

  // 重玩
  const handleRestart = useCallback(() => {
    lastGeneratedMessageCountRef.current = 0;
    isGeneratingRef.current = false;
    setAudioUri(undefined);
    setCurrentAudioMessageId(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    resetGame();
  }, [resetGame]);

  if (!gameState.gender || !gameState.scenario) {
    return null;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* 顶部进度条 */}
      <div className="px-4 pt-4 pb-2">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="flex-1">
            <AffectionBar
              affection={gameState.affection}
              gender={gameState.gender}
            />
          </div>
          {/* 静音/取消静音按钮 */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="shrink-0 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:text-pink-500 hover:bg-white transition-all shadow-sm"
            title={isMuted ? '开启语音' : '关闭语音'}
          >
            {isMuted ? (
              <VolumeOff className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <div className="text-xs text-gray-400 shrink-0">
            第{gameState.step}/{MAX_ROUNDS}轮
          </div>
        </div>
      </div>

      {/* 对话区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-lg mx-auto space-y-4">
          {/* 场景提示 */}
          {gameState.step === 1 && gameState.messages.length === 0 && (
            <div className="text-center py-4">
              <div className="inline-block px-4 py-2 bg-white/60 rounded-full text-sm text-gray-600">
                场景：{gameState.scenario.title}
              </div>
            </div>
          )}

          {/* 消息列表 */}
          {gameState.messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex items-end gap-2 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } animate-[fadeIn_0.3s_ease-out]`}
            >
              {/* 头像 - 动漫风格 */}
              {message.role === 'partner' && (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-200 shrink-0 bg-pink-100">
                  <img
                    src={gameState.gender === 'female' ? '/avatar-girl.png' : '/avatar-boy.png'}
                    alt="对方"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* 气泡 */}
              <div className="relative max-w-[75%]">
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>

                {/* 语音播放按钮 - 仅对方消息的最新一条（自动播放，可手动控制） */}
                {message.role === 'partner' &&
                  lastPartnerIndex === index &&
                  audioUri && (
                    <button
                      type="button"
                      onClick={handlePlayAudio}
                      className={`absolute -bottom-5 left-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isPlaying
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-400 hover:bg-pink-100 hover:text-pink-500'
                      }`}
                      title={isPlaying ? '播放中' : '重新播放'}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
              </div>

              {/* 用户头像 - 动漫风格 */}
              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 shrink-0 bg-blue-100">
                  <img
                    src="/avatar-boy.png"
                    alt="我"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          {/* 加载动画 */}
          {isLoading && (
            <LoadingAnimation gender={gameState.gender} />
          )}

          {/* 错误提示 */}
          {error && (
            <div className="text-center py-4">
              <p className="text-sm text-red-500 mb-2">{error}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                重试
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 底部选项区域 */}
      {!gameState.gameOver && gameState.currentOptions.length > 0 && (
        <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm px-4 py-4">
          <div className="max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-2">
              {gameState.currentOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  disabled={isLoading}
                  className="px-4 py-3 text-left text-sm bg-white hover:bg-pink-50 border border-pink-200 rounded-xl transition-all duration-200 hover:border-pink-400 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {option.content}
                </button>
              ))}
            </div>

            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendCustom();
                  }
                }}
                placeholder="或者自己说点什么…"
                maxLength={50}
                disabled={isLoading}
                className="flex-1 px-4 py-3 text-sm bg-white border border-pink-200 rounded-xl outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleSendCustom}
                disabled={isLoading || !customInput.trim()}
                className="shrink-0 px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <Send className="w-4 h-4" />
                发送
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
