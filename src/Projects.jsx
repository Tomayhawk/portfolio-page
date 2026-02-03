import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsData, formatSize, getTagColor } from './data';

// REUSABLE GRID CARD
export const ProjectGridCard = ({ project }) => (
  <Link 
    to={`/projects/${project.title}`} 
    // Card background slightly lighter than page background (page: #111114, card: #18181b)
    className="group flex flex-col bg-white dark:bg-[#18181b] rounded-lg overflow-hidden border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-64"
  >
    {/* Image Area - darker shade */}
    <div className="p-[7px] bg-white dark:bg-[#18181b]">
        <div className="h-32 w-full bg-zinc-100 dark:bg-[#202024] rounded-sm flex items-center justify-center text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
    </div>

    {/* Text Area */}
    <div className="px-4 pb-4 pt-0 flex flex-col flex-1 justify-between">
        <div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate">{project.title}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed h-8">
                {project.description}
            </p>
        </div>
        <div className="flex items-center justify-between mt-2">
            {/* Show only the first tag in grid view to save space */}
            <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${getTagColor(project.tags[0])}`}>
                {project.tags[0]}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                {formatSize(project.sizeBytes)}
            </span>
        </div>
    </div>
  </Link>
);

// MAIN COMPONENT
export default function Projects() {
  const [layout, setLayout] = useState('grid');
  const [filterLang, setFilterLang] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Any time');
  
  // Sort state: specific direction support
  const [sortField, setSortField] = useState('modified'); // modified, name, size
  const [sortDirection, setSortDirection] = useState('desc'); // asc, desc
  
  // Custom Date Range
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  // Dropdown UI
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (name) => setActiveDropdown(activeDropdown === name ? null : name);
  useEffect(() => {
    const fn = () => setActiveDropdown(null);
    window.addEventListener('click', fn);
    return () => window.removeEventListener('click', fn);
  }, []);

  // FILTER LOGIC
  const handleTimeFilterChange = (val) => {
      setTimeFilter(val);
      setShowCustomDate(val === 'Custom Range');
  };

  const getFilteredProjects = () => {
    const now = new Date();
    return projectsData.filter(p => {
        // Language Filter (checks if any of project tags match)
        if (filterLang !== 'All' && !p.tags.includes(filterLang)) return false;
        
        // Time Filter
        const pDate = new Date(p.modified);
        if (timeFilter === 'Last 7 days' && now - pDate > 7 * 24 * 60 * 60 * 1000) return false;
        if (timeFilter === 'Last 30 days' && now - pDate > 30 * 24 * 60 * 60 * 1000) return false;
        if (timeFilter === 'Last year' && now - pDate > 365 * 24 * 60 * 60 * 1000) return false;
        if (timeFilter === 'Custom Range' && customStart && customEnd) {
            const start = new Date(customStart);
            const end = new Date(customEnd);
            // End of day adjustment
            end.setHours(23,59,59,999);
            if (pDate < start || pDate > end) return false;
        }
        return true;
    });
  };

  // SORT LOGIC
  const sortedProjects = getFilteredProjects().sort((a, b) => {
      let res = 0;
      if (sortField === 'name') {
          res = a.title.localeCompare(b.title);
      } else if (sortField === 'modified') {
          res = new Date(a.modified) - new Date(b.modified);
      } else if (sortField === 'size') {
          res = a.sizeBytes - b.sizeBytes;
      }

      return sortDirection === 'asc' ? res : -res;
  });

  // Reusable Dropdown
  const Dropdown = ({ label, current, options, onSelect, name }) => (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={() => toggleDropdown(name)}
        className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 rounded transition-colors"
      >
        {label}: <span className="text-zinc-800 dark:text-zinc-200">{current}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {activeDropdown === name && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl z-20 overflow-hidden">
          {options.map(opt => (
            <button key={opt} onClick={() => { onSelect(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col mb-6">
        <div className="h-4"></div>
        <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">Projects</h1>
        
        {/* Controls */}
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Dropdown name="lang" label="Language" current={filterLang} options={['All', 'Python', 'JavaScript', 'C++', 'Browser Extension']} onSelect={setFilterLang} />
                    <div className="flex items-center gap-2">
                        <Dropdown name="time" label="Modified" current={timeFilter} options={['Any time', 'Last 7 days', 'Last 30 days', 'Last year', 'Custom Range']} onSelect={handleTimeFilterChange} />
                        {showCustomDate && (
                            <div className="flex items-center gap-2 animate-fadeIn">
                                <input type="date" className="text-xs bg-transparent border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 dark:text-white dark:[color-scheme:dark]" onChange={(e) => setCustomStart(e.target.value)} />
                                <span className="text-zinc-400">-</span>
                                <input type="date" className="text-xs bg-transparent border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 dark:text-white dark:[color-scheme:dark]" onChange={(e) => setCustomEnd(e.target.value)} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg flex">
                    <div className={`absolute top-1 bottom-1 w-8 bg-white dark:bg-zinc-600 rounded shadow-sm transition-all duration-300 ease-in-out ${layout === 'list' ? 'left-1' : 'left-9'}`}></div>
                    <button onClick={() => setLayout('list')} className="relative z-10 p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <button onClick={() => setLayout('grid')} className="relative z-10 p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </button>
                </div>
            </div>

            {/* Grid Sort Controls */}
            {layout === 'grid' && (
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>Sort by:</span>
                    <button onClick={() => { setSortField('name'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }} className={`hover:text-zinc-800 dark:hover:text-zinc-200 ${sortField === 'name' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`}>Name</button>
                    <button onClick={() => { setSortField('modified'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }} className={`hover:text-zinc-800 dark:hover:text-zinc-200 ${sortField === 'modified' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`}>Date</button>
                    <button onClick={() => { setSortField('size'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }} className={`hover:text-zinc-800 dark:hover:text-zinc-200 ${sortField === 'size' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`}>Size</button>
                    <span className="text-xs ml-1 opacity-50">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                </div>
            )}
        </div>
      </div>

      {layout === 'grid' && (
          <div className="grid grid-cols-5 gap-6 pb-20">
            {sortedProjects.map((project) => (
              <ProjectGridCard key={project.id} project={project} />
            ))}
          </div>
      )}

      {layout === 'list' && (
          <div className="w-full text-sm text-zinc-800 dark:text-zinc-200 pb-20">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-300 dark:border-zinc-700 font-semibold text-zinc-500 dark:text-zinc-400 select-none">
                  <div className="col-span-3 cursor-pointer hover:text-black dark:hover:text-white" onClick={() => { setSortField('name'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>Name</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-2">Tags</div>
                  <div className="col-span-2 cursor-pointer hover:text-black dark:hover:text-white" onClick={() => { setSortField('modified'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>Last Modified</div>
                  <div className="col-span-1 text-right cursor-pointer hover:text-black dark:hover:text-white" onClick={() => { setSortField('size'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>Size</div>
              </div>
              <div className="flex flex-col">
                  {sortedProjects.map((project) => (
                      <Link 
                        to={`/projects/${project.title}`}
                        key={project.id}
                        className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 items-center transition-colors group"
                      >
                          <div className="col-span-3 flex items-center gap-3 truncate font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              <svg className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              {project.title}
                          </div>
                          <div className="col-span-4 text-zinc-500 dark:text-zinc-400 truncate">{project.description}</div>
                          <div className="col-span-2 flex items-center gap-2 flex-wrap">
                              {project.tags.map(t => (
                                <span key={t} className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${getTagColor(t)}`}>{t}</span>
                              ))}
                          </div>
                          <div className="col-span-2 text-zinc-500 dark:text-zinc-400 text-xs">{new Date(project.modified).toLocaleDateString()}</div>
                          <div className="col-span-1 text-right text-zinc-500 dark:text-zinc-400 text-xs font-mono">{formatSize(project.sizeBytes)}</div>
                      </Link>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
}
