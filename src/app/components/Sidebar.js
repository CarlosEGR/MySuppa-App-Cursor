"use client";

// src/app/components/Sidebar.js
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <aside className={`flex flex-col h-full transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 justify-between`}>
      <div>
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="mb-6 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center w-8 h-8"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <span className="text-xl">☰</span> // Menu icon
          ) : (
            <span className="text-xl">◀</span> // Chevron left
          )}
        </button>
        {!collapsed && (
          <div className="mb-10">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">MySuppa <span className="font-light">AI</span></span>
          </div>
        )}
        <nav className="flex flex-col gap-2">
          <Link href="/" className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <span role="img" aria-label="Home">🏠</span>
            {!collapsed && "Home"}
          </Link>
          <Link
            href="/dashboard"
            className={`py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-900 dark:text-white flex items-center gap-2 ${
              isActive('/dashboard')
                ? 'bg-[#9333EA] text-white'
                : ''
            }`}
          >
            <span role="img" aria-label="Dashboard">📊</span>
            {!collapsed && "Dashboard"}
          </Link>
          <Link
            href="/playground"
            className={`py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-900 dark:text-white flex items-center gap-2 ${
              isActive('/playground')
                ? 'bg-[#9333EA] text-white'
                : ''
            }`}
          >
            <span role="img" aria-label="API Playground">🧪</span>
            {!collapsed && "API Playground"}
          </Link>
        </nav>
      </div>
    </aside>
  );
}