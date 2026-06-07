'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, ExternalLink, Calendar, Tag } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface PostItem {
  slug: string;
  frontmatter: {
    title: string;
    titleEn?: string;
    date: string;
    tags: string[];
    excerpt: string;
    draft?: boolean;
  };
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    setError('');
    try {
      const result = await adminApi.getPosts();
      setPosts(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`确定要删除 "${title}" 吗？此操作不可撤销。`)) return;
    try {
      await adminApi.deletePost(slug);
      setPosts(posts.filter(p => p.slug !== slug));
    } catch (err: any) {
      alert(`删除失败: ${err.message}`);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">博客管理</h1>
          <p className="text-sm text-gray-500">管理所有博客文章</p>
        </div>
        <a
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
        >
          <Plus size={16} />
          新建文章
        </a>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 mb-3">还没有文章</p>
          <a href="/admin/blog/new" className="text-primary-600 text-sm hover:underline">
            写第一篇文章 →
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.slug} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-gray-900 truncate">{post.frontmatter.title}</h3>
                    {post.frontmatter.draft && (
                      <span className="flex-shrink-0 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">草稿</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.frontmatter.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{post.frontmatter.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {post.frontmatter.tags?.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`/blog/${post.slug}/`}
                    target="_blank"
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                    title="预览"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={`/admin/blog/edit?slug=${encodeURIComponent(post.slug)}`}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="编辑"
                  >
                    <Edit3 size={16} />
                  </a>
                  <button
                    onClick={() => handleDelete(post.slug, post.frontmatter.title)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="删除"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
