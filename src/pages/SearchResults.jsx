// src/pages/SearchResults.jsx
import { useSearchParams, Link } from 'react-router-dom';
import { projectsData, BLOG_POSTS, PHOTOS } from '../utils/data';
import { styles } from '../utils/styles';

const PAGES = [
    { title: 'Chess', path: '/chess', description: 'My chess games and analysis.' },
    { title: 'Photography', path: '/photography', description: 'Photo collection.' },
    { title: 'Blog', path: '/blog', description: 'My writings and tutorials.' },
    { title: 'Projects', path: '/projects', description: 'My portfolio of works.' }
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase();

  if (!query) return null;

  const projectResults = projectsData.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query)));
  const blogResults = BLOG_POSTS.filter(b => b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query));
  const pageResults = PAGES.filter(p => p.title.toLowerCase().includes(query));
  const photoResults = PHOTOS.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));

  const total = projectResults.length + blogResults.length + pageResults.length + photoResults.length;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Search Results</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Found <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{total}</span> result{total !== 1 ? 's' : ''} for "<span className="text-zinc-800 dark:text-zinc-200 font-medium italic">{query}</span>"
          </p>
      </div>

      {total === 0 ? (
          <div className="py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <div className="text-5xl mb-4 opacity-50">🔍</div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No results found</h3>
              <p className="text-zinc-500 mt-1">Try adjusting your search terms or browsing the categories.</p>
          </div>
      ) : (
          <div className="grid gap-4 animate-fadeIn">
            {/* Pages */}
            {pageResults.map(p => (
                <Link key={p.title} to={p.path} className="group relative block bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-400/50 dark:hover:border-blue-500/30 hover:-translate-y-0.5">
                    <div className="absolute top-6 right-6 text-zinc-200 dark:text-zinc-800 group-hover:text-blue-100 dark:group-hover:text-blue-900/20 transition-colors">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /></svg>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600"></span> Page
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">{p.title}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
                    </div>
                </Link>
            ))}

            {/* Photos */}
            {photoResults.map(p => (
                <Link key={p.id} to="/photography" className="group relative block bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-purple-400/50 dark:hover:border-purple-500/30 hover:-translate-y-0.5">
                    <div className="flex gap-6 items-center">
                        <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                             <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-500 mb-2 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span> Photo
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">{p.title}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
                        </div>
                    </div>
                </Link>
            ))}

            {/* Blogs */}
            {blogResults.map(b => (
                <Link key={b.id} to={`/blog/${b.title}`} className="group relative block bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-emerald-400/50 dark:hover:border-emerald-500/30 hover:-translate-y-0.5">
                    <div className="absolute top-6 right-6 text-zinc-200 dark:text-zinc-800 group-hover:text-emerald-100 dark:group-hover:text-emerald-900/20 transition-colors">
                         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-500 mb-2 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Blog
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">{b.title}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 max-w-2xl">{b.excerpt}</p>
                    </div>
                </Link>
            ))}

            {/* Projects */}
            {projectResults.map(p => (
              <Link key={p.id} to={`/projects/${p.title}`} className="group relative block bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-400/50 dark:hover:border-blue-500/30 hover:-translate-y-0.5">
                <div className="absolute top-6 right-6 text-zinc-200 dark:text-zinc-800 group-hover:text-blue-100 dark:group-hover:text-blue-900/20 transition-colors">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-500 mb-2 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Project
                    </div>
                    <div className="flex items-start gap-4 mb-1">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.title}</h3>
                        {p.tags.length > 0 && <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400 font-mono">{p.tags[0]}</span>}
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 max-w-2xl">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
      )}
    </div>
  );
}
