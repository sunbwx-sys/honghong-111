'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ChevronRight, RefreshCw, Pencil, BookOpen, LogOut, User, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlowBox } from '@/components/ui/glow-box';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/context/AuthContext';
import {
  getRandomScenarios,
  VOICE_CONFIG,
  type Gender,
  type VoiceType,
  type Scenario,
} from '@/types/game';

type SceneMode = 'preset' | 'custom';

export default function StartScreen() {
  const { gameState, setGender, setScenario, setVoiceType, startGame } =
    useGame();
  const { user, logout } = useAuth();
  const [isStarting, setIsStarting] = useState(false);
  const [presetScenarios, setPresetScenarios] = useState<Scenario[]>([]);
  const [sceneMode, setSceneMode] = useState<SceneMode>('preset');
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');

  // 初始化随机场景
  useEffect(() => {
    setPresetScenarios(getRandomScenarios(3));
  }, []);

  // 换一批场景
  const handleRefreshScenarios = () => {
    setPresetScenarios(getRandomScenarios(3));
    // 如果当前选中的场景不在新列表里，清空选择
    const currentStillThere = presetScenarios.some(
      (s) => s.id === gameState.scenario?.id,
    );
    if (!currentStillThere && sceneMode === 'preset') {
      // 不做强制清空，让用户自己选
    }
  };

  // 切换到自定义模式
  const handleSwitchToCustom = () => {
    setSceneMode('custom');
    // 清除预设场景选择
    setScenario(null);
  };

  // 切换到预设模式
  const handleSwitchToPreset = () => {
    setSceneMode('preset');
    // 自定义内容保留但不应用
  };

  // 自定义场景输入变化时更新
  useEffect(() => {
    if (sceneMode === 'custom' && customTitle.trim()) {
      setScenario({
        id: 'custom',
        title: customTitle.trim(),
        description: customDesc.trim() || '你惹对方生气了，好好哄哄吧...',
      });
    } else if (sceneMode === 'custom') {
      setScenario(null);
    }
  }, [customTitle, customDesc, sceneMode]);

  const availableVoices = Object.entries(VOICE_CONFIG).filter(
    ([, config]) => config.gender === gameState.gender,
  ) as [VoiceType, (typeof VOICE_CONFIG)[VoiceType]][];

  const canStart =
    gameState.gender && gameState.scenario && gameState.voiceType && !isStarting;

  const handleStart = () => {
    if (!canStart) return;
    setIsStarting(true);
    startGame();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 顶部用户栏 */}
        <div className="flex justify-end mb-4">
          {user ? (
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{user.username}</span>
              <button
                onClick={() => window.location.href = '/profile'}
                className="text-gray-400 hover:text-pink-500 transition-colors"
                title="个人中心"
              >
                <User className="w-4 h-4" />
              </button>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="退出登录"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-pink-500 transition-colors px-3 py-1.5"
              >
                登录
              </Link>
              <Link
                href="/register"
                className="text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1.5 rounded-full hover:shadow-md transition-all"
              >
                注册
              </Link>
            </div>
          )}
        </div>

        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite] bg-gradient-to-br from-pink-200 via-fuchsia-200 via-purple-200 via-blue-200 to-pink-200 mb-4 shadow-[0_0_30px_rgba(236,72,153,0.35),0_20px_40px_-15px_rgba(168,85,247,0.4)] overflow-hidden ring-4 ring-white ring-offset-4 ring-offset-pink-100/40">
            <img
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20chibi%20cartoon%20couple%2C%20boy%20and%20girl%20hugging%20each%20other%20tenderly%2C%20dreamy%20pastel%20gradient%20background%20in%20pink%20purple%20and%20blue%2C%20filled%20with%20floating%20hearts%2C%20sparkles%2C%20soft%20bubbles%20and%20rainbow%2C%20macaron%20color%20palette%2C%20kawaii%20style%2C%20happy%20romantic%20atmosphere%2C%20soft%20rounded%20shapes%2C%20high%20quality%20digital%20illustration&image_size=square"
              alt="卡通情侣"
              className="w-full h-full object-cover drop-shadow-lg"
            />
          </div>
          <h1 className="title-rainbow text-5xl tracking-wider drop-shadow-sm">
            哄哄模拟器
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            10轮对话，你能哄好生气的TA吗？
          </p>
        </div>

        {/* 设置卡片 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 space-y-6">
          {/* 性别选择 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              选择对方性别
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <GlowBox
                colors={['#ec4899', '#a855f7', '#f472b6', '#d946ef', '#ec4899']}
                mode="pulseRotate"
                blur="strong"
                duration={3}
                className="rounded-xl"
              >
                <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="pink" />
                <Button
                  type="button"
                  variant={gameState.gender === 'female' ? 'default' : 'outline'}
                  className={`relative h-12 w-full rounded-xl ${
                    gameState.gender === 'female'
                      ? 'bg-pink-500 hover:bg-pink-600'
                      : ''
                  }`}
                  onClick={() => setGender('female' as Gender)}
                >
                  女生
                </Button>
              </GlowBox>
              <GlowBox
                colors={['#3b82f6', '#06b6d4', '#8b5cf6', '#60a5fa', '#3b82f6']}
                mode="pulseRotate"
                blur="strong"
                duration={3}
                className="rounded-xl"
              >
                <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="default" />
                <Button
                  type="button"
                  variant={gameState.gender === 'male' ? 'default' : 'outline'}
                  className={`relative h-12 w-full rounded-xl ${
                    gameState.gender === 'male'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : ''
                  }`}
                  onClick={() => setGender('male' as Gender)}
                >
                  男生
                </Button>
              </GlowBox>
            </div>
          </div>

          {/* 场景选择 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                选择场景
              </h3>
              <button
                type="button"
                onClick={
                  sceneMode === 'preset'
                    ? handleSwitchToCustom
                    : handleSwitchToPreset
                }
                className="text-xs text-purple-500 hover:text-purple-600 flex items-center gap-1 transition-colors"
              >
                <Pencil className="w-3 h-3" />
                {sceneMode === 'preset' ? '自定义场景' : '选预设场景'}
              </button>
            </div>

            {sceneMode === 'preset' ? (
              <div className="space-y-2">
                {presetScenarios.map((scenario, idx) => (
                  <GlowBox
                    key={scenario.id}
                    colors={['#a855f7', '#ec4899', '#8b5cf6', '#d946ef', '#a855f7']}
                    mode="rotate"
                    blur="medium"
                    duration={5 + idx}
                    className="rounded-xl"
                  >
                    <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                    <button
                      type="button"
                      onClick={() => setScenario(scenario)}
                      className={`relative w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        gameState.scenario?.id === scenario.id
                          ? 'bg-purple-100 border-2 border-purple-400'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium text-gray-800 text-sm">
                        {scenario.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {scenario.description}
                      </div>
                    </button>
                  </GlowBox>
                ))}
                <button
                  type="button"
                  onClick={handleRefreshScenarios}
                  className="w-full p-2 text-xs text-purple-500 hover:text-purple-600 flex items-center justify-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  换一批
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    场景标题
                  </label>
                  <Input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="比如：迟到了两小时"
                    className="w-full rounded-xl text-sm"
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    详细描述（可选）
                  </label>
                  <textarea
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    placeholder="描述一下发生了什么，对方为什么生气..."
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
                    rows={3}
                    maxLength={100}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 语音选择 */}
          {gameState.gender && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                选择声音
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {availableVoices.map(([voiceType, config]) => (
                  <GlowBox
                    key={voiceType}
                    colors={['#3b82f6', '#06b6d4', '#a855f7', '#ec4899', '#3b82f6']}
                    mode="rotate"
                    blur="medium"
                    duration={4}
                    className="rounded-lg"
                  >
                    <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={2} />
                    <Button
                      type="button"
                      variant={
                        gameState.voiceType === voiceType
                          ? 'default'
                          : 'outline'
                      }
                      size="sm"
                      className={`relative h-10 w-full rounded-lg text-xs ${
                        gameState.voiceType === voiceType
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                          : ''
                      }`}
                      onClick={() => setVoiceType(voiceType)}
                    >
                      {config.label}
                    </Button>
                  </GlowBox>
                ))}
              </div>
            </div>
          )}

          {/* 恋爱攻略入口 */}
          <div className="grid grid-cols-2 gap-3">
            <GlowBox
              colors={['#ec4899', '#a855f7', '#f472b6', '#d946ef', '#ec4899']}
              mode="rotate"
              blur="medium"
              duration={5}
              className="rounded-xl"
            >
              <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="pink" />
              <Link
                href="/blog"
                className="relative flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100 hover:border-pink-200 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 group-hover:text-pink-600 transition-colors">
                      恋爱攻略
                    </p>
                    <p className="text-xs text-gray-400">哄人技巧</p>
                  </div>
                </div>
              </Link>
            </GlowBox>

            <GlowBox
              colors={['#f59e0b', '#ef4444', '#f97316', '#eab308', '#f59e0b']}
              mode="rotate"
              blur="medium"
              duration={5}
              className="rounded-xl"
            >
              <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <Link
                href="/leaderboard"
                className="relative flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 hover:border-yellow-200 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 group-hover:text-amber-600 transition-colors">
                      排行榜
                    </p>
                    <p className="text-xs text-gray-400">高手榜单</p>
                  </div>
                </div>
              </Link>
            </GlowBox>
          </div>

          {/* 开始按钮 */}
          <GlowBox
            colors={['#ec4899', '#a855f7', '#3b82f6', '#06b6d4', '#ec4899']}
            mode="rotate"
            blur="strong"
            duration={4}
            className="rounded-xl"
          >
            <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="pink" />
            <Button
              type="button"
              size="lg"
              className="relative w-full h-14 rounded-xl text-lg font-medium bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleStart}
              disabled={!canStart}
            >
              {isStarting ? (
                <span className="animate-pulse">加载中...</span>
              ) : (
                <>
                  开始游戏
                  <ChevronRight className="w-5 h-5 ml-1" />
                </>
              )}
            </Button>
          </GlowBox>
        </div>

        {/* 底部说明 */}
        <p className="text-center text-xs text-gray-400 mt-6">
          💡 提示：有2个正确选项和4个坑，别选到奇葩选项哦~
        </p>
      </div>
    </div>
  );
}
