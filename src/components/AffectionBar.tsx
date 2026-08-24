"use client";

import { INITIAL_AFFECTION, MAX_AFFECTION, MIN_AFFECTION } from "@/types/game";

interface AffectionBarProps {
  affection: number;
  gender: "female" | "male";
}

/**
 * 根据好感度返回进度条颜色
 * -50~0: 红色 / 0~50: 黄色 / 50~80: 蓝色 / 80+: 绿色
 */
function getColor(affection: number): string {
  if (affection < 0) return "#ef4444";
  if (affection < 50) return "#eab308";
  if (affection < 80) return "#3b82f6";
  return "#22c55e";
}

/**
 * 好感度映射到百分比（0% ~ 100%）
 * MIN_AFFECTION(-50) 对应 0%, MAX_AFFECTION(100) 对应 100%
 */
function getPercentage(affection: number): number {
  const totalRange = MAX_AFFECTION - MIN_AFFECTION;
  const offset = affection - MIN_AFFECTION;
  return Math.max(0, Math.min(100, (offset / totalRange) * 100));
}

/**
 * 根据好感度返回对应的表情符号
 * 从生气到开心逐渐变化
 */
function getEmoji(affection: number): string {
  if (affection < -30) return "😠"; // 非常生气
  if (affection < 0) return "😤";   // 生气
  if (affection < 30) return "😒";  // 还在闹别扭
  if (affection < 50) return "😐";  // 面无表情
  if (affection < 70) return "🙂";  // 有点开心
  if (affection < 85) return "😊";  // 开心
  return "🥰";                       // 超开心
}

/**
 * 根据好感度返回情绪描述文字
 */
function getMoodText(affection: number): string {
  if (affection < -30) return "气炸了！";
  if (affection < 0) return "很生气";
  if (affection < 30) return "还在气";
  if (affection < 50) return "有点动摇";
  if (affection < 70) return "开始软化";
  if (affection < 85) return "快原谅了";
  return "原谅你啦";
}

export function AffectionBar({ affection, gender }: AffectionBarProps) {
  const percentage = getPercentage(affection);
  const color = getColor(affection);
  const emoji = getEmoji(affection);
  const moodText = getMoodText(affection);

  return (
    <div className="w-full space-y-1.5">
      {/* 表情 + 心情文字 + 百分比 */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl transition-all duration-300">{emoji}</span>
          <span className="text-gray-500 font-medium">{moodText}</span>
        </div>
        <span className="text-gray-400 text-xs">
          {Math.round(percentage)}%
        </span>
      </div>
      {/* 进度条 - 原生 div 实现 */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
