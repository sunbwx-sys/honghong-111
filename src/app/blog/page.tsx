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
                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors mb-2">
                      {post.title}
                    </h2>
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
