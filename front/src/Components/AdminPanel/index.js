import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminDonors from './AdminDashboardLayout/AdminDonors/AdminDonors';
import AdminRequests from './AdminDashboardLayout/AdminRequests/AdminRequests';
import AdminHospitals from './AdminDashboardLayout/AdminHospitals/AdminHospitals';
import AdminVehicles from './AdminDashboardLayout/AdminVehicles/AdminVehicles';
import AdminSettings from './AdminDashboardLayout/AdminSettings/AdminSettings';

export { 
    AdminLogin, 
    AdminRegister,
    AdminDashboard,
    AdminDonors,
    AdminRequests,
    AdminHospitals,
    AdminVehicles,
    AdminSettings
};

const adminRoutes = [
    {
        path: '/admin/login',
        component: AdminLogin,
    },
    {
        path: '/admin/register',
        component: AdminRegister,
    },
];

export default adminRoutes;
