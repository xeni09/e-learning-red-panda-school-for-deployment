import React from 'react';

const ImageUploader = ({ onFileChange }) => {
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div>
      <label htmlFor="fileInput" className="btn cursor-pointer mb-4 mr-4">
        Upload Course Image
      </label>
      <input
        id="fileInput"
        type="file"
        name="courseImage"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        aria-label="Upload course image"
      />
    </div>
  );
};

export default ImageUploader;
