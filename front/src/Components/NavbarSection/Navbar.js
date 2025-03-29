import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext'; // Updated import path
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isVolunteerDropdownOpen, setIsVolunteerDropdownOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterClick = () => {
    navigate('/register');
    setIsOpen(false);
  };

  const handleHospitalClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/hospital-login');
    } else {
      navigate('/emergency-blood');
    }
    setIsOpen(false);
    setIsVolunteerDropdownOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const volunteerLinks = [
    { name: "Volunteer", path: "/Volunteer" },
    { name: "NGO's", path: "/ngo-registration" },
    { name: "Volunteer Vehicle", path: "/register-vehicle" },
    { name: "Hospital/Organization", path: "#", onClick: handleHospitalClick },
  ];

  const handleMobileSubmenuClick = () => {
    setMobileSubmenuOpen(!mobileSubmenuOpen);
  };

  const handleMobileLinkClick = (link) => {
    if (link.onClick) {
      link.onClick();
    }
    setIsOpen(false);
    setMobileSubmenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b-2 border-red-600' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src="/images/logo1.png"
                alt="Blood Donation Logo" 
                className="h-20 mt-5 sm:h-24 md:h-24 lg:h-36 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          <DesktopNavbar 
            isActivePath={isActivePath}
            isVolunteerDropdownOpen={isVolunteerDropdownOpen}
            setIsVolunteerDropdownOpen={setIsVolunteerDropdownOpen}
            volunteerLinks={volunteerLinks}
            handleRegisterClick={handleRegisterClick}
          />

          <MobileNavbar 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isActivePath={isActivePath}
            mobileSubmenuOpen={mobileSubmenuOpen}
            handleMobileSubmenuClick={handleMobileSubmenuClick}
            volunteerLinks={volunteerLinks}
            handleMobileLinkClick={handleMobileLinkClick}
            handleRegisterClick={handleRegisterClick}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;