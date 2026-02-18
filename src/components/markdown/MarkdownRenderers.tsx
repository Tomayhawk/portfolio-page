import type { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const MarkdownRenderers: Components = {
  // HEADINGS (Font & Structure)
  h1: ({ node, ...props }) => (
    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mt-10 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mt-8 mb-4 flex items-center gap-2" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-300 mt-6 mb-3" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="text-lg font-medium text-zinc-700 dark:text-zinc-400 mt-4 mb-2 uppercase tracking-wide" {...props} />
  ),

  // TEXT BODY (Typography)
  p: ({ node, ...props }) => (
    <p className="text-base text-zinc-600 dark:text-zinc-400 leading-7 mb-5" {...props} />
  ),
  strong: ({ node, ...props }) => (
    <strong className="font-bold text-zinc-900 dark:text-zinc-100" {...props} />
  ),
  em: ({ node, ...props }) => (
    <em className="italic text-zinc-700 dark:text-zinc-300 font-serif" {...props} />
  ),
  del: ({ node, ...props }) => (
    <del className="line-through text-zinc-400 dark:text-zinc-600" {...props} />
  ),
  
  // BLOCKQUOTES (Callouts/Structures)
  blockquote: ({ node, ...props }) => (
    <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 my-6 rounded-r-lg italic text-zinc-700 dark:text-zinc-300 shadow-sm">
      <blockquote {...props} />
    </div>
  ),

  // LISTS
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-outside ml-6 space-y-2 mb-6 text-zinc-600 dark:text-zinc-400 marker:text-zinc-400" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-outside ml-6 space-y-2 mb-6 text-zinc-600 dark:text-zinc-400 marker:font-bold" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li className="pl-1" {...props} />
  ),

  // LINKS
  a: ({ node, ...props }) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-300/50 underline-offset-2 transition-colors font-medium" 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props} 
    />
  ),

  // IMAGES (Media)
  img: ({ node, ...props }) => (
    <img 
      className="rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 my-8 w-full object-cover max-h-[500px]" 
      loading="lazy"
      {...props} 
    />
  ),

  // DIVIDERS (Structure)
  hr: ({ node, ...props }) => (
    <hr className="my-10 border-t-2 border-zinc-100 dark:border-zinc-800/50 w-32 mx-auto" {...props} />
  ),

  // TABLES (Complex Data)
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-8 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => (
    <thead className="bg-zinc-50 dark:bg-zinc-800/50" {...props} />
  ),
  tbody: ({ node, ...props }) => (
    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900" {...props} />
  ),
  tr: ({ node, ...props }) => (
    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors" {...props} />
  ),
  th: ({ node, ...props }) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="px-4 py-3 whitespace-nowrap text-zinc-700 dark:text-zinc-300" {...props} />
  ),

  // CODE
  code({ node, className, children, ref, ...props }) {
    const match = /language-(\w+)/.exec((className as string) || '');
    const isInline = !match;

    // 1. Inline Code (e.g., `variable`)
    if (isInline) {
      return (
        <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded text-sm font-mono font-bold border border-zinc-200 dark:border-zinc-700/50" {...props}>
          {children}
        </code>
      );
    }

    // 2. Block Code
    return (
      <div className="rounded-xl overflow-hidden my-8 border border-zinc-200 dark:border-zinc-700 shadow-md group relative">
        <div className="bg-zinc-900 px-4 py-2 text-[10px] text-zinc-400 uppercase font-bold tracking-widest border-b border-zinc-700 flex justify-between items-center select-none">
            <span>{match?.[1] || 'TERMINAL'}</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus as any}
          language={match?.[1]}
          PreTag="div"
          showLineNumbers={true} // Added line numbers
          lineNumberStyle={{ minWidth: "2em", paddingRight: "1em", color: "#52525b", textAlign: "right" }}
          customStyle={{ margin: 0, borderRadius: 0, padding: '1.5rem', backgroundColor: '#18181b' }} 
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  },
};
