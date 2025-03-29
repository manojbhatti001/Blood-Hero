import React from 'react';

const DonorDetails = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Donor Details</h2>      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-900">Name: John Doe</p>
              <p className="text-gray-900">Blood Type: A+</p>
              <p className="text-gray-900">Age: 28</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-900">Email: john@example.com</p>
              <p className="text-gray-900">Phone: (555) 123-4567</p>
              <p className="text-gray-900">Address: 123 Main St</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;