import { ProjectSection } from '../components/common/CommonUI';

export default function Blog1() {
    return (
        <div className="animate-fadeIn">
            <ProjectSection>
                <p>This is a temporary placeholder for the "Building a Portfolio with React" article. The actual content will be populated here.</p>
                <p>We are using a component-based structure where each blog post is its own React component, allowing for rich interactivity and custom layouts per post if needed.</p>
            </ProjectSection>
            <ProjectSection title="Technical Details">
                <p>This page is loaded dynamically via a registry system.</p>
            </ProjectSection>
        </div>
    );
}
