import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Menu, ChevronDown } from "lucide-react";

const MobileNavbar = ({
  isOpen,
  setIsOpen,
  isActivePath,
  mobileSubmenuOpen,
  handleMobileSubmenuClick,
  volunteerLinks,
  handleMobileLinkClick,
  handleRegisterClick
}) => {
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md transition-colors text-red-600 hover:bg-red-50"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden fixed top-16 left-0 right-0 z-50 ${isOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-4 pt-2 pb-3 space-y-2 bg-white shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            to="/"
            className={`block px-4 py-2.5 rounded-md text-base font-medium ${
              isActivePath('/') 
                ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/emergency-blood"
            className={`block px-4 py-2.5 rounded-md text-base font-medium ${
              isActivePath('/emergency-blood') 
                ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Emergency Blood
          </Link>

          {/* Mobile Volunteer Services Dropdown */}
          <div className="relative">
            <button
              onClick={handleMobileSubmenuClick}
              className={`w-full flex justify-between items-center px-4 py-2.5 rounded-md text-base font-medium ${
                isActivePath('/volunteer') || isActivePath('/ngo-registration') || 
                isActivePath('/register-vehicle') || isActivePath('/hospital-login')
                  ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
              }`}
            >
              <span>Volunteer Services</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-200 ${
                  mobileSubmenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <motion.div
              initial={false}
              animate={{
                height: mobileSubmenuOpen ? 'auto' : 0,
                opacity: mobileSubmenuOpen ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-gray-50"
            >
              {volunteerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleMobileLinkClick(link)}
                  className={`block px-8 py-2.5 text-sm font-medium border-l-4 ${
                    isActivePath(link.path)
                      ? 'text-red-600 bg-red-50 border-red-600' 
                      : 'text-gray-600 border-transparent hover:text-red-600 hover:bg-red-50 hover:border-red-600'
                  } transition-all duration-200`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="space-y-2 pt-2">
            <Link
              to="/login"
              className="block w-full px-4 py-2.5 rounded-md text-base font-medium text-red-600 border-2 border-red-600 hover:bg-red-50 text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <button
              onClick={handleRegisterClick}
              className="w-full px-4 py-2.5 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 border-2 border-transparent hover:border-red-700"
            >
              Register
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MobileNavbar;