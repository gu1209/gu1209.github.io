'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import { marked } from 'marked';
import { adminApi } from '@/lib/adminApi';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [content, setContent] = useState('');
  const [draft, setDraft] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  function generateSlug(): string {
    const d = date;
    // Prefer English title for slug; fallback to date-based slug
    const t = titleEn || title || '';
    const slugPart = t
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')  // only keep ASCII alphanumeric
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);
    if (slugPart && slugPart.length > 0) {
      return `${d}-${slugPart}`;
    }
    // Fallback: date-based slug
    return `${d}-post`;
  }

  async function handleSave(publishDraft = false) {
    setSaving(true);
    setError('');
    try {
      const frontmatter = {
        title: title || 'Untitled',
        titleEn: titleEn || undefined,
        date,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        excerpt: excerpt || title,
        excerptEn: excerptEn || undefined,
        draft: publishDraft ? false : draft,
      };
      const slug = generateSlug();
      await adminApi.createPost({ slug, frontmatter, content });
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const previewHtml = preview ? marked.parse(content) as string : '';

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <a href="/admin/blog" className="text-gray-400 hover:text-gray-600 transition">
            <ArrowLeft size={20} />
          </a>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">新建文章</h1>
            <p className="text-sm text-gray-500">创建一篇新的博客文章</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition ${
              preview
                ? 'bg-primary-50 text-primary-700 border-primary-200'
                : 'text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Eye size={16} />
            {preview ? '编辑' : '预览'}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition"
          >
            <Save size={16} />
            {saving ? '保存中...' : '发布'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">{error}</div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar — frontmatter */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm">文章信息</h3>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">标题 (中文)</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="文章标题"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">标题 (英文 / 可选)</label>
              <input
                type="text"
                value={titleEn}
                onChange={e => setTitleEn(e.target.value)}
                placeholder="English title"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">日期</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">标签 (逗号分隔)</label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="金融, Python, AI"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">摘要 (中文)</label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                rows={2}
                placeholder="文章摘要..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">摘要 (英文 / 可选)</label>
              <textarea
                value={excerptEn}
                onChange={e => setExcerptEn(e.target.value)}
                rows={2}
                placeholder="English excerpt..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200 resize-none"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={draft}
                onChange={e => setDraft(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-600">标记为草稿</span>
            </label>

            <div className="pt-2 text-xs text-gray-400">
              Slug: <code className="bg-gray-100 px-1 rounded">{generateSlug()}</code>
            </div>
          </div>

          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition"
          >
            <Save size={16} />
            保存草稿
          </button>
        </div>

        {/* Main — content editor */}
        <div className="lg:col-span-2">
          {preview ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[500px]">
              <div className="blog-content prose max-w-none" dangerouslySetInnerHTML={{ __html: previewHtml }} />
            </div>
          ) : (
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`## 开始写作...\n\n使用 Markdown 语法编写内容。\n\n- 使用 ## 创建标题\n- 使用 **粗体** 强调\n- 使用 [链接](url) 创建链接\n- 使用 ![图片](/images/blog/xxx.jpg) 插入图片`}
              className="w-full h-[600px] p-5 bg-white border border-gray-200 rounded-xl font-mono text-sm text-gray-800 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200 resize-none"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
