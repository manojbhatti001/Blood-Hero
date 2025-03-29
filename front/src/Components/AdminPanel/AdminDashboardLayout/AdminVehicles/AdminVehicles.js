import React from 'react';

const AdminVehicles = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vehicle Management</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Vehicle ID</th>
              <th className="px-6 py-3 border-b">Type</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Add vehicle rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVehicles;