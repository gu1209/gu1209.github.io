'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Save, ArrowLeft, Eye, Trash2 } from 'lucide-react';
import { marked } from 'marked';
import { adminApi } from '@/lib/adminApi';

function EditPostForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('slug') || '';

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [content, setContent] = useState('');
  const [draft, setDraft] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    loadPost();
  }, [slug]);

  async function loadPost() {
    setLoading(true);
    setError('');
    try {
      const post = await adminApi.getPost(slug);
      setTitle(post.frontmatter.title || '');
      setTitleEn(post.frontmatter.titleEn || '');
      setDate(post.frontmatter.date || '');
      setTags((post.frontmatter.tags || []).join(', '));
      setExcerpt(post.frontmatter.excerpt || '');
      setExcerptEn(post.frontmatter.excerptEn || '');
      setContent(post.content || '');
      setDraft(post.frontmatter.draft || false);
      setNewSlug('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(publishDraft = false) {
    setSaving(true);
    setError('');
    try {
      const frontmatter = {
        title: title || 'Untitled',
        titleEn: titleEn || undefined,
        date,
        tags: tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        excerpt: excerpt || title,
        excerptEn: excerptEn || undefined,
        draft: publishDraft ? false : draft,
      };
      await adminApi.updatePost(slug, { frontmatter, content, newSlug: newSlug || undefined });
      if (newSlug) {
        router.push(`/admin/blog/edit?slug=${encodeURIComponent(newSlug)}`);
      } else {
        loadPost();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const displayTitle = title || titleEn || slug;
    if (!confirm(`确定要删除 "${displayTitle}" 吗？此操作不可撤销。`)) return;
    try {
      await adminApi.deletePost(slug);
      router.push('/admin/blog');
    } catch (err: any) {
      alert(`删除失败: ${err.message}`);
    }
  }

  const previewHtml = preview ? marked.parse(content) as string : '';

  if (!slug) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center py-20">
        <p className="text-gray-500 mb-4">未指定文章</p>
        <a href="/admin/blog" className="text-primary-600 hover:underline">返回博客列表</a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center py-40">
        <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <a href="/admin/blog" className="text-gray-400 hover:text-gray-600 transition">
            <ArrowLeft size={20} />
          </a>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">编辑文章</h1>
            <p className="text-sm text-gray-500">/{slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition">
            <Trash2 size={16} /> 删除
          </button>
          <button onClick={() => setPreview(!preview)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition ${preview ? 'bg-primary-50 text-primary-700 border-primary-200' : 'text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
            <Eye size={16} /> {preview ? '编辑' : '预览'}
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition">
            <Save size={16} /> {saving ? '保存中...' : '保存并发布'}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm">文章信息</h3>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">标题 (中文)</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">标题 (英文 / 可选)</label><input type="text" value={titleEn} onChange={e => setTitleEn(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">日期</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">标签</label><input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="逗号分隔" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">摘要 (中文)</label><textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 resize-none" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">摘要 (英文 / 可选)</label><textarea value={excerptEn} onChange={e => setExcerptEn(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400 resize-none" /></div>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={draft} onChange={e => setDraft(e.target.checked)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" /><span className="text-sm text-gray-600">标记为草稿</span></label>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">更改 Slug (可选)</label><input type="text" value={newSlug} onChange={e => setNewSlug(e.target.value)} placeholder={slug} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400" /></div>
          </div>
          <button onClick={() => handleSave(false)} disabled={saving} className="w-full flex items-center justify-center gap-2 text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition"><Save size={16} /> 保存草稿</button>
        </div>
        <div className="lg:col-span-2">
          {preview ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[500px]"><div className="blog-content prose max-w-none" dangerouslySetInnerHTML={{ __html: previewHtml }} /></div>
          ) : (
            <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-[600px] p-5 bg-white border border-gray-200 rounded-xl font-mono text-sm text-gray-800 focus:outline-none focus:border-primary-400 resize-none" spellCheck={false} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function EditPostPage() {
  return (
    <Suspense fallback={<div className="p-6 flex items-center justify-center py-40"><div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <EditPostForm />
    </Suspense>
  );
}
