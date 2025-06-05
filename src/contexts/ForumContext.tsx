import React, { createContext, useContext, useState } from 'react';
import forumService from '../services/forumService';
import { ForumProviderProps, ForumContextValue, ForumState } from './ForumContext.d';
import { Post } from '../types';

// Create forum context
const ForumContext = createContext<ForumContextValue | null>(null);

// Forum provider component
export const ForumProvider: React.FC<ForumProviderProps> = ({ children }) => {
  const [forumState, setForumState] = useState<ForumState>({
    forums: [],
    currentForum: null,
    posts: [],
    currentPost: null,
    comments: [],
    loading: false,
    error: null
  });

  // Get all forums
  const getAllForums = async () => {
    setForumState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await forumService.getAllForums();
      setForumState(prev => ({ 
        ...prev, 
        forums: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setForumState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch forums',
        loading: false 
      }));
      throw err;
    }
  };

  // Get forum by ID
  const getForumById = async (id: string) => {
    setForumState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await forumService.getForumById(id);
      setForumState(prev => ({ 
        ...prev, 
        currentForum: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setForumState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch forum',
        loading: false 
      }));
      throw err;
    }
  };

  // Get posts for a forum
  const getForumPosts = async (forumId: string, params?: any) => {
    setForumState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await forumService.getForumPosts(forumId, params);
      setForumState(prev => ({ 
        ...prev, 
        posts: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setForumState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch posts',
        loading: false 
      }));
      throw err;
    }
  };

  // Create a post
  const createPost = async (forumId: string, postData: any) => {
    setForumState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await forumService.createPost(forumId, postData);
      setForumState(prev => ({ 
        ...prev, 
        posts: [data, ...prev.posts],
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setForumState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to create post',
        loading: false 
      }));
      throw err;
    }
  };

  // Get post by ID
  const getPostById = async (id: string) => {
    setForumState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await forumService.getPostById(id);
      setForumState(prev => ({ 
        ...prev, 
        currentPost: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setForumState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch post',
        loading: false 
      }));
      throw err;
    }
  };

  // Get comments for a post
  const getPostComments = async (postId: string, params?: any) => {
    setForumState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await forumService.getPostComments(postId, params);
      setForumState(prev => ({ 
        ...prev, 
        comments: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setForumState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch comments',
        loading: false 
      }));
      throw err;
    }
  };

  // Add a comment
  const addComment = async (postId: string, commentData: any) => {
    setForumState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await forumService.addComment(postId, commentData);
      setForumState(prev => ({ 
        ...prev, 
        comments: [data, ...prev.comments],
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setForumState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to add comment',
        loading: false 
      }));
      throw err;
    }
  };

  // Vote on a post
  const votePost = async (postId: string, voteType: 'up' | 'down') => {
    try {
      const data = await forumService.votePost(postId, voteType);
      
      // Update current post if it's the one being voted on
      if (forumState.currentPost && forumState.currentPost._id === postId) {
        setForumState(prev => ({ 
          ...prev, 
          currentPost: data
        }));
      }
      
      // Update post in posts list if it exists there
      setForumState(prev => ({ 
        ...prev, 
        posts: prev.posts.map((post: Post) => 
          post._id === postId ? data : post
        )
      }));
      
      return data;
    } catch (err: any) {
      setForumState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to vote on post'
      }));
      throw err;
    }
  };

  // Context value
  const value: ForumContextValue = {
    ...forumState,
    getAllForums,
    getForumById,
    getForumPosts,
    createPost,
    getPostById,
    getPostComments,
    addComment,
    votePost
  };

  return <ForumContext.Provider value={value}>{children}</ForumContext.Provider>;
};

// Custom hook to use forum context
export const useForum = (): ForumContextValue => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
};

export default ForumContext;
