import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 生产构建使用 Next.js standalone 模式（最推荐的自建/第三方平台部署方式）。
  // 会在 .next/standalone 里输出一个 self-contained 的 Node.js 服务，
  // 把当前 node_modules 中所有 server 侧用到的依赖（包括 postgres、bcryptjs 等
  // 纯 JS 模块）一并拷贝到 standalone/node_modules，避免部署平台运行时再去
  // 找外部安装的包。
  output: 'standalone',

  // 显式声明这些第三方包必须按 "server external" 处理。
  // 使用 postgres.js（纯 JS PostgreSQL 客户端）作为数据库驱动，
  // 彻底替代之前的 pg 包——不再需要 pg、pg-protocol、drizzle-orm/node-postgres
  // 这些容易在 Turbopack 下被 hash 命名的 native/commonjs 包。
  serverExternalPackages: [
    'postgres',
    'drizzle-orm',
    'drizzle-orm/postgres-js',
    'bcryptjs',
    'coze-coding-dev-sdk',
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
