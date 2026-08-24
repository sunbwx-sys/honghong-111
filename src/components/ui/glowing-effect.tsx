'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { cn } from '@/lib/utils';

type GlowingEffectProps = {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: 'default' | 'white' | 'pink';
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
};

export function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = 'default',
  glow = false,
  className,
  disabled = true,
  movementDuration = 2,
  borderWidth = 1,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacityVal, setOpacityVal] = useState(0);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = {
    stiffness: Math.max(1, 100 - movementDuration * 30),
    damping: 15,
    mass: 0.5,
  };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const colorStops =
    variant === 'white'
      ? 'white, transparent'
      : variant === 'pink'
        ? '#ec4899, #a855f7, #f472b6, #3b82f6, transparent'
        : '#a78bfa, #ec4899, #a855f7, #3b82f6, transparent';

  const background = useMotionTemplate`radial-gradient(${spread * 5}px at ${springX}px ${springY}px, ${colorStops})`;

  useEffect(() => {
    if (glow) {
      setOpacityVal(1);
      return;
    }

    const parent = containerRef.current?.parentElement;
    if (!parent || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isNear =
        x >= -proximity &&
        x <= rect.width + proximity &&
        y >= -proximity &&
        y <= rect.height + proximity;

      if (isNear) {
        mouseX.set(x);
        mouseY.set(y);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distFromCenter = Math.sqrt(
          (x - centerX) ** 2 + (y - centerY) ** 2,
        );
        const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
        const ratio = distFromCenter / maxDist;
        setOpacityVal(ratio >= inactiveZone ? 1 : 0);
      } else {
        setOpacityVal(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [glow, disabled, proximity, inactiveZone, mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute -inset-px rounded-[inherit]',
        className,
      )}
      style={{
        background,
        opacity: opacityVal,
        filter: blur ? `blur(${blur}px)` : undefined,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: 'xor',
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        maskComposite: 'exclude',
        padding: borderWidth,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}
