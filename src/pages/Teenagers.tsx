import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { ContentItem } from '../types';

const Teenagers = () => {
  const { getContentByAgeGroup, ageGroupContent, loading, error } = useContent();
  const [localContent, setLocalContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        await getContentByAgeGroup('teenagers');
      } catch (err) {
        console.error('Error fetching teenagers content:', err);
      }
    };

    fetchContent();
  }, [getContentByAgeGroup]);

  useEffect(() => {
    if (ageGroupContent && ageGroupContent.teenagers) {
      setLocalContent(ageGroupContent.teenagers.contents || []);
    }
  }, [ageGroupContent]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Parenting Teenagers
              </h1>
              <p className="text-xl mb-6">
                Guidance and support for navigating the complex teenage years with understanding and confidence.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Teenagers" 
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
            <a href="#development" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Development</a>
            <a href="#communication" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Communication</a>
            <a href="#education" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Education</a>
            <a href="#mental-health" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Mental Health</a>
            <a href="#independence" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Independence</a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Column */}
            <div className="lg:w-2/3">
              {/* Development Section */}
              <div id="development" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Teen Development</h2>
                
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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
                          item.categories.includes('development'))
                        .slice(0, 4)
                        .map((item: ContentItem) => (
                          <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-gray-700 mb-4">
                              {item.summary}
                            </p>
                            <Link to={`/content/${item._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                              Read more →
                            </Link>
                          </div>
                        ))
                    ) : (
                      <>
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Brain Development</h3>
                          <p className="text-gray-700 mb-4">
                            Understanding the teenage brain and how it affects behavior, decision-making, and emotions.
                          </p>
                          <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Learn more →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Identity Formation</h3>
                          <p className="text-gray-700 mb-4">
                            How to support your teen as they explore and develop their personal identity and values.
                          </p>
                          <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Read more →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Physical Changes</h3>
                          <p className="text-gray-700 mb-4">
                            Navigating puberty, growth spurts, and other physical developments during the teenage years.
                          </p>
                          <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Explore guide →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Social Development</h3>
                          <p className="text-gray-700 mb-4">
                            Understanding peer relationships, social pressures, and developing healthy social skills.
                          </p>
                          <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Get started →
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Communication Section */}
              <div id="communication" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Effective Communication</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-3">Building Open Dialogue</h3>
                      <ul className="space-y-2 text-gray-700 mb-4">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Creating a judgment-free environment</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Active listening techniques</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Navigating difficult conversations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Setting boundaries while maintaining respect</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Digital communication and social media</span>
                        </li>
                      </ul>
                      <Link to="/content" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Explore communication resources →
                      </Link>
                    </div>
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Parent and teen talking" 
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Education Section */}
              <div id="education" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Education & Future Planning</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Teen studying" 
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-3">Academic & Career Support</h3>
                      <ul className="space-y-2 text-gray-700 mb-4">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Supporting academic success</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>College preparation and applications</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Career exploration and planning</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Balancing extracurriculars and academics</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>Financial literacy and planning</span>
                        </li>
                      </ul>
                      <Link to="/content" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Explore education resources →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Mental Health Section */}
              <div id="mental-health" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Mental Health & Wellbeing</h2>
                <p className="text-gray-700 mb-4">
                  Supporting your teenager's emotional and mental health during these formative years.
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="bg-indigo-50 p-3 rounded">
                    <h3 className="font-semibold">Recognizing Warning Signs</h3>
                    <p className="text-sm text-gray-700">How to identify anxiety, depression, and other concerns</p>
                  </li>
                  <li className="bg-indigo-50 p-3 rounded">
                    <h3 className="font-semibold">Stress Management</h3>
                    <p className="text-sm text-gray-700">Techniques to help teens cope with academic and social pressures</p>
                  </li>
                  <li className="bg-indigo-50 p-3 rounded">
                    <h3 className="font-semibold">Building Resilience</h3>
                    <p className="text-sm text-gray-700">Fostering emotional strength and healthy coping mechanisms</p>
                  </li>
                  <li className="bg-indigo-50 p-3 rounded">
                    <h3 className="font-semibold">When to Seek Help</h3>
                    <p className="text-sm text-gray-700">Resources and guidance for professional support</p>
                  </li>
                </ul>
                <Link to="/content" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  View all mental health resources →
                </Link>
              </div>
              
              {/* Independence Section */}
              <div id="independence" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Fostering Independence</h2>
                <p className="text-gray-700 mb-4">
                  Helping your teenager develop the skills and confidence for increasing autonomy.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center p-2 bg-indigo-50 rounded">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Life Skills</span>
                    <span>Essential practical skills for independence</span>
                  </div>
                  <div className="flex items-center p-2 bg-indigo-50 rounded">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Decision Making</span>
                    <span>Supporting good judgment and choices</span>
                  </div>
                  <div className="flex items-center p-2 bg-indigo-50 rounded">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Responsibility</span>
                    <span>Building accountability and self-management</span>
                  </div>
                  <div className="flex items-center p-2 bg-indigo-50 rounded">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Safety</span>
                    <span>Navigating risks and staying safe</span>
                  </div>
                </div>
                <Link to="/tools" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Explore independence resources →
                </Link>
              </div>
              
              {/* Community Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Connect with Parents</h2>
                <p className="text-gray-700 mb-4">
                  Join our community of parents with teenagers to share experiences and advice.
                </p>
                <Link to="/community" className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded text-center transition">
                  Join Teen Parents Group
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teenagers;
