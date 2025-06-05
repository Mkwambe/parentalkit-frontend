import React, { createContext, useContext, useState, useEffect } from 'react';
import notificationService from '../services/notificationService';
import { Notification } from '../types';

// Create notification context
interface NotificationContextState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

interface NotificationContextValue extends NotificationContextState {
  getNotifications: () => Promise<Notification[]>;
  markAsRead: (id: string) => Promise<Notification>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

// Notification provider component
export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [notificationState, setNotificationState] = useState<NotificationContextState>({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  });

  // Initialize notifications on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getNotifications();
    }
  }, []);

  // Get all notifications for current user
  const getNotifications = async () => {
    setNotificationState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await notificationService.getNotifications();
      const unreadCount = data.filter(notification => !notification.read).length;
      
      setNotificationState(prev => ({ 
        ...prev, 
        notifications: data,
        unreadCount,
        loading: false 
      }));
      return data;
    } catch (err: any) {
      setNotificationState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to fetch notifications',
        loading: false 
      }));
      throw err;
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const data = await notificationService.markAsRead(id);
      
      // Update notification in state
      setNotificationState(prev => {
        const updatedNotifications = prev.notifications.map(notification => 
          notification._id === id ? { ...notification, read: true } : notification
        );
        
        return { 
          ...prev, 
          notifications: updatedNotifications,
          unreadCount: prev.unreadCount > 0 ? prev.unreadCount - 1 : 0
        };
      });
      
      return data;
    } catch (err: any) {
      setNotificationState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to mark notification as read'
      }));
      throw err;
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      
      // Update all notifications in state
      setNotificationState(prev => {
        const updatedNotifications = prev.notifications.map(notification => 
          ({ ...notification, read: true })
        );
        
        return { 
          ...prev, 
          notifications: updatedNotifications,
          unreadCount: 0
        };
      });
    } catch (err: any) {
      setNotificationState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to mark all notifications as read'
      }));
      throw err;
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      
      // Remove notification from state
      setNotificationState(prev => {
        const notification = prev.notifications.find(n => n._id === id);
        const isUnread = notification && !notification.read;
        
        return { 
          ...prev, 
          notifications: prev.notifications.filter(n => n._id !== id),
          unreadCount: isUnread && prev.unreadCount > 0 ? prev.unreadCount - 1 : prev.unreadCount
        };
      });
    } catch (err: any) {
      setNotificationState(prev => ({ 
        ...prev, 
        error: err.message || 'Failed to delete notification'
      }));
      throw err;
    }
  };

  // Context value
  const value: NotificationContextValue = {
    ...notificationState,
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

// Custom hook to use notification context
export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
