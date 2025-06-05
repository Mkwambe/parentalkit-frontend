import React, { createContext, useContext, useState } from 'react';
import toolService from '../services/toolService';
import { Tool, ToolData } from '../types';

// Create tool context
interface ToolContextState {
  tools: Tool[];
  currentTool: Tool | null;
  toolData: ToolData[];
  loading: boolean;
  error: string | null;
}

interface ToolContextValue extends ToolContextState {
  getAllTools: () => Promise<Tool[]>;
  getToolById: (id: string) => Promise<Tool>;
  getToolsByCategory: (category: string) => Promise<Tool[]>;
  getToolsByAgeGroup: (ageGroup: string) => Promise<Tool[]>;
  getToolData: (toolId: string) => Promise<ToolData[]>;
  saveToolData: (toolId: string, data: any) => Promise<ToolData>;
}

const ToolContext = createContext<ToolContextValue | null>(null);

// Tool provider component
export const ToolProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [toolState, setToolState] = useState<ToolContextState>({
    tools: [],
    currentTool: null,
    toolData: [],
    loading: false,
    error: null
  });

  // Get all tools
  const getAllTools = async () => {
    setToolState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await toolService.getAllTools();
      setToolState(prev => ({ 
        ...prev, 
        tools: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setToolState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch tools',
        loading: false 
      }));
      throw err;
    }
  };

  // Get tool by ID
  const getToolById = async (id: string) => {
    setToolState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await toolService.getToolById(id);
      setToolState(prev => ({ 
        ...prev, 
        currentTool: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setToolState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch tool',
        loading: false 
      }));
      throw err;
    }
  };

  // Get tools by category
  const getToolsByCategory = async (category: string) => {
    setToolState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await toolService.getToolsByCategory(category);
      setToolState(prev => ({ 
        ...prev, 
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setToolState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch tools by category',
        loading: false 
      }));
      throw err;
    }
  };

  // Get tools by age group
  const getToolsByAgeGroup = async (ageGroup: string) => {
    setToolState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await toolService.getToolsByAgeGroup(ageGroup);
      setToolState(prev => ({ 
        ...prev, 
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setToolState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch tools by age group',
        loading: false 
      }));
      throw err;
    }
  };

  // Get tool data
  const getToolData = async (toolId: string) => {
    setToolState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await toolService.getToolData(toolId);
      setToolState(prev => ({ 
        ...prev, 
        toolData: data,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setToolState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch tool data',
        loading: false 
      }));
      throw err;
    }
  };

  // Save tool data
  const saveToolData = async (toolId: string, data: any) => {
    setToolState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await toolService.saveToolData(toolId, data);
      setToolState(prev => ({ 
        ...prev, 
        toolData: [...prev.toolData, result],
        loading: false 
      }));
      return result;
    } catch (err: any) {
      setToolState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to save tool data',
        loading: false 
      }));
      throw err;
    }
  };

  // Context value
  const value: ToolContextValue = {
    ...toolState,
    getAllTools,
    getToolById,
    getToolsByCategory,
    getToolsByAgeGroup,
    getToolData,
    saveToolData
  };

  return <ToolContext.Provider value={value}>{children}</ToolContext.Provider>;
};

// Custom hook to use tool context
export const useTool = (): ToolContextValue => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useTool must be used within a ToolProvider');
  }
  return context;
};

export default ToolContext;
