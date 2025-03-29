import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from "./Components/NavbarSection/Navbar";
import HomePage from "./Components/HomepageSections/HomePage";
import EmergencyBlood from "./Components/EmergencyBloodSection/EmergencyBlood";
import Volunteer from "./Components/VolunteerSection/Volunteer";
import Login from "./Components/LoginSection/Login";
import HospitalLogin from "./Components/VolunteerSection/HospitalLogin";
import DonorRegistration from "./Components/LoginSection/DonorRegistration";
import Footer from "./Components/FooterSection/Footer";
import { Toaster } from 'react-hot-toast';
import SearchRequests from "./Components/SearchRequests";
import VehicleRegistration from "./Components/VolunteerSection/VehicleRegistration";
import Register from './Components/LoginSection/Register';
import HospitalRegistration from './Components/VolunteerSection/HospitalRegistration';
import GallerySection from './Components/HomepageSections/GallerySection';
import DashboardLayout from './Components/Dashboard/DashboardLayout';
import DonorDashboard from './Components/Dashboard/DonorDashboardSections/DonorDashboard';
import RequesterDashboard from './Components/Dashboard/RequesterDashboardSection/RequesterDashboard';
import ForgotPassword from "./Components/LoginSection/ForgotPassword";
import ResetPassword from "./Components/LoginSection/ResetPassword";

// Import admin components from index.js
import { 
  AdminLogin, 
  AdminRegister,
  AdminDashboard,
  AdminDonors,
  AdminRequests,
  AdminHospitals,
  AdminVehicles,
  AdminSettings 
} from './Components/AdminPanel';
import AdminLayout from './Components/AdminPanel/AdminDashboardLayout/AdminLayout';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
          <Route path="/emergency-blood" element={<><Navbar /><EmergencyBlood /><Footer /></>} />
          <Route path="/volunteer" element={<><Navbar /><Volunteer /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/hospital-login" element={<><Navbar /><HospitalLogin /><Footer /></>} />
          <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
          <Route path="/register-donor" element={<><Navbar /><DonorRegistration /><Footer /></>} />
          <Route path="/register-hospital" element={<><Navbar /><HospitalRegistration /><Footer /></>} />
          <Route path="/search-requests" element={<><Navbar /><SearchRequests /><Footer /></>} />
          <Route path="/register-vehicle" element={<><Navbar /><VehicleRegistration /><Footer /></>} />
          <Route path="/gallery" element={<><Navbar /><GallerySection /><Footer /></>} />
          <Route path="/forgot-password" element={<><Navbar /><ForgotPassword /><Footer /></>} />
          <Route path="/reset-password" element={<><Navbar /><ResetPassword /><Footer /></>} />


          {/* Admin Routes */}
          <Route path="/admin/login" element={<><Navbar /><AdminLogin /><Footer /></>} />
          <Route path="/admin/register" element={<><Navbar /><AdminRegister /><Footer /></>} />
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/dashboard/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="donors" element={<AdminDonors />}>
              <Route index element={<AdminDonors />} />
              <Route path="list" element={<AdminDonors />} />
              <Route path="details" element={<AdminDonors />} />
              <Route path="form" element={<AdminDonors />} />
            </Route>
            <Route path="requests" element={<AdminRequests />}>
              <Route index element={<AdminRequests />} />
              <Route path="list" element={<AdminRequests />} />
              <Route path="details" element={<AdminRequests />} />
              <Route path="form" element={<AdminRequests />} />
            </Route>
            <Route path="hospitals" element={<AdminHospitals />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>



          {/* Donor Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout><DonorDashboard /></DashboardLayout>} />
          <Route path="/dashboard/available" element={<DashboardLayout><DonorDashboard /></DashboardLayout>} />
          <Route path="/dashboard/accepted" element={<DashboardLayout><DonorDashboard /></DashboardLayout>} />
          <Route path="/dashboard/history" element={<DashboardLayout><DonorDashboard /></DashboardLayout>} />
          <Route path="/dashboard/profile" element={<DashboardLayout><DonorDashboard /></DashboardLayout>} />

          {/* Requester Dashboard Routes */}
          <Route path="/requester-dashboard" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/create" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/active" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/history" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/profile" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}