'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, PenTool, Image, GitBranch, LogOut, ArrowLeft } from 'lucide-react';
import { checkAdminServer } from '@/lib/adminApi';

const navItems = [
  { href: '/admin', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/blog', label: '博客管理', icon: PenTool },
  { href: '/admin/media', label: '媒体库', icon: Image },
  { href: '/admin/deploy', label: '部署', icon: GitBranch },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && !isLoginPage) {
      router.push('/admin/login/');
      setChecking(false);
      return;
    }

    // Check server connectivity
    checkAdminServer().then(ok => {
      setServerOnline(ok);
      if (token) setAuthenticated(true);
      setChecking(false);
    });

    // Verify token
    if (token) {
      fetch('http://localhost:3001/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.json()).then(data => {
        if (data.success) {
          setAuthenticated(true);
        } else if (!isLoginPage) {
          localStorage.removeItem('admin_token');
          router.push('/admin/login/');
        }
      }).catch(() => {});
    }
  }, [isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthenticated(false);
    router.push('/admin/login/');
  };

  // Login page doesn't need sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">正在连接管理服务器...</p>
          {serverOnline === false && (
            <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-xl max-w-md">
              <p className="text-amber-700 text-sm font-medium">管理服务器未启动</p>
              <p className="text-amber-600 text-xs mt-1">请运行 <code className="bg-amber-100 px-1 rounded">npm run admin</code> 启动管理服务器</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">KG</div>
            <span className="font-semibold text-gray-900 text-sm">管理面板</span>
          </a>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const isActive = pathname === item.href ||
              pathname === item.href + '/' ||
              (item.href !== '/admin' && (pathname.startsWith(item.href + '/') || pathname.startsWith(item.href)));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={18} />
            返回主页
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            退出登录
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {serverOnline === false && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5">
            <p className="text-amber-700 text-xs">
              ⚠ 管理服务器连接异常 — 请确保已运行 <code className="bg-amber-100 px-1 rounded">npm run admin</code>
            </p>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
