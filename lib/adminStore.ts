'use client';
import { useState, useEffect, useCallback } from 'react';

const KEY = 'portfolio_overrides';
const CONTENT_KEY = 'portfolio_content';
const NOTES_KEY = 'portfolio_notes';
const NOW_KEY = 'portfolio_now';
const HIDDEN_KEY = 'portfolio_hidden_sections';

// ── Content types ──────────────────────────────────────────────────────────
export interface ContentData {
  translations: any;
  experiences: any[];
  projects: any[];
  skillsData: any;
  vibeTools: any[];
  metrics: any;
  notes: NoteItem[];
  now: NowItem[];
  contact: any;
}

// ── Notes store ───────────────────────────────────────────────────────────
export interface NoteItem {
  id: string;
  title: string;
  tag: string;
  href: string;
}

export function useNotesStore(defaults: NoteItem[]) {
  const [notes, setNotes] = useState<NoteItem[]>(defaults);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(NOTES_KEY);
      if (saved) setNotes(JSON.parse(saved));
    } catch {}
  }, []);

  const persist = (next: NoteItem[]) => {
    setNotes(next);
    if (typeof window !== 'undefined') localStorage.setItem(NOTES_KEY, JSON.stringify(next));
  };

  const addNote    = (n: Omit<NoteItem, 'id'>) => persist([...notes, { ...n, id: Date.now().toString() }]);
  const removeNote = (id: string)               => persist(notes.filter(n => n.id !== id));
  const updateNote = (id: string, n: Omit<NoteItem, 'id'>) =>
    persist(notes.map(x => x.id === id ? { ...n, id } : x));

  return { notes, addNote, removeNote, updateNote };
}

// ── "Now" store ───────────────────────────────────────────────────────────
export interface NowItem { emoji: string; category: string; categoryEn: string; content: string; }

export function useNowStore(defaults: NowItem[]) {
  const [items, setItems] = useState<NowItem[]>(defaults);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(NOW_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  const updateItem = (i: number, content: string) => {
    const next = items.map((it, idx) => idx === i ? { ...it, content } : it);
    setItems(next);
    if (typeof window !== 'undefined') localStorage.setItem(NOW_KEY, JSON.stringify(next));
  };

  const setItemsRaw = (next: NowItem[]) => {
    setItems(next);
    if (typeof window !== 'undefined') localStorage.setItem(NOW_KEY, JSON.stringify(next));
  };

  return { items, updateItem, setItems: setItemsRaw };
}

// ── Hidden sections store ─────────────────────────────────────────────────
export function useHiddenSections() {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HIDDEN_KEY);
      if (saved) setHidden(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    const next = new Set(hidden);
    next.has(id) ? next.delete(id) : next.add(id);
    setHidden(next);
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(Array.from(next)));
  };

  const isHidden = (id: string) => hidden.has(id);
  return { isHidden, toggle };
}

// ── Admin content (original field-level overrides) ────────────────────────
export function useAdminContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setOverrides(JSON.parse(saved));
    } catch {}
  }, []);

  const get = useCallback((id: string, def: string): string =>
    overrides[id] ?? def, [overrides]);

  const save = useCallback((id: string, value: string) => {
    setOverrides(prev => {
      const next = { ...prev, [id]: value };
      if (typeof window !== 'undefined') localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setOverrides({});
    if (typeof window !== 'undefined') localStorage.removeItem(KEY);
  }, []);

  const login = (pw: string) => { if (pw === '1209') { setIsAdmin(true); return true; } return false; };
  const logout = () => setIsAdmin(false);

  return { isAdmin, get, save, reset, login, logout };
}

// ── Full content store (loads from content.json, persists overrides) ──────
export function useContentStore(defaults: ContentData) {
  const [content, setContent] = useState<ContentData>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONTENT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setContent({ ...defaults, ...parsed });
      }
    } catch {}
    setLoaded(true);
  }, []);

  const persist = useCallback((next: ContentData) => {
    setContent(next);
    if (typeof window !== 'undefined') localStorage.setItem(CONTENT_KEY, JSON.stringify(next));
  }, []);

  const updateContent = useCallback((updater: (c: ContentData) => ContentData) => {
    setContent(prev => {
      const next = updater(prev);
      if (typeof window !== 'undefined') localStorage.setItem(CONTENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const importJSON = useCallback((data: Partial<ContentData>) => {
    setContent(prev => {
      const next = { ...prev, ...data };
      if (typeof window !== 'undefined') localStorage.setItem(CONTENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const exportJSON = useCallback(() => {
    return content;
  }, [content]);

  const resetContent = useCallback(() => {
    setContent(defaults);
    if (typeof window !== 'undefined') localStorage.removeItem(CONTENT_KEY);
  }, [defaults]);

  return { content, updateContent, importJSON, exportJSON, resetContent, loaded };
}
