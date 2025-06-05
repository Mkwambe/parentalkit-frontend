import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Link } from 'react-router-dom';
import { User, Notification } from '../types';

// Extended User type to match the actual data model
interface ExtendedUser extends User {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  location: string;
}

const Profile = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const { notifications, getNotifications, markAsRead, loading: notificationLoading } = useNotification();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    location: ''
  });
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>('');
  
  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      const extendedUser = user as ExtendedUser;
      setProfileData({
        firstName: extendedUser.firstName || '',
        lastName: extendedUser.lastName || '',
        email: extendedUser.email || '',
        bio: extendedUser.bio || '',
        location: extendedUser.location || ''
      });
    }
  }, [user]);
  
  // Load notifications when component mounts
  useEffect(() => {
    if (user) {
      getNotifications();
    }
  }, [user, getNotifications]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
    
    // Clear success/error messages when user types
    if (updateSuccess) setUpdateSuccess(false);
    if (updateError) setUpdateError('');
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await updateProfile(profileData);
      setUpdateSuccess(true);
      setIsEditing(false);
    } catch (error: any) {
      setUpdateError(error.message || 'Failed to update profile');
    }
  };
  
  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
            
            {updateSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">Profile updated successfully!</span>
              </div>
            )}
            
            {updateError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{updateError}</span>
              </div>
            )}
            
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={profileData.email}
                      disabled
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      id="bio"
                      rows={3}
                      value={profileData.bio}
                      onChange={handleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={profileData.location}
                      onChange={handleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{profileData.firstName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{profileData.lastName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm text-gray-900">{profileData.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 text-sm text-gray-900">{profileData.location || 'Not specified'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="mt-1 text-sm text-gray-900">{profileData.bio || 'No bio provided'}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Children Section */}
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Children</h2>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Child
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-500 text-center py-4">No children added yet. Add your children to get personalized content and tools.</p>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Notifications */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
            
            {notificationLoading ? (
              <div className="flex justify-center items-center h-24">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : notifications && notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {notifications.slice(0, 5).map((notification: Notification) => (
                  <li key={notification._id} className="py-4">
                    <div 
                      className={`flex items-start ${!notification.read ? 'bg-blue-50 -mx-2 px-2 py-1 rounded' : ''}`}
                      onClick={() => handleNotificationClick(notification._id)}
                    >
                      <div className="flex-shrink-0">
                        {!notification.read && (
                          <span className="inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.type}</p>
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            )}
            
            {notifications && notifications.length > 5 && (
              <div className="mt-4 text-center">
                <Link to="/notifications" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  View all notifications
                </Link>
              </div>
            )}
          </div>
          
          {/* Quick Links */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/tools" className="text-indigo-600 hover:text-indigo-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Parenting Tools
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-indigo-600 hover:text-indigo-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  Community Forums
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-indigo-600 hover:text-indigo-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Resources Library
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
