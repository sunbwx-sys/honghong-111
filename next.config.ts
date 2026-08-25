import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 生产构建使用 Next.js standalone 模式（最推荐的自建/第三方平台部署方式）。
  // 会在 .next/standalone 里输出一个 self-contained 的 Node.js 服务，
  // 把当前 node_modules 中所有 server 侧用到的依赖（包括 postgres、bcryptjs 等
  // 纯 JS 模块）一并拷贝到 standalone/node_modules，避免部署平台运行时再去
  // 找外部安装的包。
  output: 'standalone',

  // 显式声明这些第三方包必须按 "server external" 处理。
  // 注意：不要把 coze-coding-dev-sdk 加入此列表——Turbopack 对含复杂子依赖
  // （@langchain/openai、openai 等）的 SDK 会自动 hash 命名 external，EdgeOne
  // 运行时无法解析这些 hash 名。改为用静态 import 直接打包进路由产物。
  serverExternalPackages: [
    'postgres',
    'drizzle-orm',
    'drizzle-orm/postgres-js',
    'bcryptjs',
    'jose',
  ],

  // 自定义 server 入口（src/server.ts）是给 pnpm dev 和 pnpm start 本地用的，
  // Next 默认不会把它放进 standalone 输出；这里只配置 App Router 本身。

  allowedDevOrigins: ['*.dev.coze.site'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
