'use client';

import { useState, useEffect } from 'react';
import { FileText, PenTool, Image, GitBranch, ExternalLink } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface Stats {
  posts: number;
  images: number;
  lastCommit?: string;
  gitStatus?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ posts: 0, images: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [posts, images, gitStatus] = await Promise.all([
          adminApi.getPosts().catch(() => []),
          adminApi.getImages().catch(() => []),
          adminApi.gitStatus().catch(() => null),
        ]);
        setStats({
          posts: posts.length,
          images: images.length,
          gitStatus: gitStatus ? (gitStatus.isClean ? 'clean' : 'modified') : undefined,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    {
      label: '博客文章',
      value: loading ? '...' : stats.posts,
      icon: PenTool,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/blog',
      action: '管理文章',
    },
    {
      label: '媒体文件',
      value: loading ? '...' : stats.images,
      icon: Image,
      color: 'bg-green-50 text-green-600',
      href: '/admin/media',
      action: '管理媒体',
    },
    {
      label: '内容类型',
      value: 5,
      icon: FileText,
      color: 'bg-purple-50 text-purple-600',
      href: '/admin/content',
      action: '编辑内容',
    },
    {
      label: 'Git 状态',
      value: loading ? '...' : (stats.gitStatus === 'clean' ? '干净' : stats.gitStatus === 'modified' ? '有更改' : '未知'),
      icon: GitBranch,
      color: stats.gitStatus === 'clean' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600',
      href: '/admin/deploy',
      action: '部署',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">仪表盘</h1>
        <p className="text-sm text-gray-500">欢迎使用内容管理系统</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm">连接错误: {error}</p>
          <p className="text-red-500 text-xs mt-1">请确保管理服务器已启动 (npm run admin)</p>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <a
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-primary-200 transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
              <card.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{card.value}</p>
            <p className="text-xs text-gray-500">{card.label}</p>
            <span className="inline-flex items-center gap-1 text-xs text-primary-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {card.action} <ExternalLink size={10} />
            </span>
          </a>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">快捷操作</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
          >
            <PenTool size={16} />
            写新文章
          </a>
          <a
            href="/admin/content"
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <FileText size={16} />
            编辑主页内容
          </a>
          <a
            href="/admin/media"
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <Image size={16} />
            上传图片
          </a>
          <a
            href="/admin/deploy"
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <GitBranch size={16} />
            部署到 GitHub
          </a>
          <a
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <ExternalLink size={16} />
            查看博客
          </a>
        </div>
      </div>
    </div>
  );
}
