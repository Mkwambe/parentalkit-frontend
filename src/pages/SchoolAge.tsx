import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { ContentItem } from '../types';

const SchoolAge = () => {
  const { getContentByAgeGroup, ageGroupContent, loading, error } = useContent();
  const [localContent, setLocalContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        await getContentByAgeGroup('school-age');
      } catch (err) {
        console.error('Error fetching school-age content:', err);
      }
    };

    fetchContent();
  }, [getContentByAgeGroup]);

  useEffect(() => {
    if (ageGroupContent && ageGroupContent['school-age']) {
      setLocalContent(ageGroupContent['school-age'].contents || []);
    }
  }, [ageGroupContent]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                School-Age Children
              </h1>
              <p className="text-xl mb-6">
                Support and guidance for navigating the elementary school years with confidence.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80" 
                alt="School-age children" 
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
            <a href="#education" className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition">Education</a>
            <a href="#social" className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition">Social Development</a>
            <a href="#activities" className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition">Activities</a>
            <a href="#health" className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition">Health & Wellness</a>
            <a href="#parenting" className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition">Parenting Tips</a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Column */}
            <div className="lg:w-2/3">
              {/* Education Section */}
              <div id="education" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Education Support</h2>
                
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
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
                          item.categories.includes('education'))
                        .slice(0, 4)
                        .map((item: ContentItem) => (
                          <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-gray-700 mb-4">
                              {item.summary}
                            </p>
                            <Link to={`/content/${item._id}`} className="text-amber-600 hover:text-amber-800 font-medium">
                              Read more →
                            </Link>
                          </div>
                        ))
                    ) : (
                      <>
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Homework Strategies</h3>
                          <p className="text-gray-700 mb-4">
                            Effective approaches to help your child develop good homework habits and study skills.
                          </p>
                          <a href="#" className="text-amber-600 hover:text-amber-800 font-medium">
                            Learn more →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Reading Development</h3>
                          <p className="text-gray-700 mb-4">
                            Tips and resources to support literacy skills and foster a love of reading.
                          </p>
                          <a href="#" className="text-amber-600 hover:text-amber-800 font-medium">
                            Read more →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">School Communication</h3>
                          <p className="text-gray-700 mb-4">
                            How to effectively partner with teachers and school staff for your child's success.
                          </p>
                          <a href="#" className="text-amber-600 hover:text-amber-800 font-medium">
                            Explore guide →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Learning Challenges</h3>
                          <p className="text-gray-700 mb-4">
                            Recognizing and supporting children with different learning styles and needs.
                          </p>
                          <a href="#" className="text-amber-600 hover:text-amber-800 font-medium">
                            Get started →
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Social Development Section */}
              <div id="social" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Social Development</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-3">Building Social Skills</h3>
                      <ul className="space-y-2 text-gray-700 mb-4">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Friendship development and maintenance</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Conflict resolution strategies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Bullying prevention and response</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Emotional intelligence development</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Building confidence and resilience</span>
                        </li>
                      </ul>
                      <Link to="/content" className="text-amber-600 hover:text-amber-800 font-medium">
                        Explore social resources →
                      </Link>
                    </div>
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                        alt="Children playing together" 
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Parenting Tips Section */}
              <div id="parenting" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Parenting Tips</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80" 
                        alt="Parent and child talking" 
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-3">Effective Parenting Strategies</h3>
                      <ul className="space-y-2 text-gray-700 mb-4">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Age-appropriate discipline techniques</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Fostering independence and responsibility</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Effective communication with school-age kids</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Managing screen time and digital safety</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span>Balancing activities and family time</span>
                        </li>
                      </ul>
                      <Link to="/content" className="text-amber-600 hover:text-amber-800 font-medium">
                        Explore parenting resources →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Activities Section */}
              <div id="activities" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Enrichment Activities</h2>
                <p className="text-gray-700 mb-4">
                  Age-appropriate activities to engage your school-age child and support their development.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center p-2 bg-amber-50 rounded">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">STEM</span>
                    <span>Science and math projects for curious minds</span>
                  </div>
                  <div className="flex items-center p-2 bg-amber-50 rounded">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Arts</span>
                    <span>Creative expression and skill development</span>
                  </div>
                  <div className="flex items-center p-2 bg-amber-50 rounded">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Sports</span>
                    <span>Physical activities and team sports</span>
                  </div>
                  <div className="flex items-center p-2 bg-amber-50 rounded">
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Life Skills</span>
                    <span>Cooking, finances, and practical learning</span>
                  </div>
                </div>
                <Link to="/tools" className="text-amber-600 hover:text-amber-800 font-medium">
                  Explore activity ideas →
                </Link>
              </div>
              
              {/* Health & Wellness Section */}
              <div id="health" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Health & Wellness</h2>
                <ul className="space-y-3 mb-4">
                  <li className="bg-amber-50 p-3 rounded">
                    <h3 className="font-semibold">Nutrition for Growth</h3>
                    <p className="text-sm text-gray-700">Balanced meals and healthy eating habits</p>
                  </li>
                  <li className="bg-amber-50 p-3 rounded">
                    <h3 className="font-semibold">Physical Activity</h3>
                    <p className="text-sm text-gray-700">Exercise recommendations and sports safety</p>
                  </li>
                  <li className="bg-amber-50 p-3 rounded">
                    <h3 className="font-semibold">Mental Health</h3>
                    <p className="text-sm text-gray-700">Supporting emotional wellbeing and stress management</p>
                  </li>
                  <li className="bg-amber-50 p-3 rounded">
                    <h3 className="font-semibold">Sleep Habits</h3>
                    <p className="text-sm text-gray-700">Ensuring quality rest for learning and growth</p>
                  </li>
                </ul>
                <Link to="/content" className="text-amber-600 hover:text-amber-800 font-medium">
                  View all health resources →
                </Link>
              </div>
              
              {/* Community Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Connect with Parents</h2>
                <p className="text-gray-700 mb-4">
                  Join our community of parents with school-age children to share experiences and advice.
                </p>
                <Link to="/community" className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded text-center transition">
                  Join School-Age Parents Group
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolAge;
