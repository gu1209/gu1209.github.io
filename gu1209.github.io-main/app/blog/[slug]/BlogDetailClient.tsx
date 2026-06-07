'use client';

import { useState, useEffect } from 'react';
import { Calendar, Tag, ArrowLeft, Globe, Sun, Moon } from 'lucide-react';
import type { BlogFrontmatter } from '@/lib/blog';

interface PostData {
  slug: string;
  frontmatter: BlogFrontmatter;
  html: string;
}

export default function BlogDetailClient({ post }: { post: PostData }) {
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

  const { frontmatter, html } = post;
  const t = (zh: string, en?: string) => lang === 'en' && en ? en : zh;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">KG</div>
            <span className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Kris Gu</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/blog/" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 transition">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{t('返回博客', 'Back to Blog')}</span>
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

      <article className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight tracking-tight">
              {t(frontmatter.title, frontmatter.titleEn)}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 dark:text-gray-500 mb-4">
              <span className="flex items-center gap-1.5"><Calendar size={15} /> {frontmatter.date}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2.5 py-1 rounded-full text-xs font-medium border border-primary-100 dark:border-primary-800">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>

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
