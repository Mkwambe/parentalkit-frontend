// Type definitions for ContentContext
import { ContentItem } from '../types';

export interface AgeGroupContent {
  [key: string]: {
    contents: ContentItem[];
  };
}

export interface ContentContextState {
  contents: ContentItem[];
  currentContent: ContentItem | null;
  ageGroupContent: AgeGroupContent;
  loading: boolean;
  error: string | null;
}

export interface ContentContextValue extends ContentContextState {
  getAllContents: (params?: any) => Promise<ContentItem[]>;
  getContentById: (id: string) => Promise<ContentItem>;
  getContentBySlug: (slug: string) => Promise<ContentItem>;
  getContentByAgeGroup: (ageGroup: string) => Promise<ContentItem[]>;
  getContentByCategory: (category: string) => Promise<ContentItem[]>;
  searchContent: (query: string) => Promise<ContentItem[]>;
}

declare const ContentContext: React.Context<ContentContextValue>;

export const useContent: () => ContentContextValue;
export const ContentProvider: React.FC<{children: React.ReactNode}>;

export default ContentContext;
