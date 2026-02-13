import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Tag } from '../../components/Components.tsx';
import { ProjectGridCard } from '../../components/ProjectCard.tsx';
import { useProjectFilters } from '../../hooks/useProjectFilters.ts';
import { formatSize, getTagCategory } from '../../utils/data.ts';

const ListHeaderCell = ({ label, field, sortConfig, onSort, align = 'left', allowReverse = true, showArrow = true }: any) => (
  <div onClick={() => onSort(field, allowReverse)} className={`cursor-pointer hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors text-${align} ${sortConfig.key === field ? 'text-blue-600 dark:text-blue-400' : ''}`}>
    {label} 
    {showArrow && sortConfig.key === field && <span>{sortConfig.dir === 'asc' ? '↑' : '↓'}</span>}
  </div>
);

const FilterTag = ({ tag, isSelected, onClick }: any) => (
  <button 
    onClick={() => onClick(tag)} 
    className={`text-xs px-2 py-1 rounded border transition-colors ${
      isSelected 
        ? 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-100' 
        : 'bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
    }`}
  >
    {tag}
  </button>
);

const MatchModeToggle = ({ label, value, current, onChange }: any) => (
  <button 
    onClick={() => onChange(value)} 
    className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
      current === value 
        ? 'bg-white dark:bg-zinc-700 shadow-sm text-black dark:text-white' 
        : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
    }`}
  >
    {label}
  </button>
);

const Dropdown = ({ label, current, options, onSelect, name, activeDropdown, toggleDropdown }: any) => (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => toggleDropdown(name)} className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 rounded transition-colors whitespace-nowrap">
        {label && <span className="text-zinc-500 dark:text-zinc-500">{label}:</span>} <span className="text-zinc-800 dark:text-zinc-200">{current}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {activeDropdown === name && (
        <div className="absolute top-full left-0 mt-1 w-48 max-h-60 overflow-y-auto bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl z-20">
          {options.map((opt: any, i: number) => (
            <button key={i} onClick={() => { onSelect(opt); toggleDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">
              {typeof opt === 'object' ? opt.label : opt}
            </button>
          ))}
        </div>
      )}
    </div>
);

export default function ProjectsPage() {
  const { layout, setLayout, langFilter, setLangFilter, timeFilter, setTimeFilter, isAdvancedOpen, setIsAdvancedOpen, searchQuery, setSearchQuery, selectedTags, tagMatchMode, setTagMatchMode, sizeRange, setSizeRange, sortConfig, setSortConfig, showCustomDate, setCustomStart, setCustomEnd, filteredProjects, resetFilters, toggleTag, allTags, langOptions } = useProjectFilters();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (name: any) => setActiveDropdown(activeDropdown === name ? null : name);

  useEffect(() => { const fn = () => setActiveDropdown(null); window.addEventListener('click', fn); return () => window.removeEventListener('click', fn); }, []);

  const handleListSort = (field: string, allowReverse = true) => {
      if (sortConfig.key === field && allowReverse) {
          setSortConfig({ ...sortConfig, dir: sortConfig.dir === 'asc' ? 'desc' : 'asc' });
      } else {
          setSortConfig({ key: field, dir: 'asc' });
      }
  };

  const sortOptions = [
      { label: 'Name (A-Z)', key: 'name', dir: 'asc' },
      { label: 'Name (Z-A)', key: 'name', dir: 'desc' },
      { label: 'Date (Newest)', key: 'modified', dir: 'desc' },
      { label: 'Date (Oldest)', key: 'modified', dir: 'asc' },
      { label: 'Size (Smallest)', key: 'size', dir: 'asc' },
      { label: 'Size (Largest)', key: 'size', dir: 'desc' },
      { label: 'Tags (A-Z)', key: 'tags', dir: 'asc' },
  ];

  const currentSortLabel = sortOptions.find(o => o.key === sortConfig.key && o.dir === sortConfig.dir)?.label || 'Custom';

  return (
    <div>
      <PageHeader title="Projects" description="A collection of my programming work and experiments." />
      <div className="flex flex-col mb-6">
        {isAdvancedOpen && (
            <div className="mb-6 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-sm animate-fadeIn">
                <div className="flex flex-col gap-4">
                     <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 focus-within:ring-2 ring-blue-500/50">
                        <svg className="w-5 h-5 text-zinc-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search (e.g. tag:Python -tag:React)..." className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none placeholder-zinc-500" />
                    </div>
                    
                    <details className="text-xs text-zinc-500 cursor-pointer select-none">
                        <summary className="hover:text-blue-500 transition-colors">Show Search Syntax Helper</summary>
                        <div className="mt-2 p-3 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-2">
                             <div><span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded">tag:python</span> : Must include tag</div>
                             <div><span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded">+tag:python</span> : Same as tag:</div>
                             <div><span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded">-tag:java</span> : Must exclude tag</div>
                             <div><span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded">any:js</span> or <span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded">|tag:js</span> : Include if present</div>
                             <div><span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded">size:&gt;5mb</span> : Size greater than</div>
                             <div><span className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded">size:&lt;10kb</span> : Size less than</div>
                             <div className="col-span-1 md:col-span-2 text-zinc-400 italic mt-1">Any other text searches Title and Description normally.</div>
                        </div>
                    </details>

                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <h3 className="text-xs font-bold uppercase text-zinc-400">Filters</h3>
                        <button onClick={resetFilters} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Reset filters</button>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-xs font-bold uppercase text-zinc-500">Languages & Frameworks</h4>
                             <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded p-0.5">
                                <MatchModeToggle label="Match All" value="all" current={tagMatchMode} onChange={setTagMatchMode} />
                                <MatchModeToggle label="Match Any" value="any" current={tagMatchMode} onChange={setTagMatchMode} />
                             </div>
                        </div>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                            {allTags.filter((t: string) => getTagCategory(t) === 'Languages & Frameworks').map((tag: string) => (
                                <FilterTag key={tag} tag={tag} isSelected={selectedTags.has(tag)} onClick={toggleTag} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase text-zinc-500 mb-2">Other Tags and Topics</h4>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                            {allTags.filter((t: string) => getTagCategory(t) === 'Tags & Topics').map((tag: string) => (
                                <FilterTag key={tag} tag={tag} isSelected={selectedTags.has(tag)} onClick={toggleTag} />
                            ))}
                        </div>
                    </div>

                    <div className="max-w-sm">
                        <h4 className="text-xs font-bold uppercase text-zinc-500 mb-2">Size Range (MB)</h4>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <span className="absolute left-2 top-1.5 text-xs text-zinc-400">Min</span>
                                <input type="number" value={sizeRange.min} onChange={(e) => setSizeRange({...sizeRange, min: e.target.value})} className="w-20 pl-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 text-sm text-zinc-700 dark:text-zinc-200 focus:border-blue-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                            <span className="text-zinc-300 dark:text-zinc-600">-</span>
                            <div className="relative">
                                <span className="absolute left-2 top-1.5 text-xs text-zinc-400">Max</span>
                                <input type="number" value={sizeRange.max} onChange={(e) => setSizeRange({...sizeRange, max: e.target.value})} className="w-20 pl-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 text-sm text-zinc-700 dark:text-zinc-200 focus:border-blue-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <Dropdown name="lang" label="Languages" current={langFilter} options={langOptions} onSelect={setLangFilter} activeDropdown={activeDropdown} toggleDropdown={toggleDropdown} />
                    <div className="flex items-center gap-2">
                        <Dropdown name="time" label="Modified" current={timeFilter} options={['Any time', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'This Year', 'Last year', 'Custom Range']} onSelect={(v: string) => { setTimeFilter(v); }} activeDropdown={activeDropdown} toggleDropdown={toggleDropdown} />
                        
                        {showCustomDate && (
                            <div className="flex items-center gap-2 animate-fadeIn ml-2">
                                <input type="date" className="text-xs bg-transparent border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 dark:text-white dark:[color-scheme:dark]" onChange={(e) => setCustomStart(e.target.value)} />
                                <span className="text-zinc-400">-</span>
                                <input type="date" className="text-xs bg-transparent border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 dark:text-white dark:[color-scheme:dark]" onChange={(e) => setCustomEnd(e.target.value)} />
                            </div>
                        )}

                        <button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded transition-colors ml-2 ${isAdvancedOpen ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> Advanced Filters</button>
                    </div>
                </div>
                
                <div className="relative bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg flex shrink-0 ml-auto">
                    <div className={`absolute top-1 bottom-1 w-8 bg-white dark:bg-zinc-600 rounded shadow-sm transition-all duration-300 ease-in-out ${layout === 'list' ? 'left-1' : 'left-9'}`}></div>
                    <button onClick={() => setLayout('list')} className="relative z-10 p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                    <button onClick={() => setLayout('grid')} className="relative z-10 p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
                </div>
            </div>
            {layout === 'grid' && <div className="flex items-center gap-2"><Dropdown name="sort" label="Sort by" current={currentSortLabel} options={sortOptions} onSelect={(opt: any) => setSortConfig({ key: opt.key, dir: opt.dir })} activeDropdown={activeDropdown} toggleDropdown={toggleDropdown} /></div>}
        </div>
      </div>

      {layout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-20">
            {filteredProjects.map((p: any) => <ProjectGridCard key={p.id} project={p} />)}
          </div>
      ) : (
          <div className="w-full text-sm text-zinc-800 dark:text-zinc-200 pb-20 overflow-x-auto">
              <div className={"min-w-[1000px] grid grid-cols-[minmax(180px,1.2fr)_minmax(200px,3fr)_minmax(160px,1.1fr)_90px_90px_80px] gap-4 px-4 py-3 border-b border-zinc-300 dark:border-zinc-700 font-semibold text-zinc-500 dark:text-zinc-400 select-none"}>
                  <ListHeaderCell field="name" label="Name" sortConfig={sortConfig} onSort={handleListSort} />
                  <div className="text-left">Description</div>
                  <ListHeaderCell field="tags" label="Tags" sortConfig={sortConfig} onSort={handleListSort} allowReverse={false} showArrow={false} />
                  <ListHeaderCell field="created" label="Created" sortConfig={sortConfig} onSort={handleListSort} />
                  <ListHeaderCell field="modified" label="Modified" sortConfig={sortConfig} onSort={handleListSort} />
                  <ListHeaderCell field="size" label="Size" sortConfig={sortConfig} onSort={handleListSort} />
              </div>
              <div className="flex flex-col min-w-[1000px]">
                  {filteredProjects.map((p: any) => (
                      <Link to={`/projects/${p.title}`} key={p.id} className={"grid grid-cols-[minmax(180px,1.2fr)_minmax(200px,3fr)_minmax(160px,1.1fr)_90px_90px_80px] gap-4 px-4 h-14 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 items-center transition-colors group"}>
                          <div className="flex items-center gap-3 truncate font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-left"><span className="truncate">{p.title}</span></div>
                          <div className="text-zinc-500 dark:text-zinc-400 truncate text-left">{p.description}</div>
                          <div className="flex items-center gap-2 overflow-hidden h-full text-left flex-nowrap"><div className="flex items-center gap-2">{p.tags.map((t: string) => <Tag key={t} text={t} className="shrink-0" />)}</div></div>
                          <div className="text-zinc-500 dark:text-zinc-400 text-xs truncate text-left">{new Date(p.created).toLocaleDateString()}</div>
                          <div className="text-zinc-500 dark:text-zinc-400 text-xs truncate text-left">{new Date(p.modified).toLocaleDateString()}</div>
                          <div className="text-zinc-500 dark:text-zinc-400 text-xs truncate text-left font-mono">{formatSize(p.sizeBytes)}</div>
                      </Link>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
}
