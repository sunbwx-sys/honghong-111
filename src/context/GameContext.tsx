'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react';
import {
  type GameState,
  type Gender,
  type Scenario,
  type VoiceType,
  type Option,
  type Message,
  INITIAL_AFFECTION,
  MIN_AFFECTION,
  MAX_AFFECTION,
  WIN_AFFECTION,
  MAX_ROUNDS,
} from '@/types/game';

type GameAction =
  | { type: 'SET_GENDER'; payload: Gender }
  | { type: 'SET_SCENARIO'; payload: Scenario | null }
  | { type: 'SET_VOICE_TYPE'; payload: VoiceType }
  | { type: 'START_GAME' }
  | { type: 'SELECT_OPTION'; payload: Option }
  | { type: 'ADD_PARTNER_MESSAGE'; payload: { content: string; options: Option[] } }
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  step: 0,
  affection: INITIAL_AFFECTION,
  gender: null,
  scenario: null,
  voiceType: null,
  messages: [],
  currentOptions: [],
  gameOver: false,
  won: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_GENDER':
      return { ...state, gender: action.payload, voiceType: null };
    case 'SET_SCENARIO':
      return { ...state, scenario: action.payload };
    case 'SET_VOICE_TYPE':
      return { ...state, voiceType: action.payload };
    case 'START_GAME': {
      // ⚠️ 关键实现要点：从 prev 读取最新值，避免闭包陷阱
      if (!state.gender || !state.scenario || !state.voiceType) {
        console.error('Missing game config');
        return state;
      }
      return {
        ...state,
        step: 1,
        affection: INITIAL_AFFECTION,
        messages: [],
        currentOptions: [],
        gameOver: false,
        won: false,
      };
    }
    case 'SELECT_OPTION': {
      const option = action.payload;
      const newAffection = Math.max(
        MIN_AFFECTION,
        Math.min(MAX_AFFECTION, state.affection + option.score),
      );
      const newMessages: Message[] = [
        ...state.messages,
        { role: 'user', content: option.content },
      ];

      // ⚠️ 关键实现：选择后不立即标记 gameOver
      // 由下一轮 ADD_PARTNER_MESSAGE 根据好感度和轮次统一判断
      // 确保对方有最后一句回复
      return {
        ...state,
        affection: newAffection,
        messages: newMessages,
        currentOptions: [],
      };
    }
    case 'ADD_PARTNER_MESSAGE': {
      const { content, options } = action.payload;
      const newMessages: Message[] = [
        ...state.messages,
        { role: 'partner', content },
      ];

      // ⚠️ 统一判断游戏结束条件
      const hasWon = state.affection >= WIN_AFFECTION;
      const hasLost = state.affection <= MIN_AFFECTION;
      const isLastRound = state.step >= MAX_ROUNDS;
      const isGameOver = hasWon || hasLost || isLastRound;
      const finalWon = hasWon;

      if (isGameOver) {
        return {
          ...state,
          messages: newMessages,
          currentOptions: [],
          gameOver: true,
          won: finalWon,
        };
      }

      return {
        ...state,
        step: state.step + 1,
        messages: newMessages,
        currentOptions: options,
      };
    }
    case 'RESET_GAME':
      return {
        ...initialState,
        gender: state.gender,
        scenario: state.scenario,
        voiceType: state.voiceType,
      };
    default:
      return state;
  }
}

interface GameContextType {
  gameState: GameState;
  setGender: (gender: Gender) => void;
  setScenario: (scenario: Scenario | null) => void;
  setVoiceType: (voiceType: VoiceType) => void;
  startGame: () => void;
  selectOption: (option: Option) => void;
  resetGame: () => void;
  addPartnerMessage: (content: string, options: Option[]) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const setGender = useCallback((gender: Gender) => {
    dispatch({ type: 'SET_GENDER', payload: gender });
  }, []);

  const setScenario = useCallback((scenario: Scenario | null) => {
    dispatch({ type: 'SET_SCENARIO', payload: scenario });
  }, []);

  const setVoiceType = useCallback((voiceType: VoiceType) => {
    dispatch({ type: 'SET_VOICE_TYPE', payload: voiceType });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const selectOption = useCallback((option: Option) => {
    dispatch({ type: 'SELECT_OPTION', payload: option });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const addPartnerMessage = useCallback((content: string, options: Option[]) => {
    dispatch({ type: 'ADD_PARTNER_MESSAGE', payload: { content, options } });
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGender,
        setScenario,
        setVoiceType,
        startGame,
        selectOption,
        resetGame,
        addPartnerMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
