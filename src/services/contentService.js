import axios from 'axios';
import { api } from './authService';

// Content service for managing articles, guides, and other content
const contentService = {
  // Get all content with pagination and filters
  getAllContent: async (params = {}) => {
    try {
      const response = await api.get('/content', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get content by ID
  getContentById: async (id) => {
    try {
      const response = await api.get(`/content/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get content by slug
  getContentBySlug: async (slug) => {
    try {
      const response = await api.get(`/content/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get content by age group
  getContentByAgeGroup: async (ageGroup, params = {}) => {
    try {
      const response = await api.get(`/content/age/${ageGroup}`, { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create new content (admin only)
  createContent: async (contentData) => {
    try {
      const response = await api.post('/content', contentData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update content (admin only)
  updateContent: async (id, contentData) => {
    try {
      const response = await api.put(`/content/${id}`, contentData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete content (admin only)
  deleteContent: async (id) => {
    try {
      const response = await api.delete(`/content/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default contentService;
