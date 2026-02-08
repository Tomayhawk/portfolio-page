import { Link } from 'react-router-dom';
import { getTagColor } from '../../utils/data';

export const ProjectGridCard = ({ project }) => (
  <Link to={`/projects/${project.title}`} className="group flex flex-col bg-zinc-200 dark:bg-[#18181b] rounded-lg overflow-hidden border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-64">
    <div className="p-[7px] bg-zinc-200 dark:bg-[#18181b] transition-colors duration-200">
        <div className="h-32 w-full bg-zinc-100 dark:bg-[#202024] rounded-sm flex items-center justify-center text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
    </div>
    <div className="px-4 pb-4 pt-0 flex flex-col flex-1 justify-between overflow-hidden">
        <div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate">{project.title}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{project.description}</p>
        </div>
        <div className="flex items-center gap-1 mt-2 flex-nowrap overflow-hidden h-6">
            {project.tags.map(t => <span key={t} className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded shrink-0 ${getTagColor(t)}`}>{t}</span>)}
        </div>
    </div>
  </Link>
);
