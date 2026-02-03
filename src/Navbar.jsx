import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleTheme, currentTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-zinc-50 dark:bg-[#09090b] border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200 sticky top-0 z-50">
      
      {/* Main Bar */}
      <div className="mx-[10%] lg:mx-[18%] h-16 flex items-center justify-between relative">
        
        {/* LEFT: Logo + Hamburger + Links */}
        <div className="flex items-center gap-4 shrink-0 z-20">
          
          {/* Hamburger (Visible on small screens) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 lg:hidden text-zinc-600 dark:text-zinc-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/" className="text-xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            Tomayhawk
          </Link>
          
          {/* Desktop Links (Hidden on small screens) */}
          <div className="hidden lg:flex items-center">
            <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700 mx-6"></div>
            <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Link to="/about" className="hover:text-black dark:hover:text-white transition">About</Link>
              <Link to="/projects" className="hover:text-black dark:hover:text-white transition">Projects</Link>
            </div>
          </div>
        </div>

        {/* MIDDLE: Search Bar (YouTube Style) */}
        <div className="hidden sm:flex absolute left-0 right-0 justify-center pointer-events-none">
            <div className="pointer-events-auto flex w-full max-w-[600px] justify-center">
                <div className="flex w-full max-w-[400px] items-center">
                    <div className="flex flex-1 items-center bg-white dark:bg-[#121214] border border-zinc-300 dark:border-zinc-700 rounded-l-full px-4 py-1.5 shadow-sm focus-within:border-blue-500 ml-auto">
                        {/* Inner Search Icon (Cosmetic) */}
                        <div className="hidden md:block mr-3 text-zinc-400">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none placeholder-zinc-500"
                        />
                    </div>
                    <button className="px-5 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-l-0 border-zinc-300 dark:border-zinc-700 rounded-r-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition cursor-pointer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        {/* RIGHT: Tools */}
        <div className="flex items-center gap-2 z-20">
           {/* Mobile Search Trigger (only visible when main search is hidden) */}
           <button className="sm:hidden p-2 text-zinc-600 dark:text-zinc-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
           </button>

          <a href="https://github.com/Tomayhawk" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.085-.735.09-.72.09-.72 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.29 3.495.99.105-.78.42-1.29.765-1.59-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <button onClick={toggleTheme} className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition">
            {currentTheme === 'light' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejn="round" className="w-6 h-6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejn="round" className="w-6 h-6"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b]">
          <div className="flex flex-col p-4 gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link to="/about" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">About</Link>
            <Link to="/projects" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">Projects</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
