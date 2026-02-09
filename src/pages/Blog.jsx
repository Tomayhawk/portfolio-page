import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/CommonUI';
import { styles } from '../utils/styles';
import { BLOG_POSTS } from '../utils/data';

export default function Blog() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Code', 'Opinion', 'Lifestyle'];
  
  const filteredPosts = filter === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === filter);

  return (
    <div className="max-w-full">
      <PageHeader title="Blog" description="Thoughts, tutorials, and devlogs." />
      
      {/* Semi-vague Filter */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map(cat => (
            <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                    filter === cat 
                    ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900' 
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
            >
                {cat}
            </button>
        ))}
      </div>

      <div className="space-y-12 animate-fadeIn">
        {filteredPosts.length > 0 ? filteredPosts.map(post => (
          <article key={post.id} className="flex flex-col gap-2 group">
             <div className="flex items-center gap-3">
                 <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                 <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded">{post.category}</span>
             </div>
             
             <Link to={`/blog/${post.title}`} className="block">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{post.title}</h2>
             </Link>
             
             <p className={`${styles.textStandard} leading-relaxed max-w-3xl`}>{post.excerpt}</p>
             
             <Link to={`/blog/${post.title}`} className="mt-2 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all w-fit">
                 Read more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </Link>
          </article>
        )) : (
            <div className="text-center py-20 text-zinc-400 italic">No posts found in this category.</div>
        )}
      </div>
    </div>
  );
}
