import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsData, formatSize, getTagColor, getTagCategory } from './data';

export const ProjectGridCard = ({ project }) => (
  <Link to={`/projects/${project.title}`} className="group flex flex-col bg-zinc-200 dark:bg-[#18181b] rounded-lg overflow-hidden border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-64">
    <div className="p-[7px] bg-zinc-200 dark:bg-[#18181b]">
        <div className="h-32 w-full bg-zinc-100 dark:bg-[#202024] rounded-sm flex items-center justify-center text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
    </div>
    <div className="px-4 pb-4 pt-0 flex flex-col flex-1 justify-between overflow-hidden">
        <div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate">{project.title}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{project.description}</p>
        </div>
        <div className="flex items-center gap-1 mt-2 flex-nowrap overflow-hidden h-6">
            {project.tags.map(t => <span key={t} className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded shrink-0 ${getTagColor(t)}`}>{t}</span>)}
        </div>
    </div>
  </Link>
);

export default function Projects() {
  const [layout, setLayout] = useState('grid');
  const [filterLang, setFilterLang] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Any time');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [sizeRange, setSizeRange] = useState({ min: '', max: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'modified', dir: 'desc' });
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => setActiveDropdown(activeDropdown === name ? null : name);
  useEffect(() => {
    const fn = () => setActiveDropdown(null);
    window.addEventListener('click', fn);
    return () => window.removeEventListener('click', fn);
  }, []);

  const allTags = Array.from(new Set(projectsData.flatMap(p => p.tags))).sort();
  const toggleTag = (tag) => {
      const newTags = new Set(selectedTags);
      newTags.has(tag) ? newTags.delete(tag) : newTags.add(tag);
      setSelectedTags(newTags);
  };

  const sortOptions = [
      { label: 'Name (A-Z)', key: 'name', dir: 'asc' }, { label: 'Name (Z-A)', key: 'name', dir: 'desc' },
      { label: 'Date (Newest)', key: 'modified', dir: 'desc' }, { label: 'Date (Oldest)', key: 'modified', dir: 'asc' },
      { label: 'Size (Smallest)', key: 'size', dir: 'asc' }, { label: 'Size (Largest)', key: 'size', dir: 'desc' },
      { label: 'Tags (A-Z)', key: 'tags', dir: 'asc' },
  ];
  const currentSortLabel = sortOptions.find(o => o.key === sortConfig.key && o.dir === sortConfig.dir)?.label || 'Custom';

  const parseAdvancedSearch = (query) => {
      const terms = query.toLowerCase().split(/\s+/);
      const criteria = { text: [], tags: [], minSize: 0, maxSize: Infinity, sort: null };
      terms.forEach(term => {
          if (term.startsWith('tag:')) criteria.tags.push(term.replace('tag:', '').replace(/_/g, ' '));
          else if (term.startsWith('size:')) {
              const val = term.replace('size:', '');
              const match = val.match(/^([<>]=?)?(\d+(\.\d+)?)(kb|mb|gb|b)?$/);
              if (match) {
                  const [, op, num, , unit] = match;
                  let bytes = parseFloat(num) * (unit === 'kb' ? 1024 : unit === 'gb' ? 1024**3 : unit === 'b' ? 1 : 1024**2);
                  if (op === '<') criteria.maxSize = Math.min(criteria.maxSize, bytes);
                  else if (op === '>') criteria.minSize = Math.max(criteria.minSize, bytes);
              }
          } else if (term.startsWith('sort:')) {
               const val = term.replace('sort:', '');
               if (val === 'name_asc') criteria.sort = { key: 'name', dir: 'asc' };
               else if (val === 'name_desc') criteria.sort = { key: 'name', dir: 'desc' };
               else if (val === 'date_asc') criteria.sort = { key: 'modified', dir: 'asc' };
               else if (val === 'date_desc') criteria.sort = { key: 'modified', dir: 'desc' };
               else if (val === 'size_asc') criteria.sort = { key: 'size', dir: 'asc' };
               else if (val === 'size_desc') criteria.sort = { key: 'size', dir: 'desc' };
               else if (val === 'tags') criteria.sort = { key: 'tags', dir: 'asc' };
          } else criteria.text.push(term);
      });
      return criteria;
  };

  const getFilteredProjects = () => {
    const now = new Date();
    const sc = parseAdvancedSearch(searchQuery);
    let result = projectsData.filter(p => {
        if (sc.tags.length && !sc.tags.every(t => p.tags.some(pt => pt.toLowerCase().includes(t)))) return false;
        if (p.sizeBytes < sc.minSize || p.sizeBytes > sc.maxSize) return false;
        if (sc.text.length && !sc.text.every(term => `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(term))) return false;
        if (selectedTags.size && !p.tags.some(t => selectedTags.has(t))) return false;
        if (sizeRange.min && p.sizeBytes < parseFloat(sizeRange.min) * 1024**2) return false;
        if (sizeRange.max && p.sizeBytes > parseFloat(sizeRange.max) * 1024**2) return false;
        if (filterLang !== 'All' && !p.tags.includes(filterLang)) return false;
        const pDate = new Date(p.modified);
        if (timeFilter === 'Last 7 days' && now - pDate > 7 * 86400000) return false;
        if (timeFilter === 'Last 30 days' && now - pDate > 30 * 86400000) return false;
        if (timeFilter === 'Last year' && now - pDate > 365 * 86400000) return false;
        if (timeFilter === 'Custom Range' && customStart && customEnd) {
            const start = new Date(customStart), end = new Date(customEnd);
            end.setHours(23,59,59,999);
            if (pDate < start || pDate > end) return false;
        }
        return true;
    });
    const sort = sc.sort || sortConfig;
    return result.sort((a, b) => {
      let res = 0;
      if (sort.key === 'name') res = a.title.localeCompare(b.title);
      else if (sort.key === 'modified') res = new Date(a.modified) - new Date(b.modified);
      else if (sort.key === 'size') res = a.sizeBytes - b.sizeBytes;
      else if (sort.key === 'tags') res = (a.tags[0]||'').localeCompare(b.tags[0]||'');
      return sort.dir === 'asc' ? res : -res;
    });
  };

  const sortedProjects = getFilteredProjects();
  const Dropdown = ({ label, current, options, onSelect, name }) => (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => toggleDropdown(name)} className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 rounded transition-colors">
        {label && <span className="text-zinc-500 dark:text-zinc-500">{label}:</span>} <span className="text-zinc-800 dark:text-zinc-200">{current}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {activeDropdown === name && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl z-20 overflow-hidden">
          {options.map((opt, i) => (
            <button key={i} onClick={() => { onSelect(opt); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">
              {typeof opt === 'object' ? opt.label : opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const handleListSortClick = (field) => {
      if (field === 'tags') setSortConfig({ key: 'tags', dir: 'asc' });
      else setSortConfig(sortConfig.key === field ? { ...sortConfig, dir: sortConfig.dir === 'asc' ? 'desc' : 'asc' } : { key: field, dir: 'asc' });
  };

  return (
    <div>
      <div className="flex flex-col mb-6">
        <div className="h-4"></div>
        <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">Projects</h1>
        {isAdvancedOpen && (
            <div className="mb-6 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-sm animate-fadeIn">
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 focus-within:ring-2 ring-blue-500/50 mb-4">
                    <svg className="w-5 h-5 text-zinc-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search projects (e.g. tag:Python)..." className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none placeholder-zinc-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Separate Tag Categories */}
                    {['Languages & Frameworks', 'Tags & Topics'].map(category => (
                        <div key={category}>
                            <h4 className="text-xs font-bold uppercase text-zinc-500 mb-2">{category}</h4>
                            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                                {allTags.filter(t => getTagCategory(t) === category).map(tag => (
                                    <button key={tag} onClick={() => toggleTag(tag)} className={`text-xs px-2 py-1 rounded border transition-colors ${selectedTags.has(tag) ? 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-100' : 'bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div>
                        <h4 className="text-xs font-bold uppercase text-zinc-500 mb-2">Size Range (MB)</h4>
                        <div className="flex items-center gap-2">
                            <input type="number" placeholder="Min" value={sizeRange.min} onChange={(e) => setSizeRange({...sizeRange, min: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1.5 text-sm dark:text-white" />
                            <span className="text-zinc-400">-</span>
                            <input type="number" placeholder="Max" value={sizeRange.max} onChange={(e) => setSizeRange({...sizeRange, max: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1.5 text-sm dark:text-white" />
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Dropdown name="lang" label="Language" current={filterLang} options={['All', 'Python', 'JavaScript', 'C++']} onSelect={setFilterLang} />
                    <div className="flex items-center gap-2">
                        <Dropdown name="time" label="Modified" current={timeFilter} options={['Any time', 'Last 7 days', 'Last 30 days', 'Last year', 'Custom Range']} onSelect={(v) => { setTimeFilter(v); setShowCustomDate(v === 'Custom Range'); }} />
                        {showCustomDate && (
                            <div className="flex items-center gap-2 animate-fadeIn">
                                <input type="date" className="text-xs bg-transparent border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 dark:text-white dark:[color-scheme:dark]" onChange={(e) => setCustomStart(e.target.value)} />
                                <span className="text-zinc-400">-</span>
                                <input type="date" className="text-xs bg-transparent border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 dark:text-white dark:[color-scheme:dark]" onChange={(e) => setCustomEnd(e.target.value)} />
                            </div>
                        )}
                        <button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded transition-colors ${isAdvancedOpen ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> Advanced Filters
                        </button>
                    </div>
                </div>
                <div className="relative bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg flex">
                    <div className={`absolute top-1 bottom-1 w-8 bg-white dark:bg-zinc-600 rounded shadow-sm transition-all duration-300 ease-in-out ${layout === 'list' ? 'left-1' : 'left-9'}`}></div>
                    <button onClick={() => setLayout('list')} className="relative z-10 p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                    <button onClick={() => setLayout('grid')} className="relative z-10 p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
                </div>
            </div>
            {layout === 'grid' && <div className="flex items-center gap-2"><Dropdown name="sort" label="Sort by" current={currentSortLabel} options={sortOptions} onSelect={(opt) => setSortConfig({ key: opt.key, dir: opt.dir })} /></div>}
        </div>
      </div>

      {layout === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-20">
            {sortedProjects.map(p => <ProjectGridCard key={p.id} project={p} />)}
          </div>
      )}

      {layout === 'list' && (
          <div className="w-full text-sm text-zinc-800 dark:text-zinc-200 pb-20">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-300 dark:border-zinc-700 font-semibold text-zinc-500 dark:text-zinc-400 select-none">
                  <div className={`col-span-3 cursor-pointer hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors ${sortConfig.key === 'name' ? 'text-blue-600 dark:text-blue-400' : ''}`} onClick={() => handleListSortClick('name')}>Name {sortConfig.key === 'name' && <span>{sortConfig.dir === 'asc' ? '↑' : '↓'}</span>}</div>
                  <div className="col-span-4">Description</div>
                  <div className={`col-span-2 cursor-pointer hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors ${sortConfig.key === 'tags' ? 'text-blue-600 dark:text-blue-400' : ''}`} onClick={() => handleListSortClick('tags')}>Tags</div>
                  <div className={`col-span-2 cursor-pointer hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors ${sortConfig.key === 'modified' ? 'text-blue-600 dark:text-blue-400' : ''}`} onClick={() => handleListSortClick('modified')}>Last Modified {sortConfig.key === 'modified' && <span>{sortConfig.dir === 'asc' ? '↑' : '↓'}</span>}</div>
                  <div className={`col-span-1 text-right cursor-pointer hover:text-black dark:hover:text-white flex items-center justify-end gap-1 transition-colors ${sortConfig.key === 'size' ? 'text-blue-600 dark:text-blue-400' : ''}`} onClick={() => handleListSortClick('size')}>Size {sortConfig.key === 'size' && <span>{sortConfig.dir === 'asc' ? '↑' : '↓'}</span>}</div>
              </div>
              <div className="flex flex-col">
                  {sortedProjects.map(p => (
                      <Link to={`/projects/${p.title}`} key={p.id} className="grid grid-cols-12 gap-4 px-4 h-14 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 items-center transition-colors group">
                          <div className="col-span-3 flex items-center gap-3 truncate font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              <svg className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              <span className="truncate">{p.title}</span>
                          </div>
                          <div className="col-span-4 text-zinc-500 dark:text-zinc-400 truncate">{p.description}</div>
                          <div className="col-span-2 flex items-center gap-2 overflow-hidden h-full">
                              <div className="flex items-center gap-2">
                                  {p.tags.map(t => <span key={t} className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded whitespace-nowrap ${getTagColor(t)}`}>{t}</span>)}
                              </div>
                          </div>
                          <div className="col-span-2 text-zinc-500 dark:text-zinc-400 text-xs truncate">{new Date(p.modified).toLocaleDateString()}</div>
                          <div className="col-span-1 text-right text-zinc-500 dark:text-zinc-400 text-xs font-mono">{formatSize(p.sizeBytes)}</div>
                      </Link>
                  ))}
              </div>
          </div>
      )}
      {layout === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-20">
            {sortedProjects.map(p => <ProjectGridCard key={p.id} project={p} />)}
          </div>
      )}
    </div>
  );
}
