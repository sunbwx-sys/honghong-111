'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, HeartCrack, RotateCcw, Share2, Volume2, VolumeX, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/context/AuthContext';
import { VOICE_CONFIG } from '@/types/game';
import { useRouter } from 'next/navigation';
import { cleanTextForSpeech } from '@/lib/utils';

export default function GameOverScreen() {
  const { gameState, resetGame } = useGame();
  const { user } = useAuth();
  const router = useRouter();
  const [audioUri, setAudioUri] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'info'>('success');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const won = gameState.won;
  const lastPartnerMessage = gameState.messages.findLast(
    (m) => m.role === 'partner',
  );

  // 显示提示弹窗
  const showNotification = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  // ⚠️ 游戏结束后自动保存记录
  useEffect(() => {
    if (saved || !gameState.gameOver || !gameState.scenario) return;

    const saveRecord = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // 未登录用户，提示登录后可保存
        setSaved(true);
        showNotification('登录后可保存你的游戏记录', 'info');
        return;
      }

      try {
        const response = await fetch('/api/game-records', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            scenario: gameState.scenario?.title || '自定义场景',
            finalScore: gameState.affection,
            result: won ? 'win' : 'lose',
          }),
        });

        if (response.ok) {
          setSaved(true);
          showNotification('您的游戏记录已经保存', 'success');
        } else {
          setSaved(true);
        }
      } catch (err) {
        console.error('Save game record error:', err);
        setSaved(true);
      }
    };

    saveRecord();
  }, [gameState.gameOver, gameState.scenario, gameState.affection, won, saved, showNotification]);

  // ⚠️ 生成结束语音
  useEffect(() => {
    if (
      !lastPartnerMessage ||
      !gameState.voiceType ||
      generated
    ) {
      return;
    }

    setGenerated(true);
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
            uid: `gameover-${Date.now()}`,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.audioUri) {
            setAudioUri(data.audioUri);
            // 自动播放结束语音
            setTimeout(() => {
              const audio = new Audio(data.audioUri);
              audioRef.current = audio;
              audio.onplay = () => setIsPlaying(true);
              audio.onended = () => setIsPlaying(false);
              audio.onerror = () => setIsPlaying(false);
              audio.play().catch(() => {
                setIsPlaying(false);
              });
            }, 500);
          }
        }
      } catch (err) {
        console.error('TTS error:', err);
      }
    };

    generateAudio();
  }, [lastPartnerMessage, gameState.voiceType, generated]);

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

  // 重玩
  const handleRestart = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    resetGame();
  }, [resetGame]);

  // 分享
  const handleShare = useCallback(() => {
    const text = won
      ? `我在《哄哄模拟器》里用了 ${gameState.step} 轮就哄好了TA！你也来试试？`
      : `我在《哄哄模拟器》里翻车了...你能哄好TA吗？`;

    if (navigator.share) {
      navigator.share({
        title: '哄哄模拟器',
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(text + ' ' + window.location.href).catch(() => {});
      alert('已复制到剪贴板');
    }
  }, [won, gameState.step]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
          {/* 图标动画 */}
          <div className="mb-6">
            {won ? (
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                <Heart className="w-12 h-12" fill="currentColor" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-slate-500 text-white shadow-lg">
                <HeartCrack className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* 标题 */}
          <h2
            className={`text-3xl font-bold mb-2 ${
              won
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'
                : 'text-gray-700'
            }`}
          >
            {won ? '通关啦！' : '哄失败了...'}
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            {won
              ? `用了 ${gameState.step} 轮就哄好了，厉害！`
              : `坚持了 ${gameState.step} 轮，再试一次？`}
          </p>

          {/* 结束语气泡 */}
          <div className="bg-pink-50 rounded-2xl p-5 mb-6 relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-50 rotate-45" />
            <p className="text-gray-700 text-sm leading-relaxed">
              {lastPartnerMessage?.content || (won ? '原谅你啦~' : '不想理你了...')}
            </p>

            {/* 语音播放按钮 */}
            {audioUri && (
              <button
                type="button"
                onClick={handlePlayAudio}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-pink-500 hover:text-pink-600 transition-colors"
              >
                {isPlaying ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
                {isPlaying ? '播放中' : '播放语音'}
              </button>
            )}
          </div>

          {/* 按钮组 */}
          <div className="space-y-3">
            <Button
              type="button"
              size="lg"
              className="w-full h-12 rounded-xl font-medium bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg transition-all duration-300 hover:shadow-xl"
              onClick={handleRestart}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              再玩一次
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full h-12 rounded-xl font-medium"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5 mr-2" />
              {won ? '分享给朋友试试' : '分享给朋友挑战'}
            </Button>
          </div>
        </div>

        {/* 底部提示 */}
        <p className="text-center text-xs text-gray-400 mt-6">
          {won
            ? '💖 现实中也要好好哄TA哦~'
            : '💔 别灰心，现实中可不能选奇葩选项哦~'}
        </p>
      </div>

      {/* Toast 提示 */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fadeInDown">
          <div className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-lg backdrop-blur-sm ${
            toastType === 'success'
              ? 'bg-green-500/90 text-white'
              : 'bg-blue-500/90 text-white'
          }`}>
            {toastType === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Info className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
