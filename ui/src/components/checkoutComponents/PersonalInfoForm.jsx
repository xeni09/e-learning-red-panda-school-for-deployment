import React from 'react';

const PersonalInfoForm = ({ formData, errors, handleInputChange, nextStep }) => {
  return (
    <div>
      <p className="font-bold text-2xl pt-6 my-4">Step 1: Personal Information</p>
      <form>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="field"
            id="name"
            name="name"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="email">Email (Please change Email Address!)</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="field"
            id="email"
            name="email"
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="field"
            id="address"
            name="address"
            required
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <button type="button" onClick={nextStep} className="flex btn mt-6 ml-auto">Next</button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
