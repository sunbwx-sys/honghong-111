'use client';

import { useState, type ReactNode } from 'react';
import { GlowEffect, type GlowEffectMode, type GlowEffectBlur } from '@/components/ui/glow-effect';
import { cn } from '@/lib/utils';

interface GlowBoxProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  mode?: GlowEffectMode;
  blur?: GlowEffectBlur | number;
  duration?: number;
  glowClassName?: string;
}

export function GlowBox({
  children,
  className,
  colors = ['#ec4899', '#a855f7', '#3b82f6', '#06b6d4'],
  mode = 'rotate',
  blur = 'strong',
  duration = 4,
  glowClassName,
}: GlowBoxProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <GlowEffect
          colors={colors}
          mode={mode}
          blur={blur}
          duration={duration}
          className={glowClassName}
        />
      )}
      {children}
    </div>
  );
}
