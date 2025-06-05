import 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Parenting Resources
              </h1>
              <p className="text-xl mb-6">
                Expert-backed articles, guides, and educational materials to support your parenting journey.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80" 
                alt="Parent reading with child" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#articles" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Articles & Guides</a>
            <a href="#videos" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Video Resources</a>
            <a href="#ebooks" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">E-Books & Printables</a>
            <a href="#experts" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Expert Advice</a>
            <a href="#courses" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">Online Courses</a>
          </div>
        </div>
      </section>

      {/* Articles & Guides */}
      <section id="articles" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Articles & Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The Complete Guide to Sleep Training",
                category: "Sleep",
                image: "https://images.unsplash.com/photo-1566413369243-26fef8fca6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "Evidence-based approaches to helping your baby develop healthy sleep habits, from newborn to toddler stages."
              },
              {
                title: "Navigating School Transitions",
                category: "Education",
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "How to support your child through major educational transitions, from preschool to kindergarten, elementary to middle school, and beyond."
              },
              {
                title: "Positive Discipline Techniques",
                category: "Behavior",
                image: "https://images.unsplash.com/photo-1516627145497-ae6968895b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "Effective strategies for teaching children responsibility and self-discipline without punitive measures."
              },
              {
                title: "Nutrition Through the Ages",
                category: "Health",
                image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "Age-appropriate nutrition guidelines and meal planning advice from infancy through adolescence."
              },
              {
                title: "Building Emotional Intelligence",
                category: "Development",
                image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "How to help children recognize, understand, and manage their emotions for lifelong social success."
              },
              {
                title: "Technology and Screen Time",
                category: "Modern Parenting",
                image: "https://images.unsplash.com/photo-1492539161849-b2b8f5a32ee5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                excerpt: "Creating healthy digital habits and balancing screen time with other important developmental activities."
              }
            ].map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Read Article →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              Browse All Articles
            </a>
          </div>
        </div>
      </section>

      {/* Video Resources */}
      <section id="videos" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Video Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Infant CPR & First Aid Basics",
                duration: "15:24",
                thumbnail: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                title: "Montessori Activities for Toddlers",
                duration: "22:10",
                thumbnail: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              },
              {
                title: "Talking to Kids About Difficult Topics",
                duration: "18:45",
                thumbnail: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              }
            ].map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{video.title}</h3>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 inline-block">
                    Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              View Video Library
            </a>
          </div>
        </div>
      </section>

      {/* E-Books & Printables */}
      <section id="ebooks" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">E-Books & Printables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "The New Parent Survival Guide",
                type: "E-Book",
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                premium: true
              },
              {
                title: "Weekly Meal Planner",
                type: "Printable",
                image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                premium: false
              },
              {
                title: "Potty Training in 7 Days",
                type: "E-Book",
                image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                premium: true
              },
              {
                title: "Behavior Reward Charts",
                type: "Printable",
                image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                premium: false
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={resource.image} 
                    alt={resource.title} 
                    className="w-full h-40 object-cover"
                  />
                  {resource.premium && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded">
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-gray-500 block mb-1">{resource.type}</span>
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    {resource.premium ? "Unlock with Premium" : "Download Free"}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              Browse All Resources
            </a>
          </div>
        </div>
      </section>

      {/* Expert Advice */}
      <section id="experts" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Expert Advice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                title: "Pediatrician",
                image: "https://randomuser.me/api/portraits/women/76.jpg",
                quote: "Regular well-child visits are crucial even when your child seems healthy. These check-ups allow us to track growth, development, and address concerns before they become serious issues.",
                topics: ["Child Health", "Development", "Nutrition"]
              },
              {
                name: "Michael Torres, Ph.D.",
                title: "Child Psychologist",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                quote: "Children's emotional well-being is just as important as their physical health. Creating a safe space for them to express feelings helps build resilience and emotional intelligence.",
                topics: ["Behavior", "Emotional Health", "Family Dynamics"]
              }
            ].map((expert, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={expert.image} 
                    alt={expert.name} 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{expert.name}</h3>
                    <p className="text-gray-600">{expert.title}</p>
                  </div>
                </div>
                <blockquote className="italic text-gray-700 border-l-4 border-indigo-300 pl-4 mb-4">
                  "{expert.quote}"
                </blockquote>
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.topics.map((topic, topicIndex) => (
                    <span key={topicIndex} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  View Expert Profile
                </a>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4">Ask Our Experts</h3>
            <p className="text-gray-700 mb-4">
              Have a specific parenting question? Submit your question to our panel of experts and receive personalized advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Enter your question here..." 
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Submit Question
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Online Courses */}
      <section id="courses" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Online Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Positive Parenting Essentials",
                instructor: "Emma Wilson, M.Ed.",
                lessons: 12,
                duration: "6 hours",
                level: "Beginner",
                image: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                premium: true
              },
              {
                title: "Understanding Child Development",
                instructor: "Dr. Robert Chen",
                lessons: 8,
                duration: "4 hours",
                level: "Intermediate",
                image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                premium: true
              },
              {
                title: "Navigating the Teen Years",
                instructor: "Lisa Thompson, LMFT",
                lessons: 10,
                duration: "5 hours",
                level: "Advanced",
                image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                premium: true
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-48 object-cover"
                  />
                  {course.premium && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded">
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                      </svg>
                      {course.lessons} Lessons
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                      </svg>
                      {course.level}
                    </span>
                  </div>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    View Course Details
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              Browse All Courses
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with ParentalKit</h2>
            <p className="text-lg text-gray-700 mb-6">
              Subscribe to our newsletter for weekly parenting tips, resources, and exclusive content delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-96"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Unlock Premium Resources</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get unlimited access to all premium articles, e-books, courses, and tools with a ParentalKit Premium membership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-3 px-8 rounded-full text-center transition duration-300">
              Start Free Trial
            </Link>
            <Link to="/login" className="bg-transparent hover:bg-white hover:text-indigo-600 text-white font-semibold py-3 px-8 border border-white rounded-full text-center transition duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
