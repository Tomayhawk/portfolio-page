import { useSearchParams, Link } from 'react-router-dom';
import { projectsData, BLOG_POSTS, PHOTOS } from '../utils/data.ts';
import { styles } from '../utils/styles.ts';

const PAGES = [
    { title: 'Chess', path: '/chess', description: 'My chess games and analysis.' },
    { title: 'Photography', path: '/photography', description: 'Photo collection.' },
    { title: 'Blog', path: '/blog', description: 'My writings and tutorials.' },
    { title: 'Projects', path: '/projects', description: 'My portfolio of works.' }
];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase();

  if (!query) return null;

  const projectResults = projectsData.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.tags.some((t: string) => t.toLowerCase().includes(query)));
  const blogResults = BLOG_POSTS.filter(b => b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query));
  const pageResults = PAGES.filter(p => p.title.toLowerCase().includes(query));
  const photoResults = PHOTOS.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));

  const total = projectResults.length + blogResults.length + pageResults.length + photoResults.length;

  return (
    <div className={styles.searchRootContainer}>
      <div className={styles.searchHeaderBox}>
          <h1 className={styles.searchTitle}>Search Results</h1>
          <p className={styles.searchSubtitle}>
              Found <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{total}</span> result{total !== 1 ? 's' : ''} for "<span className="text-zinc-800 dark:text-zinc-200 font-medium italic">{query}</span>"
          </p>
      </div>

      {total === 0 ? (
          <div className={styles.searchNoResultsBox}>
              <div className={styles.iconLg}>🔍</div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No results found</h3>
              <p className="text-zinc-500 mt-1">Try adjusting your search terms or browsing the categories.</p>
          </div>
      ) : (
          <div className={styles.searchGrid}>
            {pageResults.map(p => (
                <Link key={p.title} to={p.path} className={styles.searchResultCard}>
                    <div className={styles.searchResultIconLarge}>
                        <svg className={styles.iconLg} fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /></svg>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">
                            <svg className={styles.iconMd} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0L9 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            Page
                        </div>
                        <h2 className={styles.searchResultTitle}>{p.title}</h2>
                        <p className={styles.textStandard}>{p.description}</p>
                    </div>
                </Link>
            ))}

            {blogResults.map(b => (
                <Link key={b.id} to={`/blog/${b.title}`} className={styles.searchResultCard}>
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">
                        <svg className={styles.iconMd} fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" /></svg>
                        Blog
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{b.title}</h2>
                    <p className={styles.textStandard}>{b.excerpt}</p>
                </Link>
            ))}

            {projectResults.map(p => (
                <Link key={p.id} to={`/projects/${p.title}`} className={styles.searchResultCard}>
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">
                        <svg className={styles.iconMd} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A11.012 11.012 0 003 13.528A11.52 11.52 0 0010 15c2.979 0 5.794-.584 8.404-1.629a11.016 11.016 0 004.374-3.621zM2.888 9.04c1.06-2.303 2.909-4.319 5.191-5.694a1 1 0 00.446-1.519A13.024 13.024 0 003 13.528a13.48 13.48 0 002.888-4.488zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                        Project
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{p.title}</h2>
                    <p className={styles.textStandard}>{p.description}</p>
                </Link>
            ))}

            {photoResults.map(ph => (
                <Link key={ph.id} to="/photography" className={styles.searchResultCard}>
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">
                        <svg className={styles.iconMd} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                        Photo
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{ph.title}</h2>
                    <p className={styles.textStandard}>{ph.description}</p>
                </Link>
            ))}
          </div>
      )}
    </div>
  );
}
