import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { safeLogError } from '@/lib/utils';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '5000', 10);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  // ⚠️ 启动阶段做一次"尽量执行"的 DB + 配置自检
  // ⚠️ 注意：必须用动态 import！
  // 因为第三方部署平台（EdgeOne Pages / 非 Vercel）可能会出现 pg 等
  // native 依赖没正确打包进 runtime 的情况（典型错误日志：
  // "ERR_MODULE_NOT_FOUND: Cannot find package 'pg-fcd9a938146891af'"）。
  // 如果这里顶层静态 import '@/storage/database/db'，就会在 server 启动
  // 阶段直接抛致命错，连首页和 AI 游戏都打不开。
  //
  // 改成动态 import 后：即使 pg 加载失败：
  //   - 站点正常启动；
  //   - Blog 页面走内置 3 篇示例文章兜底（blogService 的 catch 里处理）；
  //   - 登录/注册/排行榜接口返回可读的"数据库未就绪"错误提示；
  //   - 主游戏（AI 对话）功能 100% 不受影响。
  try {
    console.log('---[ 启动自检：DATABASE ] ---');
    const { ensureDbReady, describeDatabaseUrl } = await import(
      '@/storage/database/db'
    ).catch((err) => {
      safeLogError('动态 import 数据库模块失败（大概率 pg 未正确打包进 runtime）', err);
      throw err;
    });
    console.log(`  DATABASE_URL 配置：${describeDatabaseUrl()}`);
    const r = await ensureDbReady(true);
    if (r.ok) {
      console.log('  ✅ 数据库就绪。migrated=', r.migrated, 'seeded=', r.seeded);
    } else {
      console.log(
        '  ⚠️ 数据库未就绪（详见后续错误日志）。Blog 将使用内置示例文章兜底，登录注册不可用。错误：',
        r.error,
      );
    }
  } catch (err) {
    safeLogError('server prepare DB 整体失败（DB 模块不可用）', err);
    console.log(
      '  ⚠️ DB 自检完全跳过。Blog 使用内置示例兜底，登录注册排行榜不可用；AI 主游戏功能正常可用。',
    );
  }

  try {
    console.log('---[ 启动自检：COZE SDK 环境变量 ] ---');
    const { assertCozeEnv } = await import('@/lib/utils');
    const ok = assertCozeEnv('server-prepare');
    console.log(
      ok
        ? '  ✅ 三个 COZE_* 变量都已配置。'
        : '  ⚠️ 缺少 COZE 变量，AI 功能会走默认回复降级。',
    );
  } catch (err) {
    safeLogError('server prepare COZE', err);
  }
  console.log('---[ 自检结束，启动 HTTP server ] ---');

  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      safeLogError(`HTTP handler ${req.url}`, err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('服务器遇到异常，请稍后重试（详细错误已写入日志）。');
    }
  });
  server.once('error', (err) => {
    safeLogError('HTTP server startup', err);
    process.exit(1);
  });
  server.listen(port, hostname, () => {
    console.log(
      `> Server listening at http://${hostname}:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`,
    );
  });
});
