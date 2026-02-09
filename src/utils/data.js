export const TAGS = {
  PYTHON: { label: 'Python', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  DISCORD: { label: 'Discord Bot', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200' },
  ASYNC: { label: 'AsyncIO', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  JS: { label: 'JavaScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
  REACT: { label: 'React', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
  EXTENSION: { label: 'Browser Extension', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200' },
  CPP: { label: 'C++', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  HARDWARE: { label: 'Hardware', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  SWIFT: { label: 'Swift', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200' },
  KOTLIN: { label: 'Kotlin', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200' },
  GO: { label: 'Go', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200' },
  RUST: { label: 'Rust', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200' },
  AWS: { label: 'AWS', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' },
  DOCKER: { label: 'Docker', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
  SQL: { label: 'SQL', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  LINUX: { label: 'Linux', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' },
  UNITY: { label: 'Unity', color: 'bg-stone-100 text-stone-800 dark:bg-stone-900/40 dark:text-stone-200' },
  GAME_DEV: { label: 'Game Dev', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200' },
  AI: { label: 'AI', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  MOBILE: { label: 'Mobile', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200' },
};

export const projectsData = [
  {
    id: 1,
    title: 'Project-1',
    description: 'A Discord bot that facilitates chess matches between users.',
    tags: [TAGS.PYTHON.label, TAGS.DISCORD.label, TAGS.ASYNC.label],
    modified: '2026-01-14',
    created: '2025-12-01',
    sizeBytes: 1500000,
    version: '1.0.4',
    license: 'MIT',
    status: 'Active',
    links: { github: 'https://github.com/tomayhawk/project1' }
  },
  {
    id: 2,
    title: 'Project-2',
    description: 'A browser extension to modify web behavior and improve productivity.',
    tags: [TAGS.JS.label, TAGS.EXTENSION.label, TAGS.REACT.label],
    modified: '2026-01-20',
    created: '2025-11-10',
    sizeBytes: 450000,
    version: '2.1.0',
    license: 'MIT',
    status: 'Active',
    links: { github: '#', demo: '#' }
  },
  {
    id: 3,
    title: 'Project-3',
    description: 'Hardware project involving embedded systems.',
    tags: [TAGS.CPP.label, TAGS.HARDWARE.label],
    modified: '2025-12-28',
    created: '2025-08-15',
    sizeBytes: 24000,
    version: '0.9.beta',
    license: 'GPLv3',
    status: 'Maintenance',
    links: { github: '#' }
  },
  {
    id: 4,
    title: 'Project-4',
    description: 'Cloud infrastructure automation scripts.',
    tags: [TAGS.PYTHON.label, TAGS.AWS.label, TAGS.DOCKER.label],
    modified: '2025-11-15',
    created: '2025-10-01',
    sizeBytes: 10240,
    version: '1.0.0',
    status: 'Archived',
    links: {}
  },
  {
    id: 5,
    title: 'Project-5',
    description: 'Interactive dashboard for data visualization.',
    tags: [TAGS.JS.label, TAGS.REACT.label, TAGS.SQL.label],
    modified: '2025-11-01',
    created: '2025-09-20',
    sizeBytes: 512000,
    version: '3.0.1',
    status: 'Active',
    links: { github: '#', demo: '#' }
  },
  {
    id: 6,
    title: 'Project-6',
    description: 'Native iOS application for personal task management.',
    tags: [TAGS.SWIFT.label, TAGS.MOBILE.label],
    modified: '2026-02-01',
    created: '2025-12-15',
    sizeBytes: 25000000,
    version: '1.2',
    status: 'Active',
    links: { appStore: '#' }
  },
  {
    id: 7,
    title: 'Project-7',
    description: 'High-performance game engine subsystem.',
    tags: [TAGS.CPP.label, TAGS.GAME_DEV.label, TAGS.LINUX.label],
    modified: '2026-01-25',
    created: '2025-06-01',
    sizeBytes: 128000000,
    version: '0.1-alpha',
    status: 'In Development',
    links: { github: '#' }
  },
  {
    id: 8,
    title: 'Project-8',
    description: 'Microservices architecture proof of concept.',
    tags: [TAGS.GO.label, TAGS.DOCKER.label, TAGS.AWS.label],
    modified: '2025-10-10',
    created: '2025-09-01',
    sizeBytes: 5000000,
    version: '1.0',
    status: 'Archived',
    links: {}
  },
  {
    id: 9,
    title: 'Project-9',
    description: 'Android utility app for network diagnostics.',
    tags: [TAGS.KOTLIN.label, TAGS.MOBILE.label],
    modified: '2025-09-15',
    created: '2025-07-20',
    sizeBytes: 15000000,
    version: '2.0',
    status: 'Active',
    links: { playStore: '#' }
  },
  {
    id: 10,
    title: 'Project-10',
    description: 'Real-time strategy game prototype.',
    tags: [TAGS.UNITY.label, TAGS.GAME_DEV.label, TAGS.C_SHARP?.label || 'C#'],
    modified: '2025-12-05',
    created: '2025-05-10',
    sizeBytes: 450000000,
    version: '0.5',
    status: 'Paused',
    links: { demo: '#' }
  },
  {
    id: 11,
    title: 'Project-11',
    description: 'Systems programming experiment in memory safety.',
    tags: [TAGS.RUST.label, TAGS.LINUX.label],
    modified: '2026-01-05',
    created: '2025-12-20',
    sizeBytes: 204800,
    version: '0.1',
    status: 'Active',
    links: { github: '#' }
  },
  {
    id: 12,
    title: 'Project-12',
    description: 'Machine learning model for image recognition.',
    tags: [TAGS.PYTHON.label, TAGS.AI.label],
    modified: '2025-11-20',
    created: '2025-08-01',
    sizeBytes: 850000000,
    version: '1.0',
    status: 'Completed',
    links: { github: '#', paper: '#' }
  }
];

// Blog Posts
export const BLOG_POSTS = [
    { 
      id: 1, 
      title: 'Building a Portfolio with React', 
      date: '2026-02-05', 
      excerpt: 'How I structured this website using Vite and Tailwind CSS.',
      category: 'Code',
      tags: ['React', 'Tailwind', 'Vite'],
      created: '2026-02-05',
      modified: '2026-02-05',
      sizeBytes: 12000,
      links: {} 
    },
    { 
      id: 2, 
      title: 'Why I Switch to Linux', 
      date: '2026-01-20', 
      excerpt: 'A journey from Windows to a custom Arch Linux setup.',
      category: 'Opinion',
      tags: ['Linux', 'Arch', 'Workflow'],
      created: '2026-01-20',
      modified: '2026-01-22',
      sizeBytes: 15000,
      links: {}
    },
    { 
      id: 3, 
      title: 'Understanding AsyncIO in Python', 
      date: '2026-01-10', 
      excerpt: 'Deep dive into asynchronous programming for bot development.',
      category: 'Code',
      tags: ['Python', 'AsyncIO'],
      created: '2026-01-10',
      modified: '2026-01-10',
      sizeBytes: 18000,
      links: {}
    },
    { 
      id: 4, 
      title: 'Coffee Brewing Methods Ranked', 
      date: '2025-12-15', 
      excerpt: 'My subjective ranking of brewing methods from V60 to French Press.',
      category: 'Lifestyle',
      tags: ['Coffee', 'Hobby'],
      created: '2025-12-15',
      modified: '2025-12-15',
      sizeBytes: 8000,
      links: {}
    },
    { 
      id: 5, 
      title: 'Digital Minimalism in 2026', 
      date: '2025-11-30', 
      excerpt: 'Reducing screen time and focusing on deep work.',
      category: 'Opinion',
      tags: ['Productivity', 'Minimalism'],
      created: '2025-11-30',
      modified: '2025-11-30',
      sizeBytes: 10000,
      links: {}
    },
    { 
      id: 6, 
      title: 'Chess Openings for Beginners', 
      date: '2025-10-20', 
      excerpt: 'Why you should stop memorizing lines and start understanding principles.',
      category: 'Lifestyle',
      tags: ['Chess', 'Strategy'],
      created: '2025-10-20',
      modified: '2025-10-20',
      sizeBytes: 14000,
      links: {}
    },
];

// Photos
export const PHOTOS = [
  { id: 1, src: '/photos/2W5A7297.JPG', label: 'Photo 1' },
  { id: 2, src: '/photos/2W5A7306.JPG', label: 'Photo 2' },
  { id: 3, src: '/photos/2W5A7608.JPG', label: 'Photo 3' },
  { id: 4, src: '/photos/2W5A7738.JPG', label: 'Photo 4' },
  { id: 5, src: '/photos/2W5A7833(1).JPG', label: 'Photo 5' },
  { id: 6, src: '/photos/2W5A7877.JPG', label: 'Photo 6' },
  { id: 7, src: '/photos/2W5A7898.JPG', label: 'Photo 7' },
  { id: 8, src: '/photos/2W5A8028.JPG', label: 'Photo 8' },
  { id: 9, src: '/photos/2W5A2662.JPG', label: 'Photo 9' },
];

export const formatSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getTagColor = (tagLabel) => {
  const tagEntry = Object.values(TAGS).find(t => t.label === tagLabel);
  return tagEntry ? tagEntry.color : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200';
};

export const getTagCategory = (tag) => {
  const t = tag.toLowerCase();
  const langs = ['javascript', 'typescript', 'react', 'node.js', 'python', 'flask', 'django', 'c++', 'c#', 'rust', 'sql', 'swift', 'kotlin', 'go', 'java', 'unity'];
  return langs.some(l => t.includes(l)) ? 'Languages & Frameworks' : 'Tags & Topics';
};
