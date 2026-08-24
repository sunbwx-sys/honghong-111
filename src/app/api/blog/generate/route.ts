import { NextResponse } from 'next/server';
import { createPost, slugExists, getAllPosts } from '@/lib/blogService';
import { assertCozeEnv, safeLogError } from '@/lib/utils';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { topic } = await request.json().catch(() => ({}));

    // ⚠️ 环境变量预检（写入 server 日志）
    assertCozeEnv('POST /api/blog/generate');

    // ⚠️ 动态 import coze SDK 并在 handler 内初始化客户端
    // 避免模块加载阶段（顶层 new Config/new LLMClient）抛异常导致平台层 500
    const { LLMClient, Config } = await import('coze-coding-dev-sdk');
    const config = new Config();
    const llmClient = new LLMClient(config);

    // 获取已有文章标题，避免重复
    const existingPosts = await getAllPosts();
    const existingTitles = existingPosts.map((p) => p.title);

    const topicPrompt = topic
      ? `主题方向：${topic}`
      : '请随机选择一个恋爱沟通或情侣相处的话题';

    const prompt = `你是一位资深恋爱专栏作家，擅长用轻松幽默的语气写恋爱技巧文章。

请根据要求生成一篇恋爱沟通技巧博客文章。
${topicPrompt}

已有文章标题（不要重复）：
${existingTitles.map((t) => `- ${t}`).join('\n')}

要求：
1. 标题要吸引人、有话题性，20字以内
2. 摘要一句话概括文章亮点，50字以内
3. 正文 400-600 字，风格轻松幽默、接地气
4. 要有实用干货，不是纯鸡汤
5. 段落分明，每段之间空一行
6. 给文章生成一个英文 slug（用 kebab-case，简短好记）

请严格按照以下 JSON 格式返回：
{
  "title": "文章标题",
  "summary": "摘要一句话",
  "content": "正文内容",
  "slug": "article-slug"
}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await llmClient.invoke(
      [{ role: 'user', content: prompt }],
      { temperature: 0.8, model: 'doubao-seed-2-0-lite-260215' },
    );

    clearTimeout(timeoutId);

    const content = response.content || '';

    // 解析 JSON
    let result;
    try {
      // 尝试直接解析
      result = JSON.parse(content);
    } catch {
      // 尝试提取 JSON 块
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('解析文章内容失败');
      }
    }

    if (!result.title || !result.summary || !result.content || !result.slug) {
      throw new Error('生成的文章字段不完整');
    }

    // 检查 slug 唯一性，如果重复就加后缀
    let finalSlug = result.slug;
    let counter = 1;
    while (await slugExists(finalSlug)) {
      finalSlug = `${result.slug}-${counter}`;
      counter++;
      if (counter > 10) break;
    }

    // 保存到数据库
    const post = await createPost({
      title: result.title,
      summary: result.summary,
      content: result.content,
      slug: finalSlug,
    });

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        summary: post.summary,
        slug: post.slug,
      },
    });
  } catch (error) {
    safeLogError('POST /api/blog/generate', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '生成失败',
      },
      { status: 500 }
    );
  }
}
