import { useParams } from 'react-router-dom';
import { projectsData, getTagColor } from '../utils/data';
import projectRegistry from '../projects/registry';
import { MetadataBox } from '../components/common/MetadataBox';
import { styles } from '../utils/styles';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => p.title === id);
  
  if (!project) return <div className="text-center py-20 text-zinc-500">Project not found</div>;

  const SpecificComponent = projectRegistry[project.title];

  return (
    <div className="max-w-full mx-auto py-8 animate-fadeIn">
         <div className="mb-8">
            <h1 className={styles.h1}>{project.title}</h1>
            <p className={`${styles.textStandard} text-xl leading-relaxed font-light mb-6`}>{project.description}</p>
            <hr className="border-zinc-200 dark:border-zinc-800" />
         </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1 min-w-0">
                 <div className="block lg:hidden mb-8 space-y-4">
                    <MetadataBox project={project} />
                    <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 mb-2 tracking-wider px-1">Tags</h3>
                        <div className="flex flex-wrap gap-2">{project.tags.map(t => <span key={t} className={`${styles.tagBase} ${getTagColor(t)}`}>{t}</span>)}</div>
                    </div>
                 </div>
                 
                 <div className="prose dark:prose-invert max-w-none">
                     {SpecificComponent ? <SpecificComponent meta={project} /> : <div className="mt-12 p-8 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-center text-zinc-500">Specific details for this project have not been populated yet.</div>}
                </div>
            </div>
            <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 space-y-6">
                    <MetadataBox project={project} />
                    <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 mb-3 tracking-wider px-1">Tags</h3>
                        <div className="flex flex-wrap gap-2">{project.tags.map(t => <span key={t} className={`${styles.tagBase} ${getTagColor(t)}`}>{t}</span>)}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
