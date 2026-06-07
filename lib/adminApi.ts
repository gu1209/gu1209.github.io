/**
 * Client-side API helper for the Express admin server.
 * All calls go to http://localhost:3001 (only available during local dev).
 */

const API_BASE = 'http://localhost:3001/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

function setToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem('admin_token', token);
}

function clearToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('admin_token');
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `请求失败 (${res.status})`);
  }
  return data;
}

export const adminApi = {
  // ── Auth ────────────────────────────────────────────────────────────
  login: async (password: string) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {}, // No auth header for login
    });
    setToken(data.token);
    return data;
  },

  logout: async () => {
    try { await apiFetch('/auth/logout', { method: 'POST' }); } catch {}
    clearToken();
  },

  verify: () => apiFetch('/auth/verify', { method: 'POST' }),

  // ── Content ─────────────────────────────────────────────────────────
  getContent: (type: string) => apiFetch(`/content/${type}`),

  updateContent: (type: string, data: any) =>
    apiFetch(`/content/${type}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  listContentTypes: () => apiFetch('/content'),

  // ── Blog ────────────────────────────────────────────────────────────
  getPosts: () => apiFetch('/blog'),

  getPost: (slug: string) => apiFetch(`/blog/${slug}`),

  createPost: (data: { slug: string; frontmatter: any; content: string }) =>
    apiFetch('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updatePost: (slug: string, data: { frontmatter: any; content: string; newSlug?: string }) =>
    apiFetch(`/blog/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deletePost: (slug: string) =>
    apiFetch(`/blog/${slug}`, { method: 'DELETE' }),

  // ── Media ───────────────────────────────────────────────────────────
  getImages: () => apiFetch('/media'),

  uploadImage: async (file: File) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/media/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '上传失败');
    return data;
  },

  deleteImage: (filename: string) =>
    apiFetch(`/media/${filename}`, { method: 'DELETE' }),

  // ── Git ─────────────────────────────────────────────────────────────
  gitStatus: () => apiFetch('/git/status'),

  gitCommit: (message: string) =>
    apiFetch('/git/commit', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),

  gitPush: () => apiFetch('/git/push', { method: 'POST' }),

  gitLog: (n = 5) => apiFetch(`/git/log?n=${n}`),
};

/** Check if admin API server is reachable */
export async function checkAdminServer(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
