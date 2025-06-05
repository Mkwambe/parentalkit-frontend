import { api } from './authService';

// Forum service for managing forums, posts, and comments
const forumService = {
  // Get all forums
  getAllForums: async () => {
    try {
      const response = await api.get('/forums');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get forum by ID
  getForumById: async (id) => {
    try {
      const response = await api.get(`/forums/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get posts for a forum
  getForumPosts: async (forumId, params = {}) => {
    try {
      const response = await api.get(`/forums/${forumId}/posts`, { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a forum (admin only)
  createForum: async (forumData) => {
    try {
      const response = await api.post('/forums', forumData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a forum (admin only)
  updateForum: async (id, forumData) => {
    try {
      const response = await api.put(`/forums/${id}`, forumData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a post in a forum
  createPost: async (forumId, postData) => {
    try {
      const response = await api.post(`/forums/${forumId}/posts`, postData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get post by ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get comments for a post
  getPostComments: async (postId, params = {}) => {
    try {
      const response = await api.get(`/posts/${postId}/comments`, { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a post
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a post
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Add a comment to a post
  addComment: async (postId, commentData) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Vote on a post (upvote or downvote)
  votePost: async (postId, voteType) => {
    try {
      const response = await api.put(`/posts/${postId}/vote`, { voteType });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default forumService;
