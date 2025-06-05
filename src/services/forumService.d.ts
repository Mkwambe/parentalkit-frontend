// Type definitions for forumService
import { Forum, Post, Comment } from '../types';

declare module '../services/forumService' {
  export function getAllForums(): Promise<Forum[]>;
  export function getForumById(id: string): Promise<Forum>;
  export function getForumPosts(forumId: string, params?: any): Promise<Post[]>;
  export function createPost(forumId: string, postData: any): Promise<Post>;
  export function getPostById(id: string): Promise<Post>;
  export function getPostComments(postId: string, params?: any): Promise<Comment[]>;
  export function addComment(postId: string, commentData: any): Promise<Comment>;
  export function votePost(postId: string, voteType: 'up' | 'down'): Promise<Post>;

  const forumService: {
    getAllForums: typeof getAllForums;
    getForumById: typeof getForumById;
    getForumPosts: typeof getForumPosts;
    createPost: typeof createPost;
    getPostById: typeof getPostById;
    getPostComments: typeof getPostComments;
    addComment: typeof addComment;
    votePost: typeof votePost;
  };

  export default forumService;
}
