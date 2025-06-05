// Type definitions for ToolContext
import { Tool } from '../types';

export interface ToolContextState {
  tools: Tool[];
  currentTool: Tool | null;
  toolData: any[];
  loading: boolean;
  error: string | null;
}

export interface ToolContextValue extends ToolContextState {
  getAllTools: (params?: any) => Promise<Tool[]>;
  getToolById: (id: string) => Promise<Tool>;
  getToolBySlug: (slug: string) => Promise<Tool>;
  getToolData: (toolId: string, params?: any) => Promise<any[]>;
  saveToolData: (toolId: string, data: any) => Promise<any>;
  updateToolData: (dataId: string, data: any) => Promise<any>;
  deleteToolData: (dataId: string) => Promise<boolean>;
}

declare const ToolContext: React.Context<ToolContextValue>;

export const useTool: () => ToolContextValue;
export const ToolProvider: React.FC<{children: React.ReactNode}>;

export default ToolContext;
