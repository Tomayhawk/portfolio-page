import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ toggleTheme, currentTheme }: { toggleTheme: () => void; currentTheme: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const doSearch = () => {
    if (searchVal.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchVal)}`);
        setMobileSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') { doSearch(); (e.target as HTMLInputElement).blur(); } };

  return (
    <nav className="w-full bg-zinc-50 dark:bg-[#09090b] border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200 sticky top-0 z-50">
      <div className="mx-[10%] lg:mx-[18%] h-16 flex items-center justify-between relative bg-zinc-50 dark:bg-[#09090b] transition-colors duration-200 z-20">
        
        <div className="flex items-center gap-4 shrink-0 z-30">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={"p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors lg:hidden -ml-2 rounded-full"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link to="/" className="text-xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">Tomayhawk</Link>
          <div className="hidden lg:flex items-center">
            <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700 mx-6"></div>
            <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {['Blog', 'Projects', 'Photography', 'Chess'].map(link => (
                  <Link key={link} to={`/${link.toLowerCase()}`} className="hover:text-black dark:hover:text-white transition">{link}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden 2xl:flex flex-1 justify-start px-4 pl-8">
            <div className="flex w-full max-w-2xl items-center">
                <div className="flex flex-1 items-center bg-white dark:bg-[#121214] border border-zinc-300 dark:border-zinc-700 rounded-l-full px-4 py-1.5 shadow-sm focus-within:border-blue-500 overflow-hidden transition-colors duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-zinc-400 mr-2 shrink-0"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                    <input 
                        type="text" 
                        value={searchVal} 
                        onChange={(e) => setSearchVal(e.target.value)} 
                        placeholder="Search..." 
                        onKeyDown={handleKeyDown} 
                        className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none placeholder-zinc-500" 
                    />
                </div>
                <button onClick={doSearch} className="px-5 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-l-0 border-zinc-300 dark:border-zinc-700 rounded-r-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </button>
            </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 z-30">
           <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className={"2xl:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
           </button>
          <a href="https://github.com/Tomayhawk" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.085-.735.09-.72.09-.72 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.29 3.495.99.105-.78.42-1.29.765-1.59-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          </a>
          <button onClick={toggleTheme} className={"p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors relative w-10 h-10 flex items-center justify-center"}>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${currentTheme === 'light' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${currentTheme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            </div>
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="2xl:hidden border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b] px-4 py-3">
             <div className="flex w-full items-center">
                <div className={"flex items-center bg-white dark:bg-[#121214] border border-zinc-300 dark:border-zinc-700 rounded-full px-4 py-1.5 shadow-sm focus-within:border-blue-500 focus-within:ring-0 transition-all w-full"}>
                    <input type="text" autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search..." className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-200 outline-none placeholder-zinc-500" />
                </div>
            </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b]">
          <div className="flex flex-col p-4 gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {['Blog', 'Projects', 'Photography', 'Chess'].map(link => (
                <Link key={link} to={`/${link.toLowerCase()}`} className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">{link}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
