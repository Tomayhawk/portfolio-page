import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import { useDarkMode } from '../hooks/useDarkMode.ts';
import { styles } from '../utils/styles.ts';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.slice(1).split('/')[0];
    document.title = location.pathname === '/' ? 'Tomayhawk' : `Tomayhawk - ${page && page.charAt(0).toUpperCase() + page.slice(1)}`;
  }, [location]);

  return (
    <div className={styles.layoutRoot}>
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <div className={styles.layoutContainer}>{children}</div>
      <footer className={styles.footer}>© 2026 Tomayhawk. All rights reserved.</footer>
    </div>
  );
}
