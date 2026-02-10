import { projectsData } from '../utils/data.ts';
import { ProjectGridCard } from '../components/projects/ProjectCard.tsx';
import { styles } from '../utils/styles.ts';

export default function HomePage() {
  return (
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
}
