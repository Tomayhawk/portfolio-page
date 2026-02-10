import { useState } from 'react';
import { projectsData, getTagCategory } from '../utils/data.ts';

export function useProjectFilters() {
  const [layout, setLayout] = useState('grid');
  const [langFilter, setLangFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Any time');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [tagMatchMode, setTagMatchMode] = useState('all');
  const [sizeRange, setSizeRange] = useState({ min: '', max: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'name', dir: 'asc' });
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const allTags = Array.from(new Set(projectsData.flatMap(p => p.tags))).sort();
  const langOptions = ['All', ...allTags.filter(t => getTagCategory(t) === 'Languages & Frameworks')];

  const handleTimeFilterChange = (val: string) => {
      setTimeFilter(val);
      if (val === 'Custom Range') {
          setShowCustomDate(true);
      } else {
          setShowCustomDate(false);
          setCustomStart('');
          setCustomEnd('');
      }
  };

  const toggleTag = (tag: string) => {
      const newTags = new Set(selectedTags);
      newTags.has(tag) ? newTags.delete(tag) : newTags.add(tag);
      setSelectedTags(newTags);
  };

  const resetFilters = () => {
    setLangFilter('All');
    setTimeFilter('Any time');
    setSearchQuery('');
    setSelectedTags(new Set());
    setTagMatchMode('all');
    setSizeRange({ min: '', max: '' });
    setShowCustomDate(false);
    setCustomStart('');
    setCustomEnd('');
    setSortConfig({ key: 'name', dir: 'asc' });
  };

  const parseAdvancedSearch = (query: string) => {
      const terms = query.toLowerCase().split(/\s+/);
      const criteria: any = { text: [], includeTags: [], excludeTags: [], anyTags: [], minSize: 0, maxSize: Infinity, sort: null };
      
      terms.forEach(term => {
          if (term.startsWith('tag:')) criteria.includeTags.push(term.replace('tag:', '').replace(/_/g, ' '));
          else if (term.startsWith('+tag:')) criteria.includeTags.push(term.replace('+tag:', '').replace(/_/g, ' '));
          else if (term.startsWith('-tag:')) criteria.excludeTags.push(term.replace('-tag:', '').replace(/_/g, ' '));
          else if (term.startsWith('any:') || term.startsWith('|tag:')) criteria.anyTags.push(term.replace(/^(any:|\|tag:)/, '').replace(/_/g, ' '));
          else if (term.startsWith('size:')) {
              const val = term.replace('size:', '');
              const match = val.match(/^([<>]=?)?(\d+(\.\d+)?)(kb|mb|gb|b)?$/);
              if (match && match[2]) {
                  const op = match[1];
                  const num = match[2];
                  const unit = match[4];
                  let bytes = parseFloat(num) * ((unit || 'mb') === 'kb' ? 1024 : (unit || 'mb') === 'gb' ? 1024**3 : (unit || 'mb') === 'b' ? 1 : 1024**2);
                  if (op === '<') criteria.maxSize = Math.min(criteria.maxSize, bytes);
                  else if (op === '>' || op === '>=') criteria.minSize = Math.max(criteria.minSize, bytes);
                  else if (op === '<=' && op !== undefined) criteria.maxSize = Math.min(criteria.maxSize, bytes);
              }
          }
          else criteria.text.push(term);
      });
      return criteria;
  };

  const filteredProjects = (() => {
    const now = new Date();
    const sc = parseAdvancedSearch(searchQuery);
    
    let result = projectsData.filter(p => {
        if (sc.includeTags.length && !sc.includeTags.every((t: string) => p.tags.some((pt: string) => pt.toLowerCase().includes(t)))) return false;
        if (sc.excludeTags.length && sc.excludeTags.some((t: string) => p.tags.some((pt: string) => pt.toLowerCase().includes(t)))) return false;
        if (sc.anyTags.length && !sc.anyTags.some((t: string) => p.tags.some((pt: string) => pt.toLowerCase().includes(t)))) return false;
        if (p.sizeBytes < sc.minSize || p.sizeBytes > sc.maxSize) return false;
        if (sc.text.length && !sc.text.every((term: string) => `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(term))) return false;
        
        if (selectedTags.size > 0) {
            const hasTags = Array.from(selectedTags).filter((t: any) => p.tags.includes(t));
            if (tagMatchMode === 'all' && hasTags.length !== selectedTags.size) return false;
            if (tagMatchMode === 'any' && hasTags.length === 0) return false;
        }

        if (sizeRange.min && p.sizeBytes < parseFloat(sizeRange.min) * 1024**2) return false;
        if (sizeRange.max && p.sizeBytes > parseFloat(sizeRange.max) * 1024**2) return false;
        if (langFilter !== 'All' && !p.tags.includes(langFilter)) return false;
        
        const pDate = new Date(p.modified);
        if (timeFilter === 'Last 7 days' && now.getTime() - pDate.getTime() > 7 * 86400000) return false;
        if (timeFilter === 'Last 30 days' && now.getTime() - pDate.getTime() > 30 * 86400000) return false;
        if (timeFilter === 'Last 90 days' && now.getTime() - pDate.getTime() > 90 * 86400000) return false;
        if (timeFilter === 'This Year' && pDate.getFullYear() !== now.getFullYear()) return false;
        if (timeFilter === 'Last year' && pDate.getFullYear() !== now.getFullYear() - 1) return false;
        if (timeFilter === 'Custom Range' && customStart && customEnd) {
            const start = new Date(customStart);
            const end = new Date(customEnd);
            if (pDate < start || pDate > end) return false;
        }
        return true;
    });

    result.sort((a: any, b: any) => {
        let aVal, bVal;
        if (sortConfig.key === 'name') { aVal = a.title; bVal = b.title; }
        else if (sortConfig.key === 'modified') { aVal = new Date(a.modified).getTime(); bVal = new Date(b.modified).getTime(); }
        else if (sortConfig.key === 'created') { aVal = new Date(a.created).getTime(); bVal = new Date(b.created).getTime(); }
        else if (sortConfig.key === 'size') { aVal = a.sizeBytes; bVal = b.sizeBytes; }
        else if (sortConfig.key === 'tags') { aVal = a.tags.join(','); bVal = b.tags.join(','); }
        
        if (aVal < bVal) return sortConfig.dir === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.dir === 'asc' ? 1 : -1;
        return 0;
    });

    return result;
  })();

  return { layout, setLayout, langFilter, setLangFilter, timeFilter, setTimeFilter, isAdvancedOpen, setIsAdvancedOpen, searchQuery, setSearchQuery, selectedTags, tagMatchMode, setTagMatchMode, sizeRange, setSizeRange, sortConfig, setSortConfig, showCustomDate, setCustomStart, setCustomEnd, filteredProjects, resetFilters, toggleTag, allTags, langOptions, handleTimeFilterChange };
}
