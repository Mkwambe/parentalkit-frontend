// Type definitions for NotificationContext
import { User } from '../types';

export interface Notification {
  _id: string;
  user: string | User;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationContextState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

export interface NotificationContextValue extends NotificationContextState {
  getNotifications: () => Promise<Notification[]>;
  markAsRead: (id: string) => Promise<Notification>;
  markAllAsRead: () => Promise<boolean>;
  deleteNotification: (id: string) => Promise<boolean>;
}

declare const NotificationContext: React.Context<NotificationContextValue>;

export const useNotification: () => NotificationContextValue;
export const NotificationProvider: React.FC<{children: React.ReactNode}>;

export default NotificationContext;
