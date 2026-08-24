import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Sparkles } from 'lucide-react';
import { getAllPosts } from '@/lib/blogService';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  const colors = [
    'from-pink-400 to-rose-500',
    'from-purple-400 to-pink-500',
    'from-blue-400 to-purple-500',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            💕 恋爱攻略
          </h1>
          <p className="text-gray-500">
            学点小技巧，让感情更甜蜜
          </p>
        </div>

        {posts.some((p) => p.fallback) && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 flex items-start gap-3 shadow-sm">
            <div className="flex-shrink-0 mt-0.5 text-amber-500">💡</div>
            <div className="text-sm text-amber-800 leading-relaxed">
              当前展示的是内置示例文章（数据库暂未连接或还没有正式内容）。
              部署完成后系统会自动把示例写入数据库，之后文章都会从数据库读取。
              如果你是网站管理员：
              <ul className="list-disc ml-5 mt-1 space-y-0.5">
                <li>确认 <span className="font-mono">DATABASE_URL</span> 已在平台后台配置</li>
                <li>访问一下 <Link href="/api/healthcheck" className="underline hover:text-amber-900">/api/healthcheck</Link> 查看自动诊断结果</li>
                <li>重新构建部署以让配置生效</li>
              </ul>
            </div>
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>暂无攻略，稍后再来看看吧～</p>
          </div>
        )}

        <div className="space-y-5">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-pink-100">
                <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="pink" />
                <div className="relative flex gap-4">
                  <div
                    className={`w-20 h-20 rounded-xl bg-gradient-to-br ${
                      colors[index % colors.length]
                    } flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                        {post.title}
                      </h2>
                      {post.fallback && (
                        <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 font-medium border border-amber-200">
                          示例
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} 分钟阅读
                      </span>
                      <span className="bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full">
                        恋爱技巧
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm bg-white/50 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            更多攻略持续更新中…
          </div>
        </div>
      </div>
    </div>
  );
}
