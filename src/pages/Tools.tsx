import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTool } from '../contexts/ToolContext';
import { Tool, ToolCategory } from '../types';

interface ToolsByCategoryState {
  development: Tool[];
  planning: Tool[];
  education: Tool[];
  financial: Tool[];
  health: Tool[];
}

const Tools = () => {
  const { getAllTools, tools, loading, error } = useTool();
  const [toolsByCategory, setToolsByCategory] = useState<ToolsByCategoryState>({
    development: [],
    planning: [],
    education: [],
    financial: [],
    health: []
  });

  useEffect(() => {
    const fetchTools = async () => {
      try {
        await getAllTools();
      } catch (err) {
        console.error('Error fetching tools:', err);
      }
    };

    fetchTools();
  }, [getAllTools]);

  useEffect(() => {
    if (tools && tools.length > 0) {
      const categorized: ToolsByCategoryState = {
        development: tools.filter((tool: Tool) => tool.category === 'development'),
        planning: tools.filter((tool: Tool) => tool.category === 'planning'),
        education: tools.filter((tool: Tool) => tool.category === 'education'),
        financial: tools.filter((tool: Tool) => tool.category === 'financial'),
        health: tools.filter((tool: Tool) => tool.category === 'health')
      };
      setToolsByCategory(categorized);
    }
  }, [tools]);

  const renderToolCard = (tool: Tool) => (
    <div key={tool._id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`${getCategoryColor(tool.category as ToolCategory)} text-white p-4`}>
        <h3 className="text-xl font-semibold">{tool.name}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">
          {tool.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {tool.ageGroups.join(', ')}
          </span>
          <Link to={`/tools/${tool._id}`} className={`${getCategoryTextColor(tool.category as ToolCategory)} font-medium`}>
            Try Tool →
          </Link>
        </div>
      </div>
    </div>
  );

  const getCategoryColor = (category: ToolCategory): string => {
    switch (category) {
      case 'development': return 'bg-blue-500';
      case 'planning': return 'bg-teal-500';
      case 'education': return 'bg-purple-500';
      case 'financial': return 'bg-green-500';
      case 'health': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getCategoryTextColor = (category: ToolCategory): string => {
    switch (category) {
      case 'development': return 'text-blue-600 hover:text-blue-800';
      case 'planning': return 'text-teal-600 hover:text-teal-800';
      case 'education': return 'text-purple-600 hover:text-purple-800';
      case 'financial': return 'text-green-600 hover:text-green-800';
      case 'health': return 'text-red-600 hover:text-red-800';
      default: return 'text-blue-600 hover:text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Parenting Tools & Resources
              </h1>
              <p className="text-xl mb-6">
                Practical tools to help you navigate every stage of your parenting journey with confidence.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Parent using digital tools" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Categories */}
      <section className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#development" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Development Tracking</a>
            <a href="#planning" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Planning Tools</a>
            <a href="#education" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Education Resources</a>
            <a href="#financial" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Financial Planning</a>
            <a href="#health" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Health & Wellness</a>
          </div>
        </div>
      </section>

      {/* Development Tracking Tools */}
      <section id="development" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Development Tracking Tools</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>Error loading development tools. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsByCategory.development.length > 0 ? (
                toolsByCategory.development.map(tool => renderToolCard(tool))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No development tools available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Planning Tools */}
      <section id="planning" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Planning Tools</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>Error loading planning tools. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsByCategory.planning.length > 0 ? (
                toolsByCategory.planning.map(tool => renderToolCard(tool))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No planning tools available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Education Resources */}
      <section id="education" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Education Resources</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>Error loading education resources. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsByCategory.education.length > 0 ? (
                toolsByCategory.education.map(tool => renderToolCard(tool))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No education resources available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Financial Planning */}
      <section id="financial" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Financial Planning</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>Error loading financial planning tools. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsByCategory.financial.length > 0 ? (
                toolsByCategory.financial.map(tool => renderToolCard(tool))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No financial planning tools available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Health & Wellness */}
      <section id="health" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Health & Wellness</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>Error loading health & wellness tools. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsByCategory.health.length > 0 ? (
                toolsByCategory.health.map(tool => renderToolCard(tool))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No health & wellness tools available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tools;
