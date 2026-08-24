import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Heart, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blogService';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage(props: Props) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const paragraphs = post.content.split('\n\n').filter((p) => p.trim());

  const getGradient = () => {
    const hash = post.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradients = [
      'from-pink-400 via-rose-400 to-red-400',
      'from-purple-400 via-pink-400 to-rose-400',
      'from-blue-400 via-purple-400 to-pink-400',
    ];
    return gradients[hash % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <article className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </Link>

        <header className="mb-8">
          <div
            className={`w-full h-40 md:h-48 rounded-2xl bg-gradient-to-br ${getGradient()} mb-6 flex items-center justify-center shadow-lg`}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center px-6 drop-shadow-md">
              {post.title}
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} 分钟阅读
            </span>
            <span className="bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full text-xs">
              恋爱技巧
            </span>
          </div>
        </header>

        <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="pink" />
          <div className="relative prose prose-pink max-w-none">
            {paragraphs.map((para, index) => {
              const text = para.trim();
              // 以 ❌ 或 ✅ 或 第X步 开头的段落，特殊样式
              const isSpecial =
                text.startsWith('❌') ||
                text.startsWith('✅') ||
                text.startsWith('第') ||
                /^[一二三四五六七八九十][，、.]/.test(text);

              return (
                <p
                  key={index}
                  className={`text-gray-700 leading-relaxed mb-4 ${
                    isSpecial ? 'bg-pink-50 p-4 rounded-xl border-l-4 border-pink-400' : ''
                  }`}
                >
                  {text}
                </p>
              );
            })}
          </div>
        </div>

        <div className="relative bg-white rounded-2xl p-6 shadow-sm mb-8">
          <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} variant="pink" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-200 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <div>
                <p className="font-medium text-gray-800">觉得有用吗？</p>
                <p className="text-xs text-gray-400">收藏起来慢慢看</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="block"
            >
              <div className="relative bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <GlowingEffect spread={40} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={2} variant="pink" />
                <div className="relative flex items-center gap-2 text-xs text-pink-500 mb-2">
                  <ChevronLeft className="w-4 h-4" />
                  上一篇
                </div>
                <h3 className="relative font-medium text-gray-800 line-clamp-1">{prevPost.title}</h3>
              </div>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="block"
            >
              <div className="relative bg-white rounded-xl p-4 hover:shadow-md transition-shadow text-right">
                <GlowingEffect spread={40} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={2} variant="pink" />
                <div className="relative flex items-center gap-2 text-xs text-pink-500 mb-2 justify-end">
                  下一篇
                  <ChevronRight className="w-4 h-4" />
                </div>
                <h3 className="relative font-medium text-gray-800 line-clamp-1">{nextPost.title}</h3>
              </div>
            </Link>
          )}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            查看更多攻略
          </Link>
        </div>
      </article>
    </div>
  );
}
