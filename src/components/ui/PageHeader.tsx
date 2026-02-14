interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => (
  <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">{title}</h1>
    {description && <p className={"text-zinc-600 dark:text-zinc-400 max-w-2xl"}>{description}</p>}
  </div>
);
