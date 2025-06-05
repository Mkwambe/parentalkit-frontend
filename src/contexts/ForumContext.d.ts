import { Forum, Post, Comment } from '../types';
import { ReactNode } from 'react';

export interface ForumProviderProps {
  children: ReactNode;
}

export interface ForumState {
  forums: Forum[];
  currentForum: Forum | null;
  posts: Post[];
  currentPost: Post | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export interface ForumContextValue extends ForumState {
  getAllForums: () => Promise<Forum[]>;
  getForumById: (id: string) => Promise<Forum>;
  getForumPosts: (forumId: string, params?: any) => Promise<Post[]>;
  createPost: (forumId: string, postData: any) => Promise<Post>;
  getPostById: (id: string) => Promise<Post>;
  getPostComments: (postId: string, params?: any) => Promise<Comment[]>;
  addComment: (postId: string, commentData: any) => Promise<Comment>;
  votePost: (postId: string, voteType: 'up' | 'down') => Promise<Post>;
}

// Export the useForum hook
export const useForum: () => ForumContextValue;
