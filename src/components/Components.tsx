import { getTagColor } from '../utils/data.ts';

export const PageHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">{title}</h1>
    {description && <p className={"text-zinc-600 dark:text-zinc-400 max-w-2xl"}>{description}</p>}
  </div>
);

export const Tag = ({ text, className = "" }: { text: string; className?: string }) => (
    <span className={`px-2 py-1 rounded text-xs font-bold ${getTagColor(text)} ${className}`}>{text}</span>
);

export const CodeSnippet = ({ code, language = 'python' }: { code: string; language?: string }) => (
  <div className="my-6 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181b]">
    <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 uppercase">
      {language}
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

export const ContentSection = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <section className="mb-8 animate-fadeIn">
    {title && <h2 className={"text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-2"}>{title}</h2>}
    <div className={"text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4"}>{children}</div>
  </section>
);
