// Type definitions for contentService
import { ContentItem } from '../types';

declare module '../services/contentService' {
  export function getContentByAgeGroup(ageGroup: string): Promise<ContentItem[]>;
  export function getContentById(id: string): Promise<ContentItem>;
  export function searchContent(query: string): Promise<ContentItem[]>;
  export function getFeaturedContent(): Promise<ContentItem[]>;

  const contentService: {
    getContentByAgeGroup: typeof getContentByAgeGroup;
    getContentById: typeof getContentById;
    searchContent: typeof searchContent;
    getFeaturedContent: typeof getFeaturedContent;
  };

  export default contentService;
}
