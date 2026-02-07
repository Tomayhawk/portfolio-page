// Centralized Tags System
export const TAGS = {
  PYTHON: { label: 'Python', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  REACT: { label: 'React', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
  JS: { label: 'JavaScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
  DISCORD: { label: 'Discord Bot', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200' },
  C_CPP: { label: 'C++', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  HARDWARE: { label: 'Hardware', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  BACKEND: { label: 'Backend', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  FRONTEND: { label: 'Frontend', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
  UTILITY: { label: 'Utility', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200' },
  AI: { label: 'AI', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
};

// Static Project List
export const projectsData = [
  {
    id: 1,
    title: "Minty Voice Assistant",
    description: "A local, Python-based voice assistant capable of handling system tasks and voice commands.",
    tags: [TAGS.PYTHON.label, TAGS.AI.label, TAGS.UTILITY.label],
    modified: '2026-01-30',
    sizeBytes: 45000000,
  },
  {
    id: 2,
    title: "Discord Chess Bot",
    description: "A Discord bot that facilitates chess matches between users using standard chess libraries.",
    tags: [TAGS.PYTHON.label, TAGS.DISCORD.label, TAGS.BACKEND.label],
    modified: '2026-01-14',
    sizeBytes: 1500000,
  },
  {
    id: 3,
    title: "Arduino Chess Clock",
    description: "A physical chess clock built with C++ on Arduino hardware with custom timing controls.",
    tags: [TAGS.C_CPP.label, TAGS.HARDWARE.label],
    modified: '2026-01-28',
    sizeBytes: 24000,
  },
  {
    id: 4,
    title: "Project-4",
    description: "Placeholder for Project 4.",
    tags: [TAGS.JS.label, TAGS.FRONTEND.label],
    modified: '2026-01-05',
    sizeBytes: 10240,
  },
  {
    id: 5,
    title: "Project-5",
    description: "Placeholder for Project 5.",
    tags: [TAGS.REACT.label, TAGS.FRONTEND.label],
    modified: '2026-01-02',
    sizeBytes: 512000,
  }
];

export const formatSize = (bytes) => {
  if (!bytes) return 'N/A';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Helper to find color based on the Label string
export const getTagColor = (tagLabel) => {
  const tagEntry = ObjectZB.values(TAGS).find(t => t.label === tagLabel);
  return tagEntry ? tagEntry.color : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200';
};

export const getTagCategory = (tag) => {
  const t = tag.toLowerCase();
  const langs = ['javascript', 'typescript', 'react', 'node.js', 'python', 'flask', 'django', 'c++', 'c#', 'rust', 'sql', 'html', 'css', 'frontend', 'backend', 'swift', 'java'];
  return langs.some(l => t.includes(l)) ? 'Languages & Frameworks' : 'Tags & Topics';
};
