import Blog1 from './Blog1.tsx';
import { ProjectSection } from '../../../components/common/CommonUI.tsx';

const PlaceholderBlog = ({ title }: { title: string }) => (
    <div className="animate-fadeIn">
        <ProjectSection>
            <p className="italic text-zinc-500">This is a temporary placeholder for the blog post: <strong>{title}</strong>.</p>
            <p className="mt-4">Content for this section is coming soon. Use the categories above to navigate other topics.</p>
        </ProjectSection>
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
