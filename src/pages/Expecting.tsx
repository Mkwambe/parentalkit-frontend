import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { ContentItem } from '../types';

const Expecting = () => {
  const { getContentByAgeGroup, ageGroupContent, loading, error } = useContent();
  const [localContent, setLocalContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        await getContentByAgeGroup('expecting');
      } catch (err) {
        console.error('Error fetching expecting content:', err);
      }
    };

    fetchContent();
  }, [getContentByAgeGroup]);

  useEffect(() => {
    if (ageGroupContent && ageGroupContent.expecting) {
      setLocalContent(ageGroupContent.expecting.contents || []);
    }
  }, [ageGroupContent]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Expecting a Child
              </h1>
              <p className="text-xl mb-6">
                Comprehensive resources, expert advice, and community support for your pregnancy journey.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                alt="Expecting parents" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#resources" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition">Resources</a>
            <a href="#tools" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition">Tools</a>
            <a href="#community" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition">Community</a>
            <a href="#expert-advice" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition">Expert Advice</a>
            <a href="#products" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition">Recommended Products</a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Column */}
            <div className="lg:w-2/3">
              {/* Resources Section */}
              <div id="resources" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Essential Resources</h2>
                
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Error loading content. Please try again later.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {localContent.length > 0 ? (
                      localContent
                        .filter((item: ContentItem) => 
                          (item.type === 'article' || item.type === 'guide'))
                        .slice(0, 4)
                        .map((item: ContentItem) => (
                          <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-gray-700 mb-4">
                              {item.summary}
                            </p>
                            <Link to={`/content/${item._id}`} className="text-purple-600 hover:text-purple-800 font-medium">
                              Read more →
                            </Link>
                          </div>
                        ))
                    ) : (
                      <>
                        {/* Static fallback content */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Pregnancy Week by Week</h3>
                          <p className="text-gray-700 mb-4">
                            Follow your baby's development from conception to birth with detailed weekly guides.
                          </p>
                          <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">
                            View guide →
                          </a>
                        </div>
                        
                        {/* More static content items */}
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Tools Section */}
              <div id="tools" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Helpful Tools</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Tool cards */}
                </div>
              </div>
              
              {/* Expert Advice Section */}
              <div id="expert-advice" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Expert Advice</h2>
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Error loading expert content. Please try again later.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    {localContent.filter((item: ContentItem) => item.type === 'expert').length > 0 ? (
                      localContent
                        .filter((item: ContentItem) => item.type === 'expert')
                        .slice(0, 1)
                        .map((expert: ContentItem) => (
                          <div key={expert._id}>
                            <div className="flex items-center mb-4">
                              <img 
                                src={expert.featuredImage || "https://randomuser.me/api/portraits/women/76.jpg"}
                                alt={expert.title} 
                                className="w-16 h-16 rounded-full mr-4"
                              />
                              <div>
                                <h3 className="text-xl font-semibold">{expert.title}</h3>
                                <p className="text-gray-600">{expert.summary}</p>
                              </div>
                            </div>
                            <div className="italic text-gray-700 border-l-4 border-purple-300 pl-4 mb-4" 
                                dangerouslySetInnerHTML={{ __html: expert.content.substring(0, 200) + '...' }}>
                            </div>
                            <Link to={`/content/${expert._id}`} className="text-purple-600 hover:text-purple-800 font-medium">
                              Read full interview →
                            </Link>
                          </div>
                        ))
                    ) : (
                      <>
                        {/* Static fallback expert content */}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Community Section */}
              <div id="community" className="bg-white rounded-lg shadow-md p-6 mb-6">
                {/* Community content */}
              </div>
              
              {/* Other sidebar sections */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Expecting;
