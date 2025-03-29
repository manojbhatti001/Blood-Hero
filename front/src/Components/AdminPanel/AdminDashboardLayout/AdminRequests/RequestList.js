import React from 'react';

const RequestList = ({ limit }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Request List</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Add New Request
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table content */}
        </table>
      </div>
    </div>
  );
};

export default RequestList;