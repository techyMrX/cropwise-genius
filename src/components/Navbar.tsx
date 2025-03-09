
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // For demonstration, we'll fake authentication
  // In a real app, this would come from an auth context
  useEffect(() => {
    // Check if user is on protected routes (excluding login/register)
    setIsLoggedIn(!['/login', '/register', '/'].includes(location.pathname));
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = isLoggedIn ? [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Input Data', path: '/input' },
    { name: 'Recommendations', path: '/recommendations' },
  ] : [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'} py-4`}>
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-earth-600" />
          <span className="text-xl font-semibold text-earth-800">CropWise</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-earth-600 ${location.pathname === link.path ? 'text-earth-600' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-earth-600">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 text-sm font-medium">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`block py-2 px-3 rounded-md text-sm font-medium ${location.pathname === link.path ? 'bg-earth-50 text-earth-600' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn && (
              <>
                <Link 
                  to="/profile" 
                  className="block py-2 px-3 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
