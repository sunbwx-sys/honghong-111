'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Calendar, Trophy, Heart, HeartCrack, ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { formatDateFull } from '@/lib/utils';

interface GameRecord {
  id: number;
  scenario: string;
  finalScore: number;
  result: 'win' | 'lose';
  playedAt: string;
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取游戏记录
  const fetchRecords = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/game-records', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecords(data.records || []);
      }
    } catch (err) {
      console.error('Fetch game records error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchRecords();
  }, [user, router, fetchRecords]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // 统计数据
  const totalGames = records.length;
  const winCount = records.filter(r => r.result === 'win').length;
  const winRate = totalGames > 0 ? Math.round((winCount / totalGames) * 100) : 0;
  const bestScore = records.length > 0
    ? Math.max(...records.map(r => r.finalScore))
    : 0;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center gap-1 text-gray-600 hover:text-pink-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">返回</span>
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            个人中心
          </h1>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 用户信息卡片 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
              <p className="text-sm text-gray-500">哄哄模拟器玩家</p>
            </div>
          </div>
        </div>

        {/* 数据统计 */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
            <div className="text-xl font-bold text-gray-800">{totalGames}</div>
            <div className="text-xs text-gray-500">总场次</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
            <Heart className="w-6 h-6 mx-auto mb-1 text-pink-500" fill="currentColor" />
            <div className="text-xl font-bold text-gray-800">{winCount}</div>
            <div className="text-xs text-gray-500">通关</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
            <div className="w-6 h-6 mx-auto mb-1 text-green-500 text-lg font-bold">%</div>
            <div className="text-xl font-bold text-gray-800">{winRate}</div>
            <div className="text-xs text-gray-500">胜率</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
            <div className="w-6 h-6 mx-auto mb-1 text-purple-500 text-lg font-bold">🏆</div>
            <div className="text-xl font-bold text-gray-800">{bestScore}</div>
            <div className="text-xs text-gray-500">最高好感</div>
          </div>
        </div>

        {/* 历史记录 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-500" />
            游戏记录
          </h3>

          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <div className="animate-spin w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full mx-auto mb-3" />
              <p>加载中...</p>
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-5xl mb-3">🎮</div>
              <p className="mb-2">还没有游戏记录</p>
              <p className="text-sm">快去玩一局吧~</p>
              <Button
                type="button"
                size="sm"
                className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                onClick={() => router.push('/')}
              >
                开始游戏
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-pink-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    record.result === 'win'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {record.result === 'win' ? (
                      <Heart className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <HeartCrack className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {record.scenario}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDateFull(record.playedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      record.result === 'win' ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {record.finalScore}
                    </p>
                    <p className="text-xs text-gray-400">
                      {record.result === 'win' ? '通关' : '失败'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部版权 */}
        <p className="text-center text-xs text-gray-400 mt-8 mb-4">
          哄哄模拟器 · 恋爱练习生基地
        </p>
      </div>
    </div>
  );
}
