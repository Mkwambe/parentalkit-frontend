import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { ContentItem } from '../types';

const Infants = () => {
  const { getContentByAgeGroup, ageGroupContent, loading, error } = useContent();
  const [localContent, setLocalContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        await getContentByAgeGroup('infants');
      } catch (err) {
        console.error('Error fetching infants content:', err);
      }
    };

    fetchContent();
  }, [getContentByAgeGroup]);

  useEffect(() => {
    if (ageGroupContent && ageGroupContent.infants) {
      setLocalContent(ageGroupContent.infants.contents || []);
    }
  }, [ageGroupContent]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Infant Care & Development
              </h1>
              <p className="text-xl mb-6">
                Expert guidance, practical tips, and supportive resources for your baby's first year.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Parent with infant" 
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
            <a href="#development" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Development</a>
            <a href="#feeding" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Feeding</a>
            <a href="#sleep" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Sleep</a>
            <a href="#health" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Health & Safety</a>
            <a href="#activities" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Activities</a>
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
                <h2 className="text-3xl font-bold mb-6">Infant Development</h2>
                
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                            <Link to={`/content/${item._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                              Read more →
                            </Link>
                          </div>
                        ))
                    ) : (
                      <>
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Developmental Milestones</h3>
                          <p className="text-gray-700 mb-4">
                            Learn about key physical, cognitive, and social milestones during your baby's first year.
                          </p>
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                            View guide →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Tummy Time Techniques</h3>
                          <p className="text-gray-700 mb-4">
                            Discover effective ways to make tummy time enjoyable while strengthening your baby's muscles.
                          </p>
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                            Read more →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Language Development</h3>
                          <p className="text-gray-700 mb-4">
                            Learn how to support your baby's early language skills through everyday interactions.
                          </p>
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                            Learn more →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Sensory Play Ideas</h3>
                          <p className="text-gray-700 mb-4">
                            Simple activities to stimulate your baby's senses and support cognitive development.
                          </p>
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                            Get started →
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Feeding Section */}
              <div id="feeding" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Infant Feeding</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-3">Feeding Essentials</h3>
                      <ul className="space-y-2 text-gray-700 mb-4">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Breastfeeding support and techniques</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Formula feeding guidelines and tips</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Introducing solid foods (4-6 months)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Managing feeding challenges</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Creating healthy eating habits</span>
                        </li>
                      </ul>
                      <Link to="/content" className="text-blue-600 hover:text-blue-800 font-medium">
                        Explore feeding resources →
                      </Link>
                    </div>
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1590033821368-7f7f469b1561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
                        alt="Parent feeding baby" 
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sleep Section */}
              <div id="sleep" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Infant Sleep</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Sleeping baby" 
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-3">Sleep Fundamentals</h3>
                      <ul className="space-y-2 text-gray-700 mb-4">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Safe sleep practices and guidelines</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Creating effective sleep routines</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Understanding sleep patterns by age</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Managing sleep regressions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Gentle sleep training approaches</span>
                        </li>
                      </ul>
                      <Link to="/content" className="text-blue-600 hover:text-blue-800 font-medium">
                        Explore sleep resources →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Health & Safety Section */}
              <div id="health" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Health & Safety</h2>
                <ul className="space-y-3 mb-4">
                  <li className="bg-blue-50 p-3 rounded">
                    <h3 className="font-semibold">Vaccination Schedule</h3>
                    <p className="text-sm text-gray-700">Recommended immunizations for the first year</p>
                  </li>
                  <li className="bg-blue-50 p-3 rounded">
                    <h3 className="font-semibold">Common Health Concerns</h3>
                    <p className="text-sm text-gray-700">Fevers, colds, diaper rash, and when to call the doctor</p>
                  </li>
                  <li className="bg-blue-50 p-3 rounded">
                    <h3 className="font-semibold">Babyproofing Your Home</h3>
                    <p className="text-sm text-gray-700">Essential safety measures as your baby becomes mobile</p>
                  </li>
                  <li className="bg-blue-50 p-3 rounded">
                    <h3 className="font-semibold">First Aid for Infants</h3>
                    <p className="text-sm text-gray-700">Basic emergency response for parents and caregivers</p>
                  </li>
                </ul>
                <Link to="/content" className="text-blue-600 hover:text-blue-800 font-medium">
                  View all health resources →
                </Link>
              </div>
              
              {/* Activities Section */}
              <div id="activities" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Activities & Play</h2>
                <p className="text-gray-700 mb-4">
                  Age-appropriate activities to support your baby's development and strengthen your bond.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">0-3 months</span>
                    <span>Sensory stimulation activities</span>
                  </div>
                  <div className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">3-6 months</span>
                    <span>Tummy time games and exercises</span>
                  </div>
                  <div className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">6-9 months</span>
                    <span>Object exploration and cause-effect play</span>
                  </div>
                  <div className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">9-12 months</span>
                    <span>Social games and early problem-solving</span>
                  </div>
                </div>
                <Link to="/tools" className="text-blue-600 hover:text-blue-800 font-medium">
                  Explore activity ideas →
                </Link>
              </div>
              
              {/* Community Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Connect with Parents</h2>
                <p className="text-gray-700 mb-4">
                  Join our supportive community of parents with infants to share experiences and advice.
                </p>
                <Link to="/community" className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-center transition">
                  Join Infant Parents Group
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Infants;
