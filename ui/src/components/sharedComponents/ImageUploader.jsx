import React, { useState } from 'react';

const ImageUploader = ({ onFileChange }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }
    onFileChange(e);
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
        onChange={handleFileChange}
        className="hidden"
      />

      {previewImage && (
        <div className="my-4">
          <img src={previewImage} alt="Preview" className="max-w-xs rounded shadow-lg max-h-40 object-cover" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
