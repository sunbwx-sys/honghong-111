'use client';

import { useGame } from '@/context/GameContext';
import StartScreen from '@/components/StartScreen';
import GameScreen from '@/components/GameScreen';
import GameOverScreen from '@/components/GameOverScreen';

export default function Home() {
  const { gameState } = useGame();

  if (gameState.gameOver) {
    return <GameOverScreen />;
  }

  if (gameState.step > 0) {
    return <GameScreen />;
  }

  return <StartScreen />;
}
