'use client';

import { Heart } from 'lucide-react';
import { type Gender } from '@/types/game';

interface LoadingAnimationProps {
  gender: Gender;
}

export default function LoadingAnimation({ gender }: LoadingAnimationProps) {
  const text = gender === 'female' ? '她正在思考...' : '他正在思考...';

  return (
    <div className="flex items-center gap-3 py-4 px-2">
      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
        <Heart
          className="w-4 h-4 text-pink-500 animate-bounce"
          style={{ animationDuration: '0.8s' }}
          fill="currentColor"
        />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-500">{text}</span>
        <span className="text-sm text-gray-400">
          <span className="inline-block animate-pulse">•</span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: '0.2s' }}
          >
            •
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: '0.4s' }}
          >
            •
          </span>
        </span>
      </div>
    </div>
  );
}
