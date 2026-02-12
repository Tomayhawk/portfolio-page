import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/Components.tsx';
import { styles } from '../../utils/styles.ts';
import { BLOG_POSTS } from '../../utils/data.ts';

export default function BlogPage() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Projects', 'Photography', 'Chess', 'Activity'];
  
  const filteredPosts = filter === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.categories.includes(filter));

  return (
    <div className={styles.blogPageRoot}>
      <PageHeader title="Blog" description="Thoughts, tutorials, and devlogs." />
      
      <div className={styles.blogPageCategoriesRow}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`${styles.blogPageCategoryBtn} ${
            filter === cat 
            ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900' 
            : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800'
          }`}
        >
          {cat}
        </button>
      ))}
      </div>

      <div className={styles.blogPageSpaceY}>
        {filteredPosts.length > 0 ? filteredPosts.map(post => (
          <div key={post.id} className={styles.blogPagePostCard}>
             <div className={styles.blogPagePostTop}>
                 <span className={styles.blogPageDateText}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                 <div className={styles.blogPageTagRow}>
                    {post.categories.map(cat => (
                        <span key={cat} className={styles.blogPageTagBadge}>{cat}</span>
                    ))}
                 </div>
             </div>
             
             <Link to={`/blog/${post.title}`} className={styles.blogPageLinkWrapper}>
                <h2 className={styles.blogPageTitle}>{post.title}</h2>
             </Link>
             
             <p className={`${styles.textStandard} ${styles.blogPageExcerptExtras}`}>{post.excerpt}</p>
             
             <Link to={`/blog/${post.title}`} className={styles.blogPageReadMore}>
               Read more <svg className={styles.iconMd} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </Link>
          </div>
        )) : (
            <div className={styles.blogPageNoPosts}>No posts found in this category.</div>
        )}
      </div>
    </div>
  );
}
