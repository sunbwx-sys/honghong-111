import { ensureDbReady, getLastDbInitError } from '@/storage/database/db';
import { blogPosts as blogPostsTable } from '@/storage/database/shared/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { safeLogError } from '@/lib/utils';
import type { BlogPost as BuiltInBlogPost } from '@/types/blog';

// 来自数据库查询返回的原始行类型（和 schema 定义保持一致）
export interface BlogPostRecord {
  id: number;
  title: string;
  summary: string;
  content: string;
  slug: string;
  created_at: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: number;
  /** true = 当前数据来自 src/data/blogPosts.ts 的内置兜底（DB 不可用或尚未 seed） */
  fallback?: boolean;
}

function recordToPost(record: {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  created_at: Date;
}): BlogPost {
  const wordCount = record.content.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 300));
  const date = record.created_at.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    summary: record.summary,
    content: record.content,
    date,
    readTime,
  };
}

function builtInToPost(b: BuiltInBlogPost, idx: number): BlogPost {
  return {
    id: idx + 1,
    slug: b.slug,
    title: b.title,
    summary: b.summary,
    content: b.content,
    date: b.date,
    readTime: b.readTime,
    fallback: true,
  };
}

/**
 * 获取所有文章列表。
 *
 * 优先级：
 *   1) 确保 DB 就绪（ensureDbReady）
 *   2) 走 DB 查询
 *   3) DB 查询抛错（没配置 DATABASE_URL / 网络不通 / 表不存在）时，
 *      降级到 src/data/blogPosts.ts 的内置 3 篇示例文章，
 *      保证 /blog 页面不会空页面，用户至少能看到内容。
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    await ensureDbReady();

    const rows = await (await import('@/storage/database/db'))
      .db.select({
        id: blogPostsTable.id,
        title: blogPostsTable.title,
        summary: blogPostsTable.summary,
        content: blogPostsTable.content,
        slug: blogPostsTable.slug,
        created_at: blogPostsTable.created_at,
      })
      .from(blogPostsTable)
      .orderBy(desc(blogPostsTable.created_at));

    if (rows.length === 0) {
      console.log('[blogService] DB 查询返回 0 篇，使用内置示例文章兜底');
      const builtIn = await import('@/data/blogPosts').then((m) => m.blogPosts);
      return builtIn.map(builtInToPost);
    }

    return rows.map(recordToPost);
  } catch (err) {
    safeLogError('blogService.getAllPosts (DB不可用，降级到内置示例)', err);
    const lastErr = getLastDbInitError();
    console.log(
      `[blogService] 使用内置文章兜底。最近 DB 初始化错误：${
        lastErr ? lastErr.message : '无记录'
      }`,
    );
    const builtIn = await import('@/data/blogPosts').then((m) => m.blogPosts);
    return builtIn.map(builtInToPost);
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    await ensureDbReady();

    const rows = await (await import('@/storage/database/db'))
      .db.select({
        id: blogPostsTable.id,
        title: blogPostsTable.title,
        summary: blogPostsTable.summary,
        content: blogPostsTable.content,
        slug: blogPostsTable.slug,
        created_at: blogPostsTable.created_at,
      })
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .limit(1);

    if (rows.length > 0) return recordToPost(rows[0]);
  } catch (err) {
    safeLogError('blogService.getPostBySlug', err);
    // fallthrough 到内置文章查找
  }

  // DB 查不到（或 DB 不可用）→ 找内置
  const builtIn = await import('@/data/blogPosts').then((m) => m.blogPosts);
  const found = builtIn.find((b) => b.slug === slug);
  if (!found) return null;
  return builtInToPost(found, builtIn.indexOf(found));
}

export async function createPost(post: {
  title: string;
  summary: string;
  content: string;
  slug: string;
}): Promise<BlogPost> {
  await ensureDbReady();
  const { db } = await import('@/storage/database/db');
  const inserted = await db.insert(blogPostsTable).values(post).returning();
  if (inserted.length === 0) throw new Error('创建文章失败');
  return recordToPost(inserted[0]);
}

export async function slugExists(slug: string): Promise<boolean> {
  // 先查内置（保证内置 slug 永远被认为存在，避免有人把 golden-30-minutes 之类又写一遍）
  const builtIn = await import('@/data/blogPosts').then((m) => m.blogPosts);
  if (builtIn.some((b) => b.slug === slug)) return true;

  try {
    await ensureDbReady();
    const { db } = await import('@/storage/database/db');
    const rows = await db
      .select({ count: sql<number>`count(*)`.as('cnt') })
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .limit(1);
    return (rows[0]?.count ?? 0) > 0;
  } catch (err) {
    safeLogError('blogService.slugExists (DB异常，按内置结果返回)', err);
    return builtIn.some((b) => b.slug === slug);
  }
}
