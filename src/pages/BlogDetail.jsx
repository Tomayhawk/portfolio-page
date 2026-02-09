import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../utils/data';
import blogRegistry from '../blogs/registry';
import { styles } from '../utils/styles';

export default function BlogDetail() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.title === id);
  
  if (!post) return <div className="text-center py-20 text-zinc-500">Post not found</div>;

  const SpecificComponent = blogRegistry[post.title];

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fadeIn">
        <div className="mb-8">
            <Link to="/blog" className="text-xs font-bold uppercase text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors mb-4 inline-flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Blog
            </Link>
            <h1 className={`${styles.h1} mb-2`}>{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-mono mb-6">
                 <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                 <span>•</span>
                 <div className="flex gap-1">
                    {post.categories.map(cat => (
                         <span key={cat} className="uppercase tracking-wider font-sans font-bold text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{cat}</span>
                    ))}
                 </div>
            </div>
            <p className={`${styles.textStandard} text-xl leading-relaxed font-light mb-8 italic border-l-4 border-zinc-200 dark:border-zinc-800 pl-4`}>{post.excerpt}</p>
         </div>

         <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
             {SpecificComponent ? <SpecificComponent /> : <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center text-zinc-500">Content pending.</div>}
         </div>
    </div>
  );
}
