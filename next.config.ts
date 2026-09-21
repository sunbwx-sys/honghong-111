import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'pg',
    'pg-protocol',
    'drizzle-orm',
    'drizzle-orm/postgres-js',
    'postgres',
    'bcryptjs',
    'jose',
    'coze-coding-dev-sdk',
    'axios',
    'undici',
    '@langchain/openai',
    'openai',
  ],

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
