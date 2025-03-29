import React from 'react';

const AdminHospitals = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hospital Management</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Hospital Name</th>
              <th className="px-6 py-3 border-b">Location</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Add hospital rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHospitals;