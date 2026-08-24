import { db } from '@/storage/database/db';
import { blogPosts } from '@/storage/database/shared/schema';
import { eq, desc, sql } from 'drizzle-orm';

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
}

function recordToPost(record: { id: number; slug: string; title: string; summary: string; content: string; created_at: Date }): BlogPost {
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

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await db.select({
    id: blogPosts.id,
    title: blogPosts.title,
    summary: blogPosts.summary,
    content: blogPosts.content,
    slug: blogPosts.slug,
    created_at: blogPosts.created_at,
  }).from(blogPosts).orderBy(desc(blogPosts.created_at));

  return rows.map(recordToPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const rows = await db.select({
    id: blogPosts.id,
    title: blogPosts.title,
    summary: blogPosts.summary,
    content: blogPosts.content,
    slug: blogPosts.slug,
    created_at: blogPosts.created_at,
  }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);

  if (rows.length === 0) return null;
  return recordToPost(rows[0]);
}

export async function createPost(post: {
  title: string;
  summary: string;
  content: string;
  slug: string;
}): Promise<BlogPost> {
  const inserted = await db.insert(blogPosts).values(post).returning();
  if (inserted.length === 0) throw new Error('创建文章失败');
  return recordToPost(inserted[0]);
}

export async function slugExists(slug: string): Promise<boolean> {
  const rows = await db.select({ count: sql<number>`count(*)`.as('cnt') })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  return (rows[0]?.count ?? 0) > 0;
}
