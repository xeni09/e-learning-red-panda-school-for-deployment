import React from 'react';
import ImageUploader from '../sharedComponents/ImageUploader';
import ImageCropper from '../sharedComponents/ImageCropper';

const CourseImageUploadAndCrop = ({ handleFileChange, handleCropComplete, errors, croppingImage, croppedImage }) => {
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

      <div className="md:col-span-2 my-2">
        {!croppedImage && !croppingImage && <ImageUploader onFileChange={handleFileChange} />}
        {croppedImage && (
          <div className="my-4">
            <p>Cropped Image Preview:</p>
            <img src={croppedImage} alt="Cropped Preview" className="max-w-xs rounded shadow-lg" />
          </div>
        )}
        {errors.courseImage && <p className="text-red-500 text-sm mt-3">{errors.courseImage}</p>}
      </div>
    </>
  );
};

export default CourseImageUploadAndCrop;
