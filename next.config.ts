import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 生产构建使用 Next.js standalone 模式（最推荐的自建/第三方平台部署方式）。
  // 会在 .next/standalone 里输出一个 self-contained 的 Node.js 服务，
  // 把当前 node_modules 中所有 server 侧用到的依赖（包括 pg、bcryptjs 这类
  // native/commonjs 模块）一并拷贝到 standalone/node_modules，不需要运行时
  // 再去找外部安装的包 —— 从而修复 EdgeOne Pages 上 "Cannot find package
  // pg-fcd9a938146891af" 这种 external hash 名找不到的经典问题。
  output: 'standalone',

  // 显式声明这些第三方包必须按 "server external" 处理、即打包时直接
  // require 它们本身（而不是 turbopack 在 dev 里那种 "pg-{hash}" 的
  // 伪 external 命名），从而消除 pg-fcd9a938146891af 这种 hash 名。
  // 参考 Next.js 文档的 serverExternalPackages 字段说明。
  serverExternalPackages: [
    'pg',
    'pg-protocol',
    'drizzle-orm',
    'drizzle-orm/node-postgres',
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
