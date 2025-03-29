import React, { useState } from 'react';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    bloodType: '',
    unitsRequired: '',
    urgency: '',
    patientDetails: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create request');
      }
      
      // Reset form after successful submission
      setFormData({
        hospitalName: '',
        bloodType: '',
        unitsRequired: '',
        urgency: '',
        patientDetails: ''
      });
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Blood Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
              Hospital Name
            </label>
            <input
              type="text"
              id="hospitalName"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
              Blood Type
            </label>
            <select
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label htmlFor="unitsRequired" className="block text-sm font-medium text-gray-700">
              Units Required
            </label>
            <input
              type="number"
              id="unitsRequired"
              name="unitsRequired"
              value={formData.unitsRequired}
              onChange={handleInputChange}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
              Urgency Level
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            >
              <option value="">Select Urgency</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="patientDetails" className="block text-sm font-medium text-gray-700">
              Patient Details
            </label>
            <textarea
              id="patientDetails"
              name="patientDetails"
              value={formData.patientDetails}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Create Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;