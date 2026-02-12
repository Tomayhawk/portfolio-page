import { useParams } from 'react-router-dom';
import { projectsData, getTagColor, formatSize } from '../../utils/data.ts';
import projectRegistry from './registry.tsx';
import { styles } from '../../utils/styles.ts';

const MetaRow = ({ label, value, isMono = false }: { label: string; value: string | number; isMono?: boolean }) => (
    <div className={styles.projectMetaRow}>
        <span className={styles.projectMetaLabel}>{label}</span>
        <span className={`${styles.projectMetaValue} ${isMono ? 'font-mono' : ''}`}>{value}</span>
    </div>
);

const Metadata = ({ project }: { project: any }) => (
    <div className={styles.projectMetaBox}>
        <h3 className={styles.projectMetaHeading}>Metadata</h3>
        <div className="space-y-1">
            {project.status && (
                <div className={styles.projectMetaRow}>
                    <span className={styles.projectMetaLabel}>Status</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded text-[10px]">{project.status}</span>
                </div>
            )}
            <MetaRow label="Created" value={new Date(project.created).toLocaleDateString()} />
            {project.version && <MetaRow label="Version" value={project.version} isMono />}
            {project.license && <MetaRow label="License" value={project.license} />}
            {project.sizeBytes && <MetaRow label="Size" value={formatSize(project.sizeBytes)} isMono />}
            <MetaRow label="Modified" value={new Date(project.modified).toLocaleDateString()} />
            {project.category && <MetaRow label="Category" value={project.category} />}
        </div>

        {project.links && Object.keys(project.links).length > 0 && (
            <div className={styles.projectLinksContainer}>
                    <h3 className={styles.projectMetaHeading}>Links</h3>
                    <div className="flex flex-col gap-1.5">
                    {Object.entries(project.links).map(([key, url]: [string, any]) => (
                        <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={styles.projectLinkButton}>
                            <span className={styles.projectLinkText}>{key}</span>
                            <svg className={styles.iconSm + " text-zinc-400 group-hover:text-blue-500"} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    ))}
                    </div>
            </div>
        )}
    </div>
);

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projectsData.find(p => p.title === id);
  
    if (!project) return <div className={styles.blogEntryNotFound.replace('Post','Project')}>Project not found</div>;

  const SpecificComponent = projectRegistry[project.title];

  return (
    <div className={`max-w-full mx-auto py-8 ${styles.animateFadeIn}`}>
         <div className="mb-8">
            <h1 className={styles.h1}>{project.title}</h1>
            <p className={`${styles.textStandard} text-xl leading-relaxed font-light mb-6`}>{project.description}</p>
            <hr className="border-zinc-200 dark:border-zinc-800" />
         </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1 min-w-0">
                 <div className="block lg:hidden mb-8 space-y-4">
                    <Metadata project={project} />
                    <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 mb-2 tracking-wider px-1">Tags</h3>
                        <div className="flex flex-wrap gap-2">{project.tags.map((t: string) => <span key={t} className={`${styles.tagBase} ${getTagColor(t)}`}>{t}</span>)}</div>
                    </div>
                 </div>
                 
                 <div className="prose dark:prose-invert max-w-none">
                     {SpecificComponent ? <SpecificComponent meta={project} /> : <div className="mt-12 p-8 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-center text-zinc-500">Specific details for this project have not been populated yet.</div>}
                </div>
            </div>
            <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 space-y-6">
                    <Metadata project={project} />
                    <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 mb-3 tracking-wider px-1">Tags</h3>
                        <div className="flex flex-wrap gap-2">{project.tags.map((t: string) => <span key={t} className={`${styles.tagBase} ${getTagColor(t)}`}>{t}</span>)}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
