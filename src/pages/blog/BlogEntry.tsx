import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../utils/data.ts';
import blogRegistry from './registry.tsx';
import { styles } from '../../utils/styles.ts';

export default function BlogDetailPage() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.title === id);
  
  if (!post) return <div className={styles.blogEntryNotFound}>Post not found</div>;

  const SpecificComponent = blogRegistry[post.title];

  return (
    <div className={styles.blogEntryContainer}>
      <div className={styles.blogEntryMb8}>
        <Link to="/blog" className={styles.blogEntryBackLink}>
          <svg className={styles.iconSm} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Blog
            </Link>
            <h1 className={`${styles.h1} mb-2`}>{post.title}</h1>
        <div className={styles.blogEntryMetaRow}>
           <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
           <span>•</span>
           <div className={styles.blogEntryMetaInner}>
            {post.categories.map(cat => (
               <span key={cat} className={styles.blogEntryCatBadge}>{cat}</span>
            ))}
           </div>
        </div>
        <p className={`${styles.textStandard} ${styles.blogEntryExcerptExtras}`}>{post.excerpt}</p>
         </div>

       <div className={styles.blogEntryProse}>
         {SpecificComponent ? <SpecificComponent /> : <div className={styles.blogEntryPendingBox}>Content pending.</div>}
       </div>
    </div>
  );
}
