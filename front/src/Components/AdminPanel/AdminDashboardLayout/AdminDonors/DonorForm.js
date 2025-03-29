import React, { useState } from 'react';

const DonorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Add New Donor</h2>
    </div>
  );
};

export default DonorForm;