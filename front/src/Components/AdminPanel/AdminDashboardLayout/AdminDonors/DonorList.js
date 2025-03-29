import React from 'react';

const DonorList = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Donor List</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Add New Donor
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default DonorList;