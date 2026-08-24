'use client';

import { motion, type Transition } from 'motion/react';
import { cn } from '@/lib/utils';

export type GlowEffectMode =
  | 'rotate'
  | 'pulse'
  | 'breathe'
  | 'colorShift'
  | 'flowHorizontal'
  | 'static'
  | 'pulseRotate';

export type GlowEffectBlur =
  | 'softest'
  | 'soft'
  | 'medium'
  | 'strong'
  | 'stronger'
  | 'strongest'
  | 'none';

const blurValues: Record<GlowEffectBlur, string> = {
  softest: 'blur(20px)',
  soft: 'blur(40px)',
  medium: 'blur(60px)',
  strong: 'blur(80px)',
  stronger: 'blur(100px)',
  strongest: 'blur(140px)',
  none: 'blur(0px)',
};

interface GlowEffectProps {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?: GlowEffectMode;
  blur?: GlowEffectBlur | number;
  transition?: Transition;
  scale?: number;
  duration?: number;
}

export function GlowEffect({
  className,
  style,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'rotate',
  blur = 'medium',
  transition,
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const blurValue =
    typeof blur === 'number' ? `blur(${blur}px)` : blurValues[blur] ?? 'blur(60px)';

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    filter: blurValue,
    scale,
    pointerEvents: 'none',
    ...style,
  };

  // 静态模式：直接渲染
  if (mode === 'static') {
    return (
      <motion.div
        style={{
          ...baseStyle,
          background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
        }}
        className={cn('rounded-full opacity-60', className)}
      />
    );
  }

  // rotate 模式：旋转 conic-gradient
  if (mode === 'rotate') {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          ...transition,
        }}
        style={{
          ...baseStyle,
          background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
        }}
        className={cn('rounded-full opacity-60', className)}
      />
    );
  }

  // pulse 模式：缩放脉冲
  if (mode === 'pulse') {
    return (
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          ...transition,
        }}
        style={{
          ...baseStyle,
          background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
        }}
        className={cn('rounded-full', className)}
      />
    );
  }

  // breathe 模式：透明度起伏
  if (mode === 'breathe') {
    return (
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          ...transition,
        }}
        style={{
          ...baseStyle,
          background: `radial-gradient(circle, ${colors[0]}, ${colors[1 % colors.length]})`,
        }}
        className={cn('rounded-full', className)}
      />
    );
  }

  // colorShift 模式：颜色渐变切换
  if (mode === 'colorShift') {
    return (
      <motion.div
        animate={{
          background: colors.map((_, i) => {
            const rotated = [...colors.slice(i), ...colors.slice(0, i)];
            return `conic-gradient(from ${i * 90}deg, ${rotated.join(', ')})`;
          }),
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          ...transition,
        }}
        style={baseStyle}
        className={cn('rounded-full opacity-60', className)}
      />
    );
  }

  // pulseRotate 模式：旋转 + 脉冲 + 颜色循环（最强烈的效果）
  if (mode === 'pulseRotate') {
    return (
      <>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: duration * 1.2,
            repeat: Infinity,
            ease: 'linear',
            ...transition,
          }}
          style={{
            ...baseStyle,
            scale: 1.3,
            background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
          }}
          className={cn('rounded-full', className)}
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            ...transition,
          }}
          style={{
            ...baseStyle,
            scale: 1.5,
            background: `conic-gradient(from 180deg, ${[...colors].reverse().join(', ')})`,
          }}
          className={cn('rounded-full', className)}
        />
      </>
    );
  }

  // flowHorizontal 模式：横向流动
  return (
    <motion.div
      animate={{ x: ['-20%', '20%', '-20%'] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        ...transition,
      }}
      style={{
        ...baseStyle,
        width: '140%',
        left: '-20%',
        background: `linear-gradient(90deg, ${colors.join(', ')})`,
      }}
      className={cn('rounded-full opacity-50', className)}
    />
  );
}
