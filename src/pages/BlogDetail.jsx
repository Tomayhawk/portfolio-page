import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS, getTagColor } from '../utils/data';
import blogRegistry from '../blogs/registry';
import { MetadataBox } from '../components/common/MetadataBox';
import { styles } from '../utils/styles';

export default function BlogDetail() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.title === id);
  
  if (!post) return <div className="text-center py-20 text-zinc-500">Post not found</div>;

  const SpecificComponent = blogRegistry[post.title];

  return (
    <div className="max-w-full mx-auto py-8 animate-fadeIn">
        <div className="mb-6">
            <Link to="/blog" className="text-xs font-bold uppercase text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors mb-4 inline-block">← Back to Blog</Link>
            <h1 className={styles.h1}>{post.title}</h1>
            <p className={`${styles.textStandard} text-xl leading-relaxed font-light mb-6`}>{post.excerpt}</p>
            <hr className="border-zinc-200 dark:border-zinc-800" />
         </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1 min-w-0">
                 <div className="block lg:hidden mb-8 space-y-4">
                    <MetadataBoxSV project={post} />
                 </div>
                 
                 <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300">
                     {SpecificComponent ? <SpecificComponent /> : <div className="mt-12 p-8 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-center text-zinc-500">Content pending.</div>}
                </div>
            </div>
            <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 space-y-6">
                    <MetadataBox project={post} />
                    <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 mb-3 tracking-wider px-1">Tags</h3>
                        <div className="flex flex-wrap gap-2">{post.tags.map(t => <span key={t} className="text-xs border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50">{t}</span>)}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
