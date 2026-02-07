import { useEffect } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Projects, { ProjectGridCard } from './Projects';
import SearchResults from './SearchResults';
import { useSimpleDarkMode } from './darkMode';
import { projectsData, getTagColor, formatSize } from './data';
import projectRegistry from './projects/registry';

const Home = () => (
  <div className="flex flex-col min-h-[75vh] justify-between">
    <div className="py-20 text-center">
      <h1 className="text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-6 tracking-tight">Tomayhawk Portfolio Page</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">Portfolio & Project Archive</p>
    </div>
    <div className="mt-auto pt-12">
      <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4 px-1">Pinned Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {projectsData.slice(0, 5).map(p => <ProjectGridCard key={p.id} project={p} />)}
      </div>
    </div>
  </div>
);

const About = () => <div className="p-4 text-zinc-800 dark:text-zinc-200">About Page Content</div>;

// PROJECT TEMPLATE
const ProjectDetail = () => {
  const { id } = useParams();
  // Find project by matching Title
  const project = projectsData.find(p => p.title === id);
  
  if (!project) return <div className="text-center py-20 text-zinc-500">Project not found</div>;

  const SpecificComponent = projectRegistry[project.title];

  return (
    <div className="max-w-full mx-auto py-8 animate-fadeIn">
        {/* Template Header */}
        <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
                 <div className="flex gap-2">
                    {project.tags.map(t => <span key={t} className={`px-2 py-1 rounded text-xs font-bold ${getTagColor(t)}`}>{t}</span>)}
                 </div>
                 <span className="text-zinc-400">|</span>
                 <span className="text-zinc-500 dark:text-zinc-400">Updated: {new Date(project.modified).toLocaleDateString()}</span>
                 <span className="text-zinc-400">|</span>
                 <span className="text-zinc-500 dark:text-zinc-400 font-mono">{formatSize(project.sizeBytes)}</span>
            </div>
        </div>

        {/* Content Body */}
        <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300">
             {SpecificComponent ? (
                 <SpecificComponent meta={project} />
             ) : (
                 <>
                    <p className="lead">{project.description}</p>
                    <div className="mt-12 p-8 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-center text-zinc-500">
                        No specific content populated for this project yet.
                    </div>
                 </>
             )}
        </div>
    </div>
  );
};

export default function App() {
  const { theme, toggleTheme } = useSimpleDarkMode();
  const location = useLocation();

  useEffect(() => {
    document.title = location.pathname === '/' ? 'Tomayhawk' : `Tomayhawk - ${location.pathname.slice(1).split('/')[0].charAt(0).toUpperCase() + location.pathname.slice(2).split('/')[0]}`;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 dark:bg-[#111114] text-zinc-900 dark:text-zinc-100 transition-colors duration-200 font-sans">
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <div className="mx-[10%] lg:mx-[18%] py-8 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
      <footer className="w-full py-6 text-center text-xs text-zinc-400 dark:text-zinc-600 bg-transparent">© 2026 Tomayhawk. All rights reserved.</footer>
    </div>
  );
}
