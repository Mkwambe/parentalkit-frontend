import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { ContentItem } from '../types';

const Preschoolers = () => {
  const { getContentByAgeGroup, ageGroupContent, loading, error } = useContent();
  const [localContent, setLocalContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        await getContentByAgeGroup('preschoolers');
      } catch (err) {
        console.error('Error fetching preschoolers content:', err);
      }
    };

    fetchContent();
  }, [getContentByAgeGroup]);

  useEffect(() => {
    if (ageGroupContent && ageGroupContent.preschoolers) {
      setLocalContent(ageGroupContent.preschoolers.contents || []);
    }
  }, [ageGroupContent]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Preschooler Development
              </h1>
              <p className="text-xl mb-6">
                Resources and guidance for nurturing your child's growth during the formative preschool years.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Preschooler playing" 
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
            <a href="#development" className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition">Development</a>
            <a href="#education" className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition">Education</a>
            <a href="#behavior" className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition">Behavior</a>
            <a href="#activities" className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition">Activities</a>
            <a href="#health" className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition">Health & Nutrition</a>
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
                <h2 className="text-3xl font-bold mb-6">Preschooler Development</h2>
                
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
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
                            <Link to={`/content/${item._id}`} className="text-teal-600 hover:text-teal-800 font-medium">
                              Read more →
                            </Link>
                          </div>
                        ))
                    ) : (
                      <>
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Cognitive Development</h3>
                          <p className="text-gray-700 mb-4">
                            Understanding how preschoolers think, learn, and solve problems during this critical period.
                          </p>
                          <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">
                            Learn more →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Social-Emotional Growth</h3>
                          <p className="text-gray-700 mb-4">
                            How to support your child's emotional intelligence and social skills development.
                          </p>
                          <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">
                            Read more →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Language Milestones</h3>
                          <p className="text-gray-700 mb-4">
                            What to expect in your preschooler's language development and how to encourage growth.
                          </p>
                          <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">
                            Explore guide →
                          </a>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-3">Motor Skills Development</h3>
                          <p className="text-gray-700 mb-4">
                            Activities and guidance to help refine both fine and gross motor skills.
                          </p>
                          <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">
                            Get started →
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Education Section */}
              <div id="education" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Early Education</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-3">Educational Foundations</h3>
                      <ul className="space-y-2 text-gray-700 mb-4">
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Preschool readiness and preparation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Early literacy and numeracy skills</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Learning through play approaches</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Educational activities for home</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Choosing the right preschool</span>
                        </li>
                      </ul>
                      <Link to="/content" className="text-teal-600 hover:text-teal-800 font-medium">
                        Explore education resources →
                      </Link>
                    </div>
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80" 
                        alt="Preschooler learning" 
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Behavior Section */}
              <div id="behavior" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Behavior & Discipline</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1516627145497-ae6968895b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2040&q=80" 
                        alt="Parent and child talking" 
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-3">Positive Discipline Approaches</h3>
                      <ul className="space-y-2 text-gray-700 mb-4">
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Understanding common preschooler behaviors</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Setting appropriate boundaries</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Effective communication strategies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Managing tantrums and emotional outbursts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span>Encouraging positive behaviors</span>
                        </li>
                      </ul>
                      <Link to="/content" className="text-teal-600 hover:text-teal-800 font-medium">
                        Explore behavior resources →
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
                <h2 className="text-2xl font-bold mb-4">Fun Activities</h2>
                <p className="text-gray-700 mb-4">
                  Age-appropriate activities to engage your preschooler while supporting their development.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center p-2 bg-teal-50 rounded">
                    <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Arts & Crafts</span>
                    <span>Creative projects for little hands</span>
                  </div>
                  <div className="flex items-center p-2 bg-teal-50 rounded">
                    <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Science</span>
                    <span>Simple experiments to spark curiosity</span>
                  </div>
                  <div className="flex items-center p-2 bg-teal-50 rounded">
                    <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Outdoor</span>
                    <span>Nature exploration and physical play</span>
                  </div>
                  <div className="flex items-center p-2 bg-teal-50 rounded">
                    <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Pretend Play</span>
                    <span>Imagination-building scenarios</span>
                  </div>
                </div>
                <Link to="/tools" className="text-teal-600 hover:text-teal-800 font-medium">
                  Explore activity ideas →
                </Link>
              </div>
              
              {/* Health & Nutrition Section */}
              <div id="health" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Health & Nutrition</h2>
                <ul className="space-y-3 mb-4">
                  <li className="bg-teal-50 p-3 rounded">
                    <h3 className="font-semibold">Balanced Nutrition</h3>
                    <p className="text-sm text-gray-700">Meal planning and dealing with picky eaters</p>
                  </li>
                  <li className="bg-teal-50 p-3 rounded">
                    <h3 className="font-semibold">Sleep Routines</h3>
                    <p className="text-sm text-gray-700">Establishing healthy sleep habits for preschoolers</p>
                  </li>
                  <li className="bg-teal-50 p-3 rounded">
                    <h3 className="font-semibold">Physical Activity</h3>
                    <p className="text-sm text-gray-700">Ensuring adequate exercise and outdoor time</p>
                  </li>
                  <li className="bg-teal-50 p-3 rounded">
                    <h3 className="font-semibold">Common Health Concerns</h3>
                    <p className="text-sm text-gray-700">Managing illnesses and when to see a doctor</p>
                  </li>
                </ul>
                <Link to="/content" className="text-teal-600 hover:text-teal-800 font-medium">
                  View all health resources →
                </Link>
              </div>
              
              {/* Community Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Connect with Parents</h2>
                <p className="text-gray-700 mb-4">
                  Join our community of parents with preschoolers to share experiences and advice.
                </p>
                <Link to="/community" className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded text-center transition">
                  Join Preschool Parents Group
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Preschoolers;
