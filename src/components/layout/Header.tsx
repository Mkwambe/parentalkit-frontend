import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAgeDropdown = () => {
    setIsAgeDropdownOpen(!isAgeDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">ParentalKit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                onClick={toggleAgeDropdown}
              >
                <span>By Age</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isAgeDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/expecting" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">Expecting</Link>
                  <Link to="/infants" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">Infants (0-3)</Link>
                  <Link to="/preschoolers" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">Preschoolers (3-5)</Link>
                  <Link to="/school-age" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">School Age (6-12)</Link>
                  <Link to="/teenagers" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">Teenagers (13-18)</Link>
                </div>
              )}
            </div>
            <Link to="/community" className="text-gray-700 hover:text-teal-600 transition-colors">Community</Link>
            <Link to="/tools" className="text-gray-700 hover:text-teal-600 transition-colors">Tools</Link>
            <Link to="/resources" className="text-gray-700 hover:text-teal-600 transition-colors">Resources</Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-teal-600 transition-colors">Log In</Link>
            <Link to="/register" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-teal-600"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <button 
                className="flex items-center justify-between text-gray-700 hover:text-teal-600 transition-colors"
                onClick={toggleAgeDropdown}
              >
                <span>By Age</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isAgeDropdownOpen && (
                <div className="pl-4 flex flex-col space-y-2 mt-2">
                  <Link to="/expecting" className="text-gray-700 hover:text-teal-600">Expecting</Link>
                  <Link to="/infants" className="text-gray-700 hover:text-teal-600">Infants (0-3)</Link>
                  <Link to="/preschoolers" className="text-gray-700 hover:text-teal-600">Preschoolers (3-5)</Link>
                  <Link to="/school-age" className="text-gray-700 hover:text-teal-600">School Age (6-12)</Link>
                  <Link to="/teenagers" className="text-gray-700 hover:text-teal-600">Teenagers (13-18)</Link>
                </div>
              )}
              <Link to="/community" className="text-gray-700 hover:text-teal-600 transition-colors">Community</Link>
              <Link to="/tools" className="text-gray-700 hover:text-teal-600 transition-colors">Tools</Link>
              <Link to="/resources" className="text-gray-700 hover:text-teal-600 transition-colors">Resources</Link>
              <div className="pt-3 border-t flex flex-col space-y-2">
                <Link to="/login" className="text-gray-700 hover:text-teal-600 transition-colors">Log In</Link>
                <Link to="/register" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors text-center">Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
