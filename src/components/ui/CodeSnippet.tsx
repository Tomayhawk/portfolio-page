interface CodeSnippetProps {
  code: string;
  language?: string | undefined;
}

export const CodeSnippet = ({ code, language = 'text' }: CodeSnippetProps) => (
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
