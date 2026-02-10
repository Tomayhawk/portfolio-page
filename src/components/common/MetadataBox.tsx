import { formatSize } from '../../utils/data.ts';

const MetaRow = ({ label, value, isMono = false }: { label: string; value: string | number; isMono?: boolean }) => (
    <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0fv flex-wrap gap-x-2">
        <span className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-bold tracking-wide">{label}</span>
        <span className={`text-zinc-800 dark:text-zinc-200 text-sm ${isMono ? 'font-mono' : ''}`}>{value}</span>
    </div>
);

export const MetadataBox = ({ project }: { project: any }) => (
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
