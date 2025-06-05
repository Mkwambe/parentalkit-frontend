import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForumContextValue } from '../contexts/ForumContext.d';
import { formatDistanceToNow } from 'date-fns'; // For relative time
import { Forum, Post } from '../types';

// Import directly from the JS file with explicit path
import { useForum } from '../contexts/ForumContext.js';

const Community = () => {
  const { getAllForums, getForumPosts, forums, loading: forumLoading, error: forumError } = useForum() as ForumContextValue;
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [postError, setPostError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        await getAllForums();
      } catch (err) {
        console.error('Error fetching forums:', err);
      }
    };
    fetchForums();
  }, [getAllForums]);

  useEffect(() => {
    // Fetch recent posts - Placeholder: fetch from the first forum or a general endpoint
    // Ideally, backend should have a dedicated endpoint like /posts/recent?limit=5
    const fetchRecentPosts = async () => {
      setLoadingPosts(true);
      setPostError(null);
      try {
        // Placeholder: Using the first forum ID if available
        // Or ideally use a dedicated endpoint if backend supports it
        // const recentData = await forumService.getRecentPosts({ limit: 5 }); 
        // setRecentPosts(recentData);
        
        // Using getForumPosts as a temporary measure if forums exist
        if (forums && forums.length > 0) {
          // Fetching posts from the first forum as an example
          const postsData = await getForumPosts(forums[0]._id, { limit: 5, sort: '-createdAt' }); 
          setRecentPosts(postsData || []);
        } else {
          // If no forums, maybe fetch globally recent posts if endpoint exists
          // For now, just set empty
           setRecentPosts([]);
        }
      } catch (err: any) {
        console.error('Error fetching recent posts:', err);
        setPostError(err.message || 'Failed to fetch recent discussions.');
        setRecentPosts([]); // Clear posts on error
      } finally {
        setLoadingPosts(false);
      }
    };

    // Fetch posts only after forums are loaded (or decide on a global endpoint)
    if (!forumLoading && forums) { 
      fetchRecentPosts();
    }

  }, [forums, forumLoading, getForumPosts]); // Depend on forums being loaded

  const renderForumCard = (forum: Forum) => (
    <div key={forum._id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {/* Placeholder icon - replace with dynamic icon if available */} 
        <div className="text-4xl mb-4 text-center">{forum.icon || '💬'}</div> 
        <h3 className="text-xl font-semibold mb-2 text-center">{forum.name}</h3>
        <p className="text-gray-600 mb-4 text-center">{forum.description}</p>
        {/* Placeholder categories - replace with dynamic if available */}
        {/* <div className="flex flex-wrap gap-2 justify-center">
          {forum.categories?.map((category, catIndex) => (
            <span key={catIndex} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {category}
            </span>
          ))}
        </div> */} 
      </div>
      <div className="bg-gray-50 px-6 py-3">
        <Link to={`/forums/${forum._id}`} className="text-purple-600 hover:text-purple-800 font-medium flex justify-center items-center">
          Explore Group
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );

  const renderPostItem = (post: Post) => (
    <div key={post._id} className="p-6 hover:bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-purple-700 hover:text-purple-900">
          <Link to={`/forums/${post.forum}/posts/${post._id}`}>{post.title}</Link>
        </h3>
        {/* Display forum name if available */} 
        {post.forum && forums.find((f: Forum) => f._id === post.forum) && (
           <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
             {forums.find((f: Forum) => f._id === post.forum)?.name || 'General'}
           </span>
        )}
      </div>
      {/* Use post.content snippet or generate one */} 
      <p className="text-gray-600 mb-3 line-clamp-2">{post.content.substring(0, 150)}...</p> 
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
            {/* Placeholder for author avatar/initial */} 
            <span className="text-indigo-600 font-bold">
              {typeof post.author === 'object' && post.author?.username?.charAt(0) || 'U'}
            </span> 
          </div>
          <span className="text-gray-700">
            {typeof post.author === 'object' && post.author?.username || 'Anonymous'}
          </span>
        </div>
        <div className="flex items-center text-gray-500">
          <span className="mr-4">{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            {post.commentsCount || 0} 
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Join Our Parenting Community
              </h1>
              <p className="text-xl mb-6">
                Connect with parents who understand your journey. Share experiences, ask questions, and find support at every stage of parenthood.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-6 rounded-full text-center transition duration-300">
                  Join Community
                </Link>
                <Link to="/login" className="bg-transparent hover:bg-white hover:text-purple-600 text-white font-semibold py-3 px-6 border border-white rounded-full text-center transition duration-300">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                alt="Parents and children in community" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats - Keep static for now or fetch dynamically if API exists */} 
      <section className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center">
            <div className="w-full md:w-1/4 p-4">
              <div className="text-3xl font-bold text-purple-600">250K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="w-full md:w-1/4 p-4">
              <div className="text-3xl font-bold text-purple-600">{forums?.length || '500+'}</div>
              <div className="text-gray-600">Discussion Groups</div>
            </div>
            <div className="w-full md:w-1/4 p-4">
              <div className="text-3xl font-bold text-purple-600">10K+</div>
              <div className="text-gray-600">Daily Conversations</div>
            </div>
            <div className="w-full md:w-1/4 p-4">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Moderated Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Groups */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Groups</h2>
          {forumLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : forumError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
              <p>Error loading groups: {forumError}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forums && forums.length > 0 ? (
                forums.slice(0, 6).map((forum: Forum) => renderForumCard(forum)) // Display first 6 forums
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No groups available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Discussions</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loadingPosts ? (
              <div className="flex justify-center items-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : postError ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-6 text-center">
                <p>Error loading discussions: {postError}</p>
              </div>
            ) : (
              <div className="divide-y">
                {recentPosts && recentPosts.length > 0 ? (
                  recentPosts.map((post: Post) => renderPostItem(post))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>No recent discussions found.</p>
                  </div>
                )}
              </div>
            )}
            <div className="bg-gray-50 px-6 py-3 text-center">
              {/* Link to a page showing all posts or forums */} 
              <Link to="/forums" className="text-purple-600 hover:text-purple-800 font-medium">
                View All Discussions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines - Static */} 
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Community Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Supportive</h3>
                <p className="text-gray-600">
                  We foster a supportive environment where parents can share challenges and celebrate victories without judgment.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Respectful</h3>
                <p className="text-gray-600">
                  We respect diverse parenting styles and perspectives, engaging in constructive conversations even when we disagree.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Trustworthy</h3>
                <p className="text-gray-600">
                  We prioritize accurate information and clearly distinguish between personal experiences and professional advice.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/register" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
