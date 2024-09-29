import React, { useState } from 'react';

const ImageUploader = ({ onFileChange }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      onFileChange(file);
    } else {
      setPreviewImage(null);
      onFileChange(null);
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
      {/* {previewImage && (
        <div className="my-4">
          <img
            src={previewImage}
            alt="Image preview"
            className="max-w-xs rounded shadow-lg max-h-40 object-cover"
          />
        </div>
      )} */}
    </div>
  );
};

export default ImageUploader;
