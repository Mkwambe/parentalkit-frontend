import 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Complete Parenting Journey Partner
              </h1>
              <p className="text-xl mb-6">
                Expert guidance, supportive community, and practical tools for every stage of parenthood.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full text-center transition duration-300">
                  Join Free
                </Link>
                <Link to="/tools" className="bg-transparent hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-6 border border-white rounded-full text-center transition duration-300">
                  Explore Tools
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Happy family" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Age Stages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Resources for Every Stage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Expecting", icon: "👶", path: "/expecting", description: "Prepare for your new arrival with expert advice and planning tools." },
              { title: "Infants & Toddlers", icon: "🍼", path: "/infants", description: "Navigate the early years with confidence and joy." },
              { title: "Preschoolers", icon: "🧩", path: "/preschoolers", description: "Support crucial development during these formative years." },
              { title: "School Age", icon: "📚", path: "/school-age", description: "Guide your child through education and social growth." },
              { title: "Teenagers", icon: "🎓", path: "/teenagers", description: "Build strong relationships during these transformative years." }
            ].map((stage, index) => (
              <Link to={stage.path} key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{stage.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{stage.title}</h3>
                <p className="text-gray-600">{stage.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How ParentalKit Helps You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert-Backed Content</h3>
              <p className="text-gray-700">
                Access comprehensive, trustworthy information on child behavior, education, health, and growth across all developmental stages.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Supportive Community</h3>
              <p className="text-gray-700">
                Connect with other parents, share experiences, ask questions, and offer mutual support in a safe, moderated environment.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Practical Tools</h3>
              <p className="text-gray-700">
                Utilize digital tools for tracking milestones, managing schedules, comparing educational options, and planning finances related to parenting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Preview Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Join Our Thriving Community</h2>
              <p className="text-lg mb-6">
                Connect with thousands of parents sharing similar experiences. Ask questions, share advice, and find support from those who understand exactly what you're going through.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Birth Clubs</span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Local Groups</span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Special Needs</span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Single Parents</span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Working Parents</span>
              </div>
              <Link to="/community" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                Explore Community
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">JM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jessica M.</h4>
                    <p className="text-sm text-gray-500">Mother of 2 • Preschoolers Group</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The sleep training advice I received from this community changed our lives! After months of sleepless nights, we finally have a routine that works for everyone. So grateful for the support."
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">2 days ago</span>
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                    </svg>
                    24
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                    </svg>
                    18
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Helpful Tools for Parents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-500 text-white p-4">
                <h3 className="text-xl font-semibold">Development Milestone Tracker</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Track your child's physical, cognitive, and social development milestones and get personalized insights.
                </p>
                <Link to="/tools" className="text-blue-600 hover:text-blue-800 font-medium">
                  Try this tool →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-500 text-white p-4">
                <h3 className="text-xl font-semibold">School Comparison Tool</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Compare schools in your area based on curriculum, extracurricular activities, and parent reviews.
                </p>
                <Link to="/tools" className="text-green-600 hover:text-green-800 font-medium">
                  Try this tool →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-purple-500 text-white p-4">
                <h3 className="text-xl font-semibold">Family Budget Planner</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Plan your family finances, from childcare costs to college savings, with our interactive calculator.
                </p>
                <Link to="/tools" className="text-purple-600 hover:text-purple-800 font-medium">
                  Try this tool →
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link to="/tools" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full transition duration-300">
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Parents Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael T.",
                role: "Father of 3",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                quote: "ParentalKit has been my go-to resource since my first child was born. The age-specific content grows with your family!"
              },
              {
                name: "Sarah L.",
                role: "Mother of twins",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                quote: "The community here understands the unique challenges of raising multiples. I've found advice I couldn't get anywhere else."
              },
              {
                name: "David K.",
                role: "New parent",
                image: "https://randomuser.me/api/portraits/men/67.jpg",
                quote: "As a first-time dad, the tools and resources here have given me confidence. The milestone tracker is particularly helpful!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Parenting Community?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get access to expert advice, supportive community, and practical tools for every stage of your parenting journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-center transition duration-300">
              Join Free Today
            </Link>
            <Link to="/login" className="bg-transparent hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-8 border border-white rounded-full text-center transition duration-300">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
