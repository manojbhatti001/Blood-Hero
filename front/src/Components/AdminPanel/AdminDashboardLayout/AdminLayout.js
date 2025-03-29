import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { 
  Users, FileText, Hospital, Truck, Settings, LogOut, Menu, X, ChevronDown
} from 'lucide-react';

// Import admin components
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminDonors from './AdminDonors/AdminDonors';
import AdminRequests from './AdminRequests/AdminRequests';
import AdminHospitals from './AdminHospitals/AdminHospitals';
import AdminVehicles from './AdminVehicles/AdminVehicles';
import AdminSettings from './AdminSettings/AdminSettings';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});
  const timeoutRefs = useRef({});

  // Clear all timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const handleMouseEnter = (label) => {
    // Clear any existing timeout for this dropdown
    if (timeoutRefs.current[label]) {
      clearTimeout(timeoutRefs.current[label]);
    }
    
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: true
    }));
  };

  const handleMouseLeave = (label) => {
    // Set a timeout to close the dropdown
    timeoutRefs.current[label] = setTimeout(() => {
      setOpenDropdowns(prev => ({
        ...prev,
        [label]: false
      }));
    }, 200); // 200ms delay before closing
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleMenuClick = (item) => {
    // If it's a dropdown item, navigate to the main route
    if (item.isDropdown) {
      navigate(item.path);
    }
  };

  const menuItems = [
    {
      icon: Users,
      label: 'Donors',
      path: '/admin/dashboard/donors',
      description: 'Manage donor accounts and blood donations',
      isDropdown: true,
      subItems: [
        {
          label: 'Donor List',
          path: '/admin/dashboard/donors/list',
          description: 'View and manage all donors'
        },
        {
          label: 'Donor Details',
          path: '/admin/dashboard/donors/details',
          description: 'View detailed donor information'
        },
        {
          label: ' Donor form',
          path: '/admin/dashboard/donors/form',
          description: 'Register a new donor'
        }
      ]
    },
    {
      icon: FileText,
      label: 'Requests',
      path: '/admin/dashboard/requests',
      description: 'View and manage blood requests',
      isDropdown: true,
      subItems: [
        {
          label: 'Request List',
          path: '/admin/dashboard/requests/list',
          description: 'View and manage all blood requests'
        },
        {
          label: 'Request Details',
          path: '/admin/dashboard/requests/details',
          description: 'View detailed request information'
        },
        {
          label: 'Request Form',
          path: '/admin/dashboard/requests/form',
          description: 'Create a new blood request'
        }
      ]
    },
    {
      icon: Hospital,
      label: 'Hospitals',
      path: '/admin/dashboard/hospitals',
      description: 'Manage registered hospitals'
    },
    {
      icon: Truck,
      label: 'Vehicle Management',
      path: '/admin/dashboard/vehicles',
      description: 'Manage transport vehicles and logistics'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/admin/dashboard/settings',
      description: 'System configuration and preferences'
    },
    { isDivider: true },
    {
      icon: LogOut,
      label: 'Logout',
      onClick: handleLogout,
      description: 'Sign out of admin account',
      className: 'text-red-600 hover:bg-red-50'
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const renderMenuItem = (item) => {
    if (item.isDivider) {
      return <div key="divider" className="my-2 border-t border-gray-200" />;
    }

    if (item.onClick) {
      return (
        <button
          key={item.label}
          onClick={item.onClick}
          className={`flex items-center px-3 py-3 rounded-lg transition-all duration-300 w-full ${item.className || ''}`}
        >
          <item.icon className="w-5 h-5" />
          {isOpen && <span className="ml-3">{item.label}</span>}
        </button>
      );
    }

    if (item.isDropdown) {
      const isSubMenuOpen = openDropdowns[item.label] || false;
      const isActive = location.pathname.startsWith(item.path);

      return (
        <div 
          key={item.label} 
          className="space-y-1"
          ref={el => dropdownRefs.current[item.label] = el}
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={() => handleMouseLeave(item.label)}
        >
          <button
            onClick={() => handleMenuClick(item)}
            className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all duration-300 ${
              isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <item.icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-gray-500'}`} />
              {isOpen && <span className="ml-3 font-medium">{item.label}</span>}
            </div>
            {isOpen && (
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSubMenuOpen ? 'transform rotate-180' : ''
                }`} 
              />
            )}
          </button>
          
          <AnimatePresence>
            {isSubMenuOpen && isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-9 space-y-1 overflow-hidden"
              >
                {item.subItems.map((subItem, index) => (
                  <Link
                    key={index}
                    to={subItem.path}
                    className={`block px-3 py-2 rounded-md text-sm ${
                      location.pathname === subItem.path
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center px-3 py-3 rounded-lg transition-all duration-300 group ${
          isActivePath(item.path)
            ? 'bg-red-50 text-red-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <item.icon className={`w-5 h-5 ${
          isActivePath(item.path) ? 'text-red-600' : 'text-gray-500'
        }`} />
        {isOpen && (
          <div className="ml-3">
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-xs text-gray-500 hidden sm:block">{item.description}</p>
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-20">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            {isOpen && <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map(renderMenuItem)}
          </nav>
        </div>
      </aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <nav className="px-2 py-4 space-y-1">
                {menuItems.map(renderMenuItem)}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="ml-[280px] p-6">
        <Outlet />
      </main>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-lg md:hidden hover:bg-gray-50"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default AdminLayout;