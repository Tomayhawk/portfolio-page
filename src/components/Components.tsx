import { getTagColor } from '../utils/data.ts';
import { styles } from '../utils/styles.ts';

export const PageHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className={styles.pageHeaderContainer}>
    <h1 className={styles.h1}>{title}</h1>
    {description && <p className={`${styles.textStandard} max-w-2xl`}>{description}</p>}
  </div>
);

export const Tag = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`${styles.tagBase} ${getTagColor(text)} ${className}`}>{text}</span>
);

export const CodeSnippet = ({ code, language = 'python' }: { code: string; language?: string }) => (
  <div className={styles.codeSnippetContainer}>
    <div className={styles.codeSnippetHeader}>{language}</div>
    <div className={styles.codeSnippetBody}>
      <pre className={styles.codeSnippetPre}>
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

export const ContentSection = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <section className={styles.sectionContainer}>
    {title && <h2 className={styles.contentSectionH2}>{title}</h2>}
    <div className={styles.contentSectionText}>{children}</div>
  </section>
);
