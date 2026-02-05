import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Projects, { ProjectGridCard } from './Projects';
import { useSimpleDarkMode } from './darkMode';
import { projectsData } from './data';

const Home = () => (
  <div className="flex flex-col min-h-[75vh] justify-between">
    <div className="py-20 text-center">
      <h1 className="text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-6 tracking-tight">Tomayhawk Portfolio Page</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">Portfolio & Project Archive</p>
    </div>
    <div className="mt-auto pt-12">
      <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4 px-1">Pinned Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {projectsData.filter(p => [1, 2, 3, 4, 5].includes(p.id)).map(p => <ProjectGridCard key={p.id} project={p} />)}
      </div>
    </div>
  </div>
);

const About = () => <div className="p-4 text-zinc-800 dark:text-zinc-200">About Page Content</div>;
const ProjectDetail = () => <div className="p-4 text-zinc-800 dark:text-zinc-200">Project Details Placeholder</div>;

export default function App() {
  const { theme, toggleTheme } = useSimpleDarkMode();
  const location = useLocation();

  useEffect(() => {
    document.title = location.pathname === '/' ? 'Tomayhawk' : `Tomayhawk - ${location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}`;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 dark:bg-[#111114] text-zinc-900 dark:text-zinc-100 transition-colors duration-200 font-sans">
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <div className="mx-[18%] py-8 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
      <footer className="w-full py-6 text-center text-xs text-zinc-400 dark:text-zinc-600 bg-transparent">© 2026 Tomayhawk. All rights reserved.</footer>
    </div>
  );
}
