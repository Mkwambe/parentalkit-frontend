import React, { createContext, useContext, useState } from 'react';
import contentService from '../services/contentService';
import { ContentItem, ContentByAgeGroup } from '../types';

// Create content context
interface ContentContextState {
  ageGroupContent: ContentByAgeGroup;
  currentContent: ContentItem | null;
  loading: boolean;
  error: string | null;
}

interface ContentContextValue extends ContentContextState {
  getContentByAgeGroup: (ageGroup: string) => Promise<ContentItem[]>;
  getContentById: (id: string) => Promise<ContentItem>;
  searchContent: (query: string) => Promise<ContentItem[]>;
  getFeaturedContent: () => Promise<ContentItem[]>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

// Content provider component
export const ContentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [contentState, setContentState] = useState<ContentContextState>({
    ageGroupContent: {},
    currentContent: null,
    loading: false,
    error: null
  });

  // Get content by age group
  const getContentByAgeGroup = async (ageGroup: string) => {
    setContentState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await contentService.getContentByAgeGroup(ageGroup);
      setContentState(prev => ({ 
        ...prev, 
        ageGroupContent: {
          ...prev.ageGroupContent,
          [ageGroup]: {
            ageGroup,
            contents: data
          }
        },
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setContentState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch content',
        loading: false 
      }));
      throw err;
    }
  };

  // Get content by ID
  const getContentById = async (id: string) => {
    setContentState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await contentService.getContentById(id);
      setContentState(prev => ({ 
        ...prev, 
        currentContent: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setContentState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch content',
        loading: false 
      }));
      throw err;
    }
  };

  // Search content
  const searchContent = async (query: string) => {
    setContentState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await contentService.searchContent(query);
      setContentState(prev => ({ 
        ...prev, 
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setContentState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to search content',
        loading: false 
      }));
      throw err;
    }
  };

  // Get featured content
  const getFeaturedContent = async () => {
    setContentState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await contentService.getFeaturedContent();
      setContentState(prev => ({ 
        ...prev, 
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setContentState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch featured content',
        loading: false 
      }));
      throw err;
    }
  };

  // Context value
  const value: ContentContextValue = {
    ...contentState,
    getContentByAgeGroup,
    getContentById,
    searchContent,
    getFeaturedContent
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

// Custom hook to use content context
export const useContent = (): ContentContextValue => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export default ContentContext;
