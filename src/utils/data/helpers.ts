import { TAGS } from './projects';

export const formatSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getTagColor = (tagLabel: string): string => {
  const tagEntry = Object.values(TAGS).find(t => t.label === tagLabel);
  return tagEntry ? tagEntry.color : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200';
};

export const getTagCategory = (tag: string): string => {
  const t = tag.toLowerCase();
  const langs = ['javascript', 'typescript', 'react', 'node.js', 'python', 'flask', 'django', 'c++', 'c#', 'rust', 'sql', 'swift', 'kotlin', 'go', 'java', 'unity'];
  return langs.some(l => t.includes(l)) ? 'Languages & Frameworks' : 'Tags & Topics';
};
