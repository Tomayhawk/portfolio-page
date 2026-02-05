export const projectsData = Array.from({ length: 41 }, (_, i) => {
  let tags = [];
  if (i === 0) tags = ['Python', 'Discord Bot', 'AsyncIO'];
  else if (i === 1) tags = ['JavaScript', 'Browser Extension', 'React'];
  else if (i === 2) tags = ['C++', 'Hardware', 'Embedded'];
  else if (i % 3 === 0) tags = ['Python', 'Flask', 'SQL', 'Backend'];
  else if (i % 3 === 1) tags = ['JavaScript', 'TypeScript', 'Node.js', 'Frontend'];
  else tags = ['C++', 'OpenGL', 'Math', 'Graphics'];

  return {
    id: i + 1,
    title: `Project-${i + 1}`,
    description: `Description for project ${i + 1}. Details about the project.`,
    tags: tags,
    modified: new Date(2026, 0, 41 - i).toISOString(), 
    sizeBytes: Math.floor(Math.random() * 10000000) + 10000,
  };
});

export const formatSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getTagColor = (tag) => {
  const t = tag.toLowerCase();
  if (['javascript', 'typescript', 'react', 'node.js', 'next.js', 'frontend'].some(k => t.includes(k))) 
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200';
  if (['python', 'flask', 'django', 'pandas', 'asyncio'].some(k => t.includes(k))) 
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200';
  if (['c++', 'c#', 'rust', 'opengl', 'embedded', 'hardware', 'graphics'].some(k => t.includes(k))) 
    return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200';
  if (['sql', 'database', 'mongo', 'postgres', 'docker', 'backend'].some(k => t.includes(k))) 
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200';
  if (['discord', 'bot', 'tool', 'utility', 'browser extension'].some(k => t.includes(k))) 
    return 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200';
  return 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200';
};

export const getTagCategory = (tag) => {
  const t = tag.toLowerCase();
  const langs = ['javascript', 'typescript', 'react', 'node.js', 'python', 'flask', 'django', 'c++', 'c#', 'rust', 'sql', 'html', 'css', 'frontend', 'backend'];
  return langs.some(l => t.includes(l)) ? 'Languages & Frameworks' : 'Tags & Topics';
};
