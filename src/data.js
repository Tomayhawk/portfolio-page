// Shared Project Data
export const projectsData = Array.from({ length: 41 }, (_, i) => {
  // Temporary tag assignment for variety
  let tags = [];
  if (i === 0) tags = ['Python', 'Discord Bot'];
  else if (i === 1) tags = ['JavaScript', 'Browser Extension'];
  else if (i === 2) tags = ['C++', 'Hardware'];
  else if (i % 3 === 0) tags = ['Python'];
  else if (i % 3 === 1) tags = ['JavaScript'];
  else tags = ['C++'];

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

// Helper for tag colors
export const getTagColor = (tag) => {
  switch (tag) {
    case 'Python': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200';
    case 'JavaScript': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200';
    case 'C++': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200';
    case 'Browser Extension': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200';
    case 'Discord Bot': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200';
    case 'Hardware': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200';
    default: return 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200';
  }
};
