'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Trophy, Medal, ArrowLeft, Crown } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  highestScore: number;
  achievedAt: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      if (data.success) {
        setEntries(data.entries);
      }
    } catch (err) {
      console.error('获取排行榜失败', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-amber-600 text-white';
    return 'bg-pink-100 text-pink-600';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100">
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* 返回按钮 */}
        <Link href="/" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 shadow-lg mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            哄人高手排行榜
          </h1>
          <p className="text-gray-500 text-sm mt-2">前 20 名哄 TA 达人</p>
        </div>

        {/* 排行榜列表 */}
        <div className="bg-white rounded-3xl shadow-lg p-4">
          {loading ? (
            <div className="text-center py-12 text-gray-400">加载中...</div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 mx-auto text-gray-200 mb-3" />
              <p className="text-gray-400">暂无排行数据</p>
              <p className="text-gray-300 text-sm mt-1">快来成为第一名吧～</p>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry) => {
                const isCurrentUser = user?.id === entry.userId;
                return (
                  <div
                    key={entry.userId}
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-300 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {/* 排名 */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankStyle(
                        entry.rank
                      )}`}
                    >
                      {entry.rank <= 3 ? getRankIcon(entry.rank) : entry.rank}
                    </div>

                    {/* 用户名 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800 truncate">
                          {entry.username}
                        </span>
                        {isCurrentUser && (
                          <span className="text-xs px-2 py-0.5 bg-pink-500 text-white rounded-full flex-shrink-0">
                            我
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {formatDateShort(entry.achievedAt)} 达成
                      </div>
                    </div>

                    {/* 分数 */}
                    <div className="text-right flex-shrink-0">
                      <div
                        className={`text-lg font-bold ${
                          entry.highestScore >= 80
                            ? 'text-green-500'
                            : entry.highestScore >= 50
                            ? 'text-blue-500'
                            : 'text-yellow-500'
                        }`}
                      >
                        {entry.highestScore}
                        <span className="text-xs font-normal ml-0.5">分</span>
                      </div>
                      <div className="text-xs text-gray-400">最高好感度</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 提示 */}
        <p className="text-center text-gray-400 text-xs mt-6">
          登录后玩游戏，你的成绩就会自动上榜哦～
        </p>
      </div>
    </div>
  );
}
