import { ProjectSection, CodeSnippet } from '../components/common/CommonUI';

const TemplateBlog = ({ children }) => (
    <div className="animate-fadeIn">
        {children}
    </div>
);

const Blog1 = () => (
    <TemplateBlog>
        <ProjectSection>
            <p>This is a placeholder for a detailed article about building this portfolio. It would cover the initial setup of Vite, the reasoning behind using Tailwind CSS for rapid styling, and how React Router manages the navigation.</p>
        </ProjectSection>
        <ProjectSection title="Structure">
            <p>The project is structured with a clear separation of concerns. Common UI components are reused across pages to maintain consistency.</p>
        </ProjectSection>
    </TemplateBlog>
);

const Blog2 = () => (
    <TemplateBlog>
        <ProjectSection>
            <p>Moving from Windows to Linux is a significant change. This post explores the motivation behind switching to Arch Linux and the customization journey.</p>
        </ProjectSection>
        <ProjectSection title="The Terminal">
            <p>Learning the terminal was the biggest hurdle but also the most rewarding part.</p>
             <CodeSnippet language="bash" code={`sudo pacman -Syu
neofetch`} />
        </ProjectSection>
    </TemplateBlog>
);

const Blog3 = () => (
    <TemplateBlog>
        <ProjectSection>
            <p>AsyncIO is powerful but can be confusing. This post breaks down the event loop and coroutines in Python.</p>
        </ProjectSection>
        <ProjectSection title="Example">
             <CodeSnippet language="python" code={`import asyncio

async def main():
    print('Hello')
    await asyncio.sleep(1)
    print('World')`} />
        </ProjectSection>
    </TemplateBlog>
);

const Blog4 = () => (
    <TemplateBlog>
        <ProjectSection>
            <p>Coffee is more than just caffeine; it's a ritual. I rank my favorite brewing methods based on taste, effort, and consistency.</p>
        </ProjectSection>
        <ProjectSection title="Top Pick: V60">
            <p>The V60 offers the cleanest cup if you get the technique right.</p>
        </ProjectSection>
    </TemplateBlog>
);

const Blog5 = () => (
    <TemplateBlog>
        <ProjectSection>
            <p>In a world of constant notifications, digital minimalism is essential for mental clarity. This post discusses strategies to reduce screen time.</p>
        </ProjectSection>
    </TemplateBlog>
);

const Blog6 = () => (
    <TemplateBlog>
        <ProjectSection>
            <p>Beginners often obsess over opening traps. This post argues for understanding opening principles like controlling the center and piece development instead.</p>
        </ProjectSection>
        <ProjectSection title="Key Principles">
            <ul className="list-disc pl-5 space-y-2">
                <li>Control the center</li>
                <li>Develop knights before bishops</li>
                <li>Castle early</li>
            </ul>
        </ProjectSection>
    </TemplateBlog>
);

const blogRegistry = {
  'Building a Portfolio with React': Blog1,
  'Why I Switch to Linux': Blog2,
  'Understanding AsyncIO in Python': Blog3,
  'Coffee Brewing Methods Ranked': Blog4,
  'Digital Minimalism in 2026': Blog5,
  'Chess Openings for Beginners': Blog6,
};

export default blogRegistry;
