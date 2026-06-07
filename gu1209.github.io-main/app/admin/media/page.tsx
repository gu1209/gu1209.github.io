'use client';

import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Copy, Check, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface ImageItem {
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
  markdown: string;
}

export default function MediaPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadImages(); }, []);

  async function loadImages() {
    setLoading(true);
    try {
      const result = await adminApi.getImages();
      setImages(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const result = await adminApi.uploadImage(file);
      setImages(prev => [result, ...prev]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(filename: string) {
    if (!confirm('确定要删除此图片吗？')) return;
    try {
      await adminApi.deleteImage(filename);
      setImages(prev => prev.filter(img => img.name !== filename));
    } catch (err: any) {
      alert(`删除失败: ${err.message}`);
    }
  }

  function handleCopy(text: string, name: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">媒体库</h1>
          <p className="text-sm text-gray-500">管理博客图片，上传后可在文章中使用</p>
        </div>
        <label className={`flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <Upload size={16} />
          {uploading ? '上传中...' : '上传图片'}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ImageIcon className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-400 mb-3">还没有上传图片</p>
          <label className="inline-flex items-center gap-2 text-primary-600 text-sm hover:underline cursor-pointer">
            上传第一张图片 →
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition group">
              {/* Image preview */}
              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
                <img
                  src={img.url}
                  alt={img.name}
                  className="max-w-full max-h-full object-contain"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="text-xs text-gray-600 truncate mb-1" title={img.name}>{img.name}</p>
                <p className="text-xs text-gray-400">{formatSize(img.size)}</p>
                <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(img.markdown, img.name)}
                    className="flex items-center gap-1 text-xs text-primary-600 hover:bg-primary-50 px-2 py-1 rounded transition"
                    title="复制 Markdown 代码"
                  >
                    {copied === img.name ? <Check size={12} /> : <Copy size={12} />}
                    {copied === img.name ? '已复制' : 'Markdown'}
                  </button>
                  <button
                    onClick={() => handleCopy(img.url, `url_${img.name}`)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:bg-gray-50 px-2 py-1 rounded transition"
                    title="复制 URL"
                  >
                    {copied === `url_${img.name}` ? <Check size={12} /> : <Copy size={12} />}
                    URL
                  </button>
                  <button
                    onClick={() => handleDelete(img.name)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded transition ml-auto"
                    title="删除"
                  >
                    <Trash2 size={12} />
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
