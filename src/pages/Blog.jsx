import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/CommonUI';
import { styles } from '../utils/styles';
import { BLOG_POSTS } from '../utils/data';

export default function Blog() {
  return (
    <div className="max-w-full">
      <PageHeader title="Blog" description="Thoughts, tutorials, and devlogs." />
      <div className="space-y-12">
        {BLOG_POSTS.map(post => (
          <article key={post.id} className="flex flex-col gap-2 group cursor-pointer">
             <div className="text-sm text-zinc-500 dark:text-zinc-500 font-mono">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
             <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{post.title}</h2>
             <p className={`${styles.textStandard} leading-relaxed`}>{post.excerpt}</p>
             <div className="mt-2 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                 Read more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </div>
          </article>
        ))}
      </div>
    </div>
  );
}
