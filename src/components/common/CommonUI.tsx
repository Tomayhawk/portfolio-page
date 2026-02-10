import { getTagColor } from '../../utils/data.ts';
import { styles } from '../../utils/styles.ts';

export const PageHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
    <h1 className={styles.h1}>{title}</h1>
    {description && <p className={`${styles.textStandard} max-w-2xl`}>{description}</p>}
  </div>
);

export const Tag = ({ text, className = "" }: { text: string; className?: string }) => (
    <span className={`${styles.tagBase} ${getTagColor(text)} ${className}`}>{text}</span>
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

export const ProjectSection = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <section className={styles.sectionContainer}>
    {title && <h2 className={`${styles.h2} border-b border-zinc-200 dark:border-zinc-800 pb-2`}>{title}</h2>}
    <div className={`${styles.textStandard} leading-relaxed space-y-4`}>{children}</div>
  </section>
);
