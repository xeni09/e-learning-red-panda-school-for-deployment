import React, { useState, useEffect } from 'react';
import ImageUploader from '../sharedComponents/ImageUploader';
import ImageCropper from '../sharedComponents/ImageCropper';

const CourseImageUploadAndCrop = ({ errors, setTemporaryImage }) => {
  const [croppingImage, setCroppingImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // Cropped image preview

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCroppingImage(reader.result); // Set image for cropping
        setCroppedImage(null); // Reset cropped image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageDataUrl) => {
    fetch(croppedImageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        // Convert the cropped image to a file and pass it to the parent component
        const croppedFile = new File([blob], 'croppedImage.jpeg', { type: blob.type });
        setTemporaryImage(croppedFile); // Pass the File object to the parent component
      });

    setCroppedImage(croppedImageDataUrl); // Set the cropped image preview
    setCroppingImage(null); // Hide the cropper
  };

  const resetImage = () => {
    setCroppingImage(null);
    setCroppedImage(null);
    setTemporaryImage(null); // Clear the image in the parent component
  };

  return (
    <>
      {!croppedImage && croppingImage && (
        <div className="md:col-span-2 my-2">
          <ImageCropper
            imageSrc={croppingImage}
            onCropComplete={handleCropComplete}
            aspectRatio={16 / 9}
          />
        </div>
      )}

      <div className="md:col-span-2 my-2 relative">
        {!croppedImage && !croppingImage && <ImageUploader onFileChange={handleFileChange} />}
        {croppedImage && (
          <div className="relative my-4 inline-block">
            <p className="block mb-2 font-medium text-gray-700">Cropped Image Preview:</p>
            <img src={croppedImage} alt="Cropped Preview" className="max-w-xs rounded shadow-lg" />
            {/* Remove Image Button */}
            <button
              type="button"
              onClick={resetImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 px-2 text-xs hover:bg-red-600 transition"
              aria-label="Remove Image"
            >
              ✕
            </button>
            {/* Change Image Button */}
            <button
              type="button"
              onClick={() => document.getElementById('fileInput').click()}
              className="btn mt-4"
            >
              Change Image
            </button>
          </div>
        )}
        {errors?.courseImage && <p className="text-red-500 text-sm mt-3">{errors.courseImage}</p>}
      </div>

      {/* Hidden file input */}
      <input
        id="fileInput"
        type="file"
        name="courseImage"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files[0])}
        className="hidden"
      />
    </>
  );
};

export default CourseImageUploadAndCrop;
