import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const DesktopNavbar = ({ 
  isActivePath, 
  isVolunteerDropdownOpen, 
  setIsVolunteerDropdownOpen,
  volunteerLinks,
  handleRegisterClick
}) => {
  return (
    <div className="hidden md:flex items-center">
      <div className="flex items-center space-x-4 lg:space-x-8">
        <Link 
          to="/"
          className={`group px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 ${
            isActivePath('/') 
              ? 'text-red-600' 
              : 'text-gray-700 hover:text-red-600'
          }`}
        >
          <span className="relative">
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 bg-red-600" />
          </span>
        </Link>
        <Link 
          to="/emergency-blood"
          className={`group px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
            isActivePath('/emergency-blood') 
              ? 'text-red-600' 
              : 'text-gray-700 hover:text-red-600'
          }`}
        >
          <span className="relative">
            Emergency Blood
            <span className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 bg-red-600" />
          </span>
        </Link>
        <div className="relative group">
          <button 
            className={`group px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 inline-flex items-center ${
              isActivePath('/volunteer') || isActivePath('/ngo-registration') || 
              isActivePath('/vehicle-registration') || isActivePath('/hospital-registration')
                ? 'text-red-600' 
                : 'text-gray-700 hover:text-red-600'
            }`}
            onMouseEnter={() => setIsVolunteerDropdownOpen(true)}
            onMouseLeave={() => setIsVolunteerDropdownOpen(false)}
          >
            <span className="relative">
              Volunteer Services
              <span className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 bg-red-600" />
            </span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          <div 
            className={`absolute left-0 mt-2 w-56 sm:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
              isVolunteerDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onMouseEnter={() => setIsVolunteerDropdownOpen(true)}
            onMouseLeave={() => setIsVolunteerDropdownOpen(false)}
          >
            <div className="py-1">
              {volunteerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={link.onClick}
                  className={`block px-4 py-2.5 text-sm sm:text-base ${
                    isActivePath(link.path)
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  } transition-colors`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <Link 
            to="/login"
            className="px-4 lg:px-6 py-2 rounded-lg border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 text-sm lg:text-base font-medium whitespace-nowrap"
          >
            Login
          </Link>
          <button 
            onClick={handleRegisterClick}
            className="px-4 lg:px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 text-sm lg:text-base font-medium border-2 border-transparent hover:border-red-700 whitespace-nowrap"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;