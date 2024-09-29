import React from 'react';
import ImageUploader from '../sharedComponents/ImageUploader';
import ImageCropper from '../sharedComponents/ImageCropper';

const CourseImageUploadAndCrop = ({ handleFileChange, handleCropComplete, errors, croppingImage }) => {
  return (
    <>
      {croppingImage && (
        <div className="md:col-span-2 my-2">
          <ImageCropper
            imageSrc={croppingImage}
            onCropComplete={handleCropComplete}
            aspectRatio={16 / 9} // Keep the aspect ratio
          />
        </div>
      )}

      <div className="md:col-span-2 my-2">
        <ImageUploader onFileChange={handleFileChange} />
        {errors.courseImage && <p className="text-red-500 text-sm mt-3">{errors.courseImage}</p>}
      </div>
    </>
  );
};

export default CourseImageUploadAndCrop;
