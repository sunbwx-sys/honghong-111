import { NextResponse } from 'next/server';
import {
  ensureDbReady,
  describeDatabaseUrl,
  getLastDbInitError,
} from '@/storage/database/db';
import { assertCozeEnv } from '@/lib/utils';

export const runtime = 'nodejs';

/**
 * GET /api/healthcheck
 *
 * 诊断面板（不泄漏任何密钥，仅输出 "✅ / ❌" 这类人类可读状态 + 脱敏后的配置摘要 + 错误原因）。
 *
 * 可以直接在浏览器打开 https://你的域名/api/healthcheck 看到：
 *   - 数据库是否连接成功、是否已完成建表 seed
 *   - COZE 环境变量是否都配置了（不打印值）
 *   - 如果失败，有什么原因（比如 DATABASE_URL 未设置 / pg 错误码 / 域名解析失败等）
 */
export async function GET() {
  const dbReport = await ensureDbReady(true); // force=true 每次都重新跑诊断
  const envReady = assertCozeEnv('GET /api/healthcheck');

  return NextResponse.json({
    time: new Date().toISOString(),
    database: {
      ok: dbReport.ok,
      migrated: dbReport.migrated,
      seeded: dbReport.seeded,
      url: describeDatabaseUrl(),
      error: dbReport.error ?? null,
      lastInitError: getLastDbInitError()?.message ?? null,
    },
    coze: {
      envReady,
      envVarsChecked: [
        'COZE_WORKLOAD_IDENTITY_API_KEY',
        'COZE_INTEGRATION_BASE_URL',
        'COZE_INTEGRATION_MODEL_BASE_URL',
      ],
      hint: envReady
        ? '✅ 三个环境变量都已配置（本接口不打印具体值）。若仍无 AI 回复请查看函数日志。'
        : '❌ 缺少一个或多个 COZE 环境变量，请在部署平台后台配置后重新部署。',
    },
  });
}
