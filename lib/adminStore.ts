'use client';
import { useState, useCallback } from 'react';

const KEY = 'portfolio_overrides';

// ── Notes store ───────────────────────────────────────────────────────────
const NOTES_KEY = 'portfolio_notes';

export interface NoteItem {
  id: string;
  title: string;
  tag: string;
  href: string;
}

export function useNotesStore(defaults: NoteItem[]) {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    if (typeof window === 'undefined') return defaults;
    try {
      const saved = localStorage.getItem(NOTES_KEY);
      return saved ? JSON.parse(saved) : defaults;
    } catch { return defaults; }
  });

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

export function useAdminContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch { return {}; }
  });

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
