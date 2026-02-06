import { useSearchParams, Link } from 'react-router-dom';
import { projectsData } from './data';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase();

  const results = projectsData.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query) ||
    p.tags.some(t => t.toLowerCase().includes(query))
  );

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">About {results.length} results</p>
      </div>
      
      {results.length === 0 ? (
          <div className="text-zinc-600 dark:text-zinc-400">Your search - <span className="font-bold">{query}</span> - did not match any projects.</div>
      ) : (
          <div className="flex flex-col gap-8">
            {results.map(p => (
              <div key={p.id} className="group">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                    <span className="bg-zinc-200 dark:bg-zinc-800 rounded-full w-6 h-6 flex items-center justify-center">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </span>
                    <span>tomayhawk.com &gt; projects &gt; {p.title.toLowerCase()}</span>
                </div>
                <Link to={`/projects/${p.title}`} className="text-xl text-blue-600 dark:text-blue-400 font-medium hover:underline mb-1 block">
                    {p.title}
                </Link>
                <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                    <span className="text-zinc-500 dark:text-zinc-500 mr-2">{new Date(p.modified).toDateString()} —</span>
                    {p.description}
                </div>
                <div className="flex gap-2 mt-2">
                    {p.tags.slice(0, 3).map(t => <span key={t} className="text-xs border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
      )}
    </div>
  );
}
