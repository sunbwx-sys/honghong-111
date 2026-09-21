import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { GameProvider } from '@/context/GameContext';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '哄哄模拟器 - 10轮对话哄好生气的TA',
    template: '%s | 哄哄模拟器',
  },
  description:
    '一款情侣互动小游戏，AI扮演生气的对象，通过选择对话在10轮内把对方哄好。包含搞笑奇葩选项，快来挑战吧！',
  keywords: [
    '哄哄模拟器',
    '情侣游戏',
    '恋爱游戏',
    'AI对话',
    '互动游戏',
  ],
  authors: [{ name: '哄哄模拟器' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg' }],
  },
  openGraph: {
    title: '哄哄模拟器 - 10轮对话哄好生气的TA',
    description:
      '一款情侣互动小游戏，AI扮演生气的对象，通过选择对话在10轮内把对方哄好。',
    locale: 'zh_CN',
    type: 'website',
    images: ['/icon.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <GameProvider>{children}</GameProvider>
        </AuthProvider>
        <Inspector />
      </body>
    </html>
  );
}
