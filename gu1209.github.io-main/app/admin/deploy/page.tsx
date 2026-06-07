'use client';

import { useState, useEffect } from 'react';
import { GitBranch, GitCommit, Send, RotateCcw, Check, AlertTriangle } from 'lucide-react';
import { adminApi } from '@/lib/adminApi';

interface GitStatus {
  current?: string;
  files?: Array<{ path: string; working_dir: string; index: string }>;
  isClean?: boolean;
  ahead?: number;
  behind?: number;
}

interface GitLogEntry {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export default function DeployPage() {
  const [status, setStatus] = useState<GitStatus | null>(null);
  const [log, setLog] = useState<GitLogEntry[]>([]);
  const [commitMsg, setCommitMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [committing, setCommitting] = useState(false);
  const [pushing, setPushing] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);
    setError('');
    try {
      const [s, l] = await Promise.all([
        adminApi.gitStatus(),
        adminApi.gitLog(5),
      ]);
      setStatus(s);
      setLog(l);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCommit() {
    if (!commitMsg.trim()) return;
    setCommitting(true);
    setError('');
    setMessage('');
    try {
      const result = await adminApi.gitCommit(commitMsg.trim());
      setMessage(`✓ ${result.message}`);
      setCommitMsg('');
      await loadAll();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCommitting(false);
    }
  }

  async function handlePush() {
    setPushing(true);
    setError('');
    setMessage('');
    try {
      const result = await adminApi.gitPush();
      setMessage(`✓ ${result.message}`);
      await loadAll();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPushing(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center py-40">
        <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">部署</h1>
        <p className="text-sm text-gray-500">提交更改并推送到 GitHub，自动触发部署</p>
      </div>

      {/* Messages */}
      {message && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm border border-green-200">{message}</div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">{error}</div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Git Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch size={18} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900">仓库状态</h2>
          </div>

          {status ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${status.isClean ? 'bg-green-400' : 'bg-amber-400'}`} />
                <span className="text-sm text-gray-600">
                  {status.isClean ? '工作区干净' : '有未提交的更改'}
                </span>
              </div>

              {status.current && (
                <p className="text-xs text-gray-400">
                  分支: <code className="bg-gray-100 px-1.5 py-0.5 rounded">{status.current}</code>
                  {status.ahead ? ` (领先 ${status.ahead} 个提交)` : ''}
                  {status.behind ? ` (落后 ${status.behind} 个提交)` : ''}
                </p>
              )}

              {status.files && status.files.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-500 mb-2">更改的文件:</p>
                  <div className="space-y-1 max-h-40 overflow-auto">
                    {status.files.map((f: any) => (
                      <div key={f.path} className="flex items-center gap-2 text-xs">
                        <span className={`px-1.5 py-0.5 rounded font-mono ${
                          f.index === '?' ? 'bg-red-50 text-red-600' :
                          f.index === 'M' || f.index === 'A' ? 'bg-green-50 text-green-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {f.index || f.working_dir}
                        </span>
                        <span className="text-gray-600 truncate">{f.path}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <AlertTriangle size={16} />
              无法获取仓库状态 — 可能未初始化 git
            </div>
          )}
        </div>

        {/* Commit History */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <GitCommit size={18} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900">最近提交</h2>
          </div>

          {log.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-auto">
              {log.map(entry => (
                <div key={entry.hash} className="border-l-2 border-gray-100 pl-3">
                  <p className="text-sm text-gray-700 truncate">{entry.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {entry.author} · {new Date(entry.date).toLocaleString('zh-CN')} · <code className="text-gray-300">{entry.hash.slice(0, 7)}</code>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">暂无提交记录</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mt-6">
        <h2 className="font-semibold text-gray-900 mb-4">操作</h2>

        {/* Commit */}
        <div className="flex items-end gap-3 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">提交信息</label>
            <input
              type="text"
              value={commitMsg}
              onChange={e => setCommitMsg(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCommit(); }}
              placeholder="描述本次更改..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
            />
          </div>
          <button
            onClick={handleCommit}
            disabled={committing || !commitMsg.trim()}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Check size={16} />
            {committing ? '提交中...' : '提交'}
          </button>
          <button
            onClick={handlePush}
            disabled={pushing}
            className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send size={16} />
            {pushing ? '推送中...' : '推送到 GitHub'}
          </button>
        </div>

        <button
          onClick={loadAll}
          className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition"
        >
          <RotateCcw size={14} />
          刷新状态
        </button>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs text-blue-700 leading-relaxed">
            💡 提示：提交并推送后，GitHub Actions 将自动构建并部署到 GitHub Pages，通常需要 1-2 分钟完成部署。
          </p>
        </div>
      </div>
    </div>
  );
}
