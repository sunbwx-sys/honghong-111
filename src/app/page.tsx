'use client';

import { useGame } from '@/context/GameContext';
import StartScreen from '@/components/StartScreen';
import GameScreen from '@/components/GameScreen';
import GameOverScreen from '@/components/GameOverScreen';

export default function Home() {
  const { gameState } = useGame();

  // 游戏未开始 - 显示开始界面
  if (gameState.step === 0) {
    return <StartScreen />;
  }

  // 游戏结束 - 显示结束界面
  if (gameState.gameOver) {
    return <GameOverScreen />;
  }

  // 游戏进行中 - 显示主界面
  return <GameScreen />;
}
