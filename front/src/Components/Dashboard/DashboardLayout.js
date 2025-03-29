import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ListChecks,
  Clock, 
  History,
  User,
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Plus,
  Bell,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const [isDonorDropdownOpen, setIsDonorDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  };

  const isActivePath = (path) => location.pathname === path;

  const renderMenuItem = (item) => {
    if (item.isDivider) {
      return <div key="divider" className="my-1 sm:my-2 border-t border-gray-200" />;
    }

    if (item.isDropdown) {
      return (
        <div className="relative" key={item.label}>
          <button
            onClick={() => setIsDashboardDropdownOpen(!isDashboardDropdownOpen)}
            className={`w-full flex items-center px-2 sm:px-3 py-2 sm:py-3 rounded-lg transition-all duration-300 group ${
              isActivePath('/dashboard') || isActivePath('/requester-dashboard')
                ? 'bg-red-50 text-red-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            {isOpen && (
              <div className="ml-3 flex-1 flex items-center justify-between">
                <span className="text-sm sm:text-base">{item.label}</span>
                <ChevronDown 
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${
                    isDashboardDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            )}
          </button>
          {isDashboardDropdownOpen && isOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10">
              {item.options.map((option) => (
                <Link
                  key={option.path}
                  to={option.path}
                  onClick={() => setIsDashboardDropdownOpen(false)}
                  className={`block px-3 sm:px-4 py-2 text-xs sm:text-sm ${
                    isActivePath(option.path) 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-gray-600 hover:bg-red-50'
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.onClick) {
      return (
        <button
          key={item.label}
          onClick={item.onClick}
          className={`w-full flex items-center px-2 sm:px-3 py-2 sm:py-3 rounded-lg transition-all duration-300 group ${
            item.className || 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
            item.className?.includes('text-red-600') ? 'text-red-600' : 'text-gray-500'
          }`} />
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm sm:text-base font-medium">{item.label}</p>
              <p className="text-xs text-gray-500 hidden sm:block">{item.description}</p>
            </div>
          )}
        </button>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center px-2 sm:px-3 py-2 sm:py-3 rounded-lg transition-all duration-300 group ${
          isActivePath(item.path)
            ? 'bg-red-50 text-red-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
          isActivePath(item.path) ? 'text-red-600' : 'text-gray-500'
        }`} />
        {isOpen && (
          <div className="ml-3">
            <p className="text-sm sm:text-base font-medium">{item.label}</p>
            <p className="text-xs text-gray-500 hidden sm:block">{item.description}</p>
          </div>
        )}
      </Link>
    );
  };

  const renderMobileMenuItem = (item) => {
    if (item.isDivider) {
      return <div key="divider" className="my-2 border-t border-gray-200" />;
    }

    if (item.isDropdown) {
      return (
        <div className="relative" key={item.label}>
          <button
            onClick={() => setIsDonorDropdownOpen(!isDonorDropdownOpen)}
            onMouseEnter={() => setIsDonorDropdownOpen(true)}
            onMouseLeave={() => setIsDonorDropdownOpen(false)}
            className={`w-full flex items-center px-4 py-2.5 text-base font-medium ${
              isActivePath('/dashboard') || isActivePath('/requester-dashboard')
                ? 'text-red-600 bg-red-50 border-l-4 border-red-600'
                : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
            <ChevronDown 
              className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                isDonorDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          <div 
            onMouseEnter={() => setIsDonorDropdownOpen(true)}
            onMouseLeave={() => setIsDonorDropdownOpen(false)}
            className={`absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 transition-all duration-200 ${
              isDonorDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            {item.options.map((option) => (
              <Link
                key={option.path}
                to={option.path}
                onClick={() => setIsDonorDropdownOpen(false)}
                className={`block px-4 py-2.5 text-sm ${
                  isActivePath(option.path) 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    if (item.onClick) {
      return (
        <button
          key={item.label}
          onClick={() => {
            item.onClick();
            setIsMobileOpen(false);
          }}
          className={`w-full flex items-center px-4 py-2.5 text-base font-medium ${
            item.className || 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
          }`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          <span>{item.label}</span>
        </button>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => setIsMobileOpen(false)}
        className={`flex items-center px-4 py-2.5 text-base font-medium ${
          isActivePath(item.path)
            ? 'text-red-600 bg-red-50 border-l-4 border-red-600'
            : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
        }`}
      >
        <item.icon className="w-5 h-5 mr-3" />
        <span>{item.label}</span>
      </Link>
    );
  };

  const dashboardOptions = [
    {
      label: 'Donor Dashboard',
      path: '/dashboard',
      description: 'Manage your blood donations'
    },
    {
      label: 'Requester Dashboard',
      path: '/requester-dashboard',
      description: 'Manage your blood requests'
    }
  ];

  // Define menu items based on dashboard type
  const getDashboardMenuItems = () => {
    const isDonorDashboard = location.pathname.startsWith('/dashboard');
    
    const commonMenuItems = [
      {
        icon: LayoutDashboard,
        label: 'Dashboard',
        isDropdown: true,
        options: dashboardOptions,
        description: 'Switch between dashboards'
      },
    ];

    const donorMenuItems = [
      ...commonMenuItems,
      {
        icon: Home,
        label: 'Available Requests',
        path: '/dashboard/available',
        description: 'View nearby blood requests'
      },
      {
        icon: ListChecks,
        label: 'Accepted Requests',
        path: '/dashboard/accepted',
        description: 'Manage your accepted donations'
      },
      {
        icon: History,
        label: 'Donation History',
        path: '/dashboard/history',
        description: 'View your past donations'
      },
      {
        icon: User,
        label: 'Profile Settings',
        path: '/dashboard/profile',
        description: 'Manage your account'
      },
      // Add divider before logout
      { isDivider: true },
      {
        icon: LogOut,
        label: 'Logout',
        onClick: handleLogout,
        description: 'Sign out of your account',
        className: 'text-red-600 hover:bg-red-50'
      }
    ];

    const requesterMenuItems = [
      ...commonMenuItems,
      {
        icon: Plus,
        label: 'Create Request',
        path: '/requester-dashboard/create',
        description: 'Create new blood request'
      },
      {
        icon: ListChecks,
        label: 'Active Requests',
        path: '/requester-dashboard/active',
        description: 'View accepted donors'
      },
      {
        icon: History,
        label: 'Request History',
        path: '/requester-dashboard/history',
        description: 'View past blood requests'
      },
      {
        icon: User,
        label: 'Profile Settings',
        path: '/requester-dashboard/profile',
        description: 'Manage hospital details'
      },
      // Add divider before logout
      { isDivider: true },
      {
        icon: LogOut,
        label: 'Logout',
        onClick: handleLogout,
        description: 'Sign out of your account',
        className: 'text-red-600 hover:bg-red-50'
      }
    ];

    return isDonorDashboard ? donorMenuItems : requesterMenuItems;
  };

  const menuItems = getDashboardMenuItems();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? '280px' : '80px' }}
        className="hidden md:block fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-20"
      >
        {/* Logo Section - Desktop */}
        <div className="h-16 sm:h-20 flex items-center justify-between px-3 sm:px-4">
          <motion.img
            initial={{ width: isOpen ? 150 : 40 }}
            animate={{ width: isOpen ? 150 : 40 }}
            transition={{ duration: 0.3 }}
            src="/images/logo1.png"
            alt="Logo"
            className="object-contain cursor-pointer"
            onClick={handleLogoClick}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* User Info - Desktop */}
        {isOpen && (
          <div className="px-3 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">
              {location.pathname.startsWith('/requester-dashboard') 
                ? (currentUser?.hospitalName || 'Hospital Name')
                : (currentUser?.name || 'User Name')
              }
            </p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'user@example.com'}</p>
          </div>
        )}

        {/* Navigation - Desktop */}
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto sidebar-scroll">
          {menuItems.map(renderMenuItem)}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col min-h-screen w-full transition-all duration-300
          ${isOpen ? 'md:ml-[280px]' : 'md:ml-[80px]'}`}
      >
        <div className="flex-1 relative">
          {children}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-lg md:hidden hover:bg-gray-50"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-xl md:hidden"
            >
              {/* Mobile Logo Section */}
              <div className="h-16 flex items-center justify-between px-4">
                <img
                  src="/images/logo1.png"
                  alt="Logo"
                  className="h-8 w-auto cursor-pointer"
                  onClick={(e) => {
                    handleLogoClick(e);
                    setIsMobileOpen(false);
                  }}
                />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Mobile User Info */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {location.pathname.startsWith('/requester-dashboard') 
                    ? (currentUser?.hospitalName || 'Hospital Name')
                    : (currentUser?.name || 'User Name')
                  }
                </p>
                <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'user@example.com'}</p>
              </div>

              {/* Mobile Navigation */}
              <nav className="px-2 py-4 overflow-y-auto max-h-[calc(100vh-9rem)]">
                {menuItems.map(renderMobileMenuItem)}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;