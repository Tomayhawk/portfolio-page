import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { formatSize } from '@/utils/data/helpers';
import { projectsData } from '@/utils/data/projects';
import { Badge } from '@/components/ui/Badge';
import { MarkdownRenderers } from '@/components/markdown/MarkdownRenderers';

const MetaRow = ({ label, value, isMono = false }: { label: string; value: string | number; isMono?: boolean }) => (
    <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 flex-wrap gap-x-2">
        <span className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-bold tracking-wide">{label}</span>
        <span className={`text-zinc-800 dark:text-zinc-200 text-sm ${isMono ? 'font-mono' : ''}`}>{value}</span>
    </div>
);

const Metadata = ({ project }: { project: any }) => (
    <div className="bg-white dark:bg-[#18181b] p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm">
        <h3 className="font-bold text-[10px] text-zinc-500 uppercase mb-2 tracking-wider">Metadata</h3>
        <div className="space-y-1">
            {project.status && (
                <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 flex-wrap gap-x-2">
                    <span className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-bold tracking-wide">Status</span>
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
            <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-bold text-[10px] text-zinc-500 uppercase mb-2 tracking-wider">Links</h3>
                    <div className="flex flex-col gap-1.5">
                    {Object.entries(project.links).map(([key, url]: [string, any]) => (
                        <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all group text-xs">
                            <span className="font-medium capitalize text-zinc-700 dark:text-zinc-300 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">{key}</span>
                            <svg className="w-3 h-3 text-zinc-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    ))}
                    </div>
            </div>
        )}
    </div>
);

export default function ProjectEntry() {
  const { id } = useParams();
  const project = projectsData.find(p => p.title === id);
  const [content, setContent] = useState('');

  // Dynamic Content Loading
  useEffect(() => {
    if (project) {
      // Assuming Vite loads markdown as raw strings
      import(`../../content/projects/${project.id}.md?raw`)
        .then(res => setContent(res.default))
        .catch(err => setContent("Content not found."));
    }
  }, [project]);
  
  if (!project) return <div className="text-center py-20 text-zinc-500">Project not found</div>;

  return (
    <div className="max-w-full mx-auto py-8 animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
          {project.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-xl leading-relaxed font-light mb-6">
          {project.description}
        </p>
        <hr className="border-zinc-200 dark:border-zinc-800" />
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      
        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-0">
        
          {/* Mobile-Only Metadata */}
          <div className="block lg:hidden mb-8 space-y-4">
            <Metadata project={project} />
            <div>
              <h3 className="text-xs font-bold uppercase text-zinc-400 mb-2 tracking-wider px-1">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t: string) => (
                  <Badge key={t} text={t} /> 
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-none">
            <ReactMarkdown components={MarkdownRenderers}>
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <Metadata project={project} />
            <div>
              <h3 className="text-xs font-bold uppercase text-zinc-400 mb-3 tracking-wider px-1">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t: string) => (
                  <Badge key={t} text={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
