import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dashboard stats cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Donors</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        {/* Add more dashboard cards as needed */}
      </div>
    </div>
  );
};

export default AdminDashboard;