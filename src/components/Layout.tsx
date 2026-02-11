import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import { useDarkMode } from '../hooks/useDarkMode.ts';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.slice(1).split('/')[0];
    document.title = location.pathname === '/' ? 'Tomayhawk' : `Tomayhawk - ${page && page.charAt(0).toUpperCase() + page.slice(1)}`;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 dark:bg-[#111114] text-zinc-900 dark:text-zinc-100 transition-colors duration-200 font-sans">
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <div className="mx-[10%] lg:mx-[18%] py-8 flex-1">
        {children}
      </div>
      <footer className="w-full py-6 text-center text-xs text-zinc-400 dark:text-zinc-600 bg-transparent">© 2026 Tomayhawk. All rights reserved.</footer>
    </div>
  );
}
