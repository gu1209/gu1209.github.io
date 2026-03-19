'use client';
import { useState, useCallback } from 'react';

const KEY = 'portfolio_overrides';

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
