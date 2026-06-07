'use client';

import { useState, useEffect } from 'react';
import { Download, Globe, Sun, Moon, Lock, Menu, X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const sectionLabels: Record<string, { zh: string; en: string; icon: string }> = {
  about: { zh: '关于我', en: 'About', icon: '👤' },
  experience: { zh: '实习经历', en: 'Experience', icon: '💼' },
  projects: { zh: '项目经历', en: 'Projects', icon: '📁' },
  skills: { zh: '技能与证书', en: 'Skills', icon: '🛠' },
  tools: { zh: 'Vibe Coding', en: 'Vibe Coding', icon: '⚡' },
  metrics: { zh: '数据指标', en: 'Metrics', icon: '📊' },
};

interface SidebarProps {
  lang: 'zh' | 'en';
  isDark: boolean;
  isAdmin: boolean;
  activeSection: string;
  sectionOrder: string[];
  onToggleLang: () => void;
  onToggleDark: () => void;
  onAdminClick: () => void;
  onExportClick: () => void;
}

export default function Sidebar({
  lang, isDark, isAdmin, activeSection,
  sectionOrder, onToggleLang, onToggleDark,
  onAdminClick, onExportClick,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-w', collapsed ? '3.5rem' : '14rem');
  }, [collapsed]);

  const sidebarContent = (
    <>
      {/* Logo / Toggle */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-8`}>
        {!collapsed && (
          <a href="#" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0">KG</div>
            <span className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Kris Gu</span>
          </a>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition ${collapsed ? '' : ''}`}
          title={collapsed ? '展开侧边栏' : '收起侧边栏'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Section nav */}
      <nav className="flex-1 space-y-1">
        {sectionOrder.filter(id => sectionLabels[id]).map(id => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? sectionLabels[id][lang] : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeSection === id
                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <span className="flex-shrink-0 text-base">{sectionLabels[id].icon}</span>
            {!collapsed && (
              <>
                {sectionLabels[id][lang]}
                {activeSection === id && (
                  <span className="ml-auto w-1.5 h-5 rounded-full bg-primary-500 flex-shrink-0" />
                )}
              </>
            )}
          </a>
        ))}

        <a
          href="/blog/"
          title={collapsed ? (lang === 'zh' ? '博客' : 'Blog') : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <BookOpen size={16} className="flex-shrink-0" />
          {!collapsed && (lang === 'zh' ? '博客' : 'Blog')}
        </a>
      </nav>

      {/* Bottom actions */}
      <div className={`border-t border-gray-100 dark:border-gray-800 pt-4 space-y-1.5 ${collapsed ? 'px-0' : ''}`}>
        <button
          onClick={onExportClick}
          title={collapsed ? (lang === 'zh' ? '导出简历' : 'Resume') : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition ${collapsed ? 'justify-center' : ''}`}
        >
          <Download size={16} />
          {!collapsed && (lang === 'zh' ? '导出简历' : 'Resume')}
        </button>

        <div className={`flex ${collapsed ? 'flex-col' : ''} items-center gap-1 px-1`}>
          <button
            onClick={onToggleLang}
            title={lang === 'en' ? '切换中文' : 'Switch to EN'}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 border border-gray-200 dark:border-gray-700 py-1.5 rounded-lg transition`}
          >
            <Globe size={12} />
            {!collapsed && (lang === 'en' ? '中文' : 'EN')}
          </button>
          <button
            onClick={onToggleDark}
            title={isDark ? '浅色模式' : '深色模式'}
            className={`flex-1 flex items-center justify-center py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 border border-gray-200 dark:border-gray-700 rounded-lg transition`}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          <button
            onClick={onAdminClick}
            title={isAdmin ? '退出管理' : '管理员登录'}
            className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs transition ${
              isAdmin
                ? 'text-amber-600 bg-amber-100 dark:bg-amber-900/30'
                : 'text-gray-400 hover:text-gray-600 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <Lock size={13} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <Menu size={20} className="text-gray-600 dark:text-gray-400" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-white dark:bg-gray-950 shadow-xl flex flex-col p-5 overflow-y-auto">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 flex-col p-3 overflow-y-auto z-50 transition-all duration-200 ${collapsed ? 'w-14' : 'w-56'}`}>
        {sidebarContent}
      </aside>
    </>
  );
}
