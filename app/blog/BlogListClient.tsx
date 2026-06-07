'use client';

import { useState, useEffect } from 'react';
import { Calendar, Tag, ArrowRight, Globe, ArrowLeft, BookOpen, Sun, Moon } from 'lucide-react';
import type { BlogFrontmatter } from '@/lib/blog';

interface PostData {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export default function BlogListClient({ posts }: { posts: PostData[] }) {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('portfolio_dark') === '1';
    setIsDark(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('portfolio_dark', isDark ? '1' : '0');
  }, [isDark]);

  if (!mounted) return null;

  const t = (zh: string, en?: string) => lang === 'en' && en ? en : zh;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">KG</div>
            <span className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Kris Gu</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 transition">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{t('返回主页', 'Back Home')}</span>
            </a>
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-primary-600 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-xs font-medium transition">
              <Globe size={13} /> {lang === 'en' ? '中文' : 'EN'}
            </button>
            <button onClick={() => setIsDark(d => !d)}
              className="p-1.5 rounded-full text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-800 transition">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-7 bg-primary-600 rounded-full" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                {t('博客', 'Blog')}
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('记录思考，分享技术心得与生活感悟。', 'Thoughts, tech insights, and life reflections.')}
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 dark:text-gray-500">{t('还没有文章', 'No posts yet')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map(post => (
                <a key={post.slug} href={`/blog/${post.slug}/`}
                  className="block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200 group">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                    {t(post.frontmatter.title, post.frontmatter.titleEn)}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {t(post.frontmatter.excerpt, post.frontmatter.excerptEn)}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {post.frontmatter.date}</span>
                    {post.frontmatter.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                    <span className="flex items-center gap-1 text-primary-500 font-medium ml-auto">
                      {t('阅读更多', 'Read more')}
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-950 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">KG</div>
            <span className="font-medium">Kris Gu</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} · Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
