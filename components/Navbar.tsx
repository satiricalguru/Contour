/**
 * Navbar — Header navigation bar with active tab highlighting for:
 * Home (/), Gallery (/gallery), Studio (/studio), and Information (/info),
 * featuring a Theme Toggle (Light/Dark) and GitHub link button.
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [pillStyle, setPillStyle] = useState<{ left: number; top: number; width: number; height: number; opacity: number }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Hydrate theme preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('contour-site-theme') as 'dark' | 'light' | null;
    if (saved === 'light') {
      queueMicrotask(() => setTheme('light'));
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('contour-site-theme', nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/studio', label: 'Studio' },
    { href: '/info', label: 'Information' },
  ];

  const activeIndex = navItems.findIndex((item) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
  );

  useEffect(() => {
    const updatePillPosition = () => {
      if (activeIndex === -1) {
        setPillStyle((s) => ({ ...s, opacity: 0 }));
        return;
      }
      const activeEl = itemRefs.current[activeIndex];
      if (activeEl) {
        setPillStyle({
          left: activeEl.offsetLeft,
          top: activeEl.offsetTop,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          opacity: 1,
        });
      }
    };

    updatePillPosition();
    window.addEventListener('resize', updatePillPosition);
    return () => window.removeEventListener('resize', updatePillPosition);
  }, [activeIndex, pathname, theme]);

  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-300 ${
        isLight
          ? 'bg-slate-50/80 border-slate-200 text-slate-900'
          : 'bg-[#050508]/80 border-white/[0.06] text-white'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-sm ${
                isLight
                  ? 'bg-slate-200 border-slate-300 group-hover:bg-slate-300'
                  : 'bg-gradient-to-br from-white/20 to-white/5 border-white/10 group-hover:from-white/30 group-hover:to-white/10'
              }`}
            >
              <svg
                className={`w-4 h-4 ${isLight ? 'text-slate-900' : 'text-white'}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                role="img"
                aria-hidden="true"
              >
                <path d="M2 20 C 6 14, 10 8, 14 12 C 18 16, 20 10, 22 8" />
                <path d="M2 16 C 5 12, 9 6, 12 9 C 15 12, 19 8, 22 5" opacity="0.5" />
              </svg>
            </div>
            <span
              className={`text-base font-bold tracking-tight transition-colors ${
                isLight ? 'text-slate-900' : 'text-white/90 group-hover:text-white'
              }`}
            >
              Contour
            </span>
          </Link>

          {/* Navigation Pill Bar with Liquid Glass Sliding Indicator */}
          <div
            className={`relative flex items-center gap-1 backdrop-blur-2xl border rounded-full p-1 shadow-sm transition-colors ${
              isLight
                ? 'bg-slate-200/60 border-slate-300/80'
                : 'bg-white/[0.04] border-white/[0.08]'
            }`}
          >
            {/* Sliding Liquid Glass Indicator */}
            <div
              className={`absolute top-0 left-0 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none shadow-md ${
                isLight
                  ? 'bg-slate-900 shadow-slate-900/20 border border-slate-700/30'
                  : 'bg-white shadow-[0_2px_16px_rgba(255,255,255,0.25)] border border-white/40'
              }`}
              style={{
                transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
                width: `${pillStyle.width}px`,
                height: `${pillStyle.height}px`,
                opacity: pillStyle.opacity,
              }}
            />

            {navItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={`relative z-10 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive
                      ? isLight
                        ? 'text-white font-semibold'
                        : 'text-black font-semibold'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons: Light/Dark Theme Toggle & GitHub Link */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all duration-200 ${
                isLight
                  ? 'text-slate-800 bg-slate-200 hover:bg-slate-300 border-slate-300'
                  : 'text-white bg-white/10 hover:bg-white/20 border-white/15'
              }`}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} mode`}
              aria-label="Toggle site theme"
            >
              {isLight ? (
                // Moon Icon (Switch to Dark)
                <svg className="w-4 h-4 fill-current text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                // Sun Icon (Switch to Light)
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            {/* GitHub Link Button */}
            <a
              href="https://github.com/satiricalguru/Contour"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-full border transition-all duration-200 ${
                isLight
                  ? 'text-slate-800 bg-slate-200 hover:bg-slate-300 border-slate-300'
                  : 'text-white bg-white/10 hover:bg-white/20 border-white/15'
              }`}
              title="View on GitHub"
              aria-label="GitHub Repository"
            >
              <svg className="w-4 h-4 github-nav-icon fill-current" viewBox="0 0 24 24" role="img" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
