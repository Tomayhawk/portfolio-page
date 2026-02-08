import { useState } from 'react';
import { projectsData, getTagCategory } from '../utils/data';

export function useProjectFilters() {
  const [layout, setLayout] = useState('grid');
  const [langFilter, setLangFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Any time');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [tagMatchMode, setTagMatchMode] = useState('all');
  const [sizeRange, setSizeRange] = useState({ min: '', max: '' });
  // Default sort: Name A-Z
  const [sortConfig, setSortConfig] = useState({ key: 'name', dir: 'asc' });
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const allTags = Array.from(new Set(projectsData.flatMap(p => p.tags))).sort();
  const langOptions = ['All', ...allTags.filter(t => getTagCategory(t) === 'Languages & Frameworks')];

  const handleTimeFilterChange = (val) => {
      setTimeFilter(val);
      if (val === 'Custom Range') {
          setShowCustomDate(true);
      } else {
          setShowCustomDate(false);
          setCustomStart('');
          setCustomEnd('');
      }
  };

  const toggleTag = (tag) => {
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
    // Reset sort to Name A-Z
    setSortConfig({ key: 'name', dir: 'asc' });
  };

  const parseAdvancedSearch = (query) => {
      const terms = query.toLowerCase().split(/\s+/);
      const criteria = { text: [], includeTags: [], excludeTags: [], anyTags: [], minSize: 0, maxSize: Infinity, sort: null };
      
      terms.forEach(term => {
          if (term.startsWith('tag:')) criteria.includeTags.push(term.replace('tag:', '').replace(/_/g, ' '));
          else if (term.startsWith('+tag:')) criteria.includeTags.push(term.replace('+tag:', '').replace(/_/g, ' '));
          else if (term.startsWith('-tag:')) criteria.excludeTags.push(term.replace('-tag:', '').replace(/_/g, ' '));
          else if (term.startsWith('any:') || term.startsWith('|tag:')) criteria.anyTags.push(term.replace(/^(any:|\|tag:)/, '').replace(/_/g, ' '));
          else if (term.startsWith('size:')) {
              const val = term.replace('size:', '');
              const match = val.match(/^([<>]=?)?(\d+(\.\d+)?)(kb|mb|gb|b)?$/);
              if (match) {
                  const [, op, num, , unit] = match;
                  let bytes = parseFloat(num) * (unit === 'kb' ? 1024 : unit === 'gb' ? 1024**3 : unit === 'b' ? 1 : 1024**2);
                  if (op === '<') criteria.maxSize = Math.min(criteria.maxSize, bytes);
                  else if (op === '>') criteria.minSize = Math.max(criteria.minSize, bytes);
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
        if (sc.includeTags.length && !sc.includeTags.every(t => p.tags.some(pt => pt.toLowerCase().includes(t)))) return false;
        if (sc.excludeTags.length && sc.excludeTags.some(t => p.tags.some(pt => pt.toLowerCase().includes(t)))) return false;
        if (sc.anyTags.length && !sc.anyTags.some(t => p.tags.some(pt => pt.toLowerCase().includes(t)))) return false;
        if (p.sizeBytes < sc.minSize || p.sizeBytes > sc.maxSize) return false;
        if (sc.text.length && !sc.text.every(term => `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(term))) return false;
        
        if (selectedTags.size > 0) {
            const hasTags = Array.from(selectedTags).filter(t => p.tags.includes(t));
            if (tagMatchMode === 'all' && hasTags.length !== selectedTags.size) return false;
            if (tagMatchMode === 'any' && hasTags.length === 0) return false;
        }

        if (sizeRange.min && p.sizeBytes < parseFloat(sizeRange.min) * 1024**2) return false;
        if (sizeRange.max && p.sizeBytes > parseFloat(sizeRange.max) * 1024**2) return false;
        if (langFilter !== 'All' && !p.tags.includes(langFilter)) return false;
        
        const pDate = new Date(p.modified);
        if (timeFilter === 'Last 7 days' && now - pDate > 7 * 86400000) return false;
        if (timeFilter === 'Last 30 days' && now - pDate > 30 * 86400000) return false;
        if (timeFilter === 'Last 90 days' && now - pDate > 90 * 86400000) return false;
        if (timeFilter === 'Last year' && now - pDate > 365 * 86400000) return false;
        if (timeFilter === 'This Year' && pDate.getFullYear() !== now.getFullYear()) return false;
        if (timeFilter === 'Custom Range' && customStart && customEnd) {
            const start = new Date(customStart), end = new Date(customEnd);
            end.setHours(23,59,59,999);
            if (pDate < start || pDate > end) return false;
        }
        return true;
    });

    const sort = sc.sort || sortConfig;
    return result.sort((a, b) => {
      let res = 0;
      if (sort.key === 'name') res = a.title.localeCompare(b.title);
      else if (sort.key === 'modified') res = new Date(a.modified) - new Date(b.modified);
      else if (sort.key === 'created') res = new Date(a.created) - new Date(b.created);
      else if (sort.key === 'size') res = a.sizeBytes - b.sizeBytes;
      else if (sort.key === 'tags') res = (a.tags[0]||'').localeCompare(b.tags[0]||'');
      return sort.dir === 'asc' ? res : -res;
    });
  })();

  return {
    layout, setLayout,
    langFilter, setLangFilter,
    timeFilter, setTimeFilter: handleTimeFilterChange,
    isAdvancedOpen, setIsAdvancedOpen,
    searchQuery, setSearchQuery,
    selectedTags, setSelectedTags,
    tagMatchMode, setTagMatchMode,
    sizeRange, setSizeRange,
    sortConfig, setSortConfig,
    showCustomDate, setShowCustomDate,
    customStart, setCustomStart,
    customEnd, setCustomEnd,
    filteredProjects,
    resetFilters,
    toggleTag,
    allTags,
    langOptions
  };
}
