import Blog1 from './entries/Blog1.tsx';
import { ContentSection } from '../../components/Components.tsx';
import { styles } from '../../utils/styles.ts';

const PlaceholderBlog = ({ title }: { title: string }) => (
    <div className={styles.animateFadeIn}>
        <ContentSection>
            <p className={styles.blogRegistryPlaceholder}>This is a temporary placeholder for the blog post: <strong>{title}</strong>.</p>
            <p className={styles.blogRegistryMt4}>Content for this section is coming soon. Use the categories above to navigate other topics.</p>
        </ContentSection>
    </div>
);

const blogRegistry: Record<string, any> = {
  'Building a Portfolio with React': Blog1,
  'Why I Switch to Linux': () => <PlaceholderBlog title="Why I Switch to Linux" />,
  'Understanding AsyncIO in Python': () => <PlaceholderBlog title="Understanding AsyncIO in Python" />,
  'Coffee Brewing Methods Ranked': () => <PlaceholderBlog title="Coffee Brewing Methods Ranked" />,
  'My Favorite Chess Openings': () => <PlaceholderBlog title="My Favorite Chess Openings" />,
  'Street Photography Collection': () => <PlaceholderBlog title="Street Photography Collection" />,
};

export default blogRegistry;
