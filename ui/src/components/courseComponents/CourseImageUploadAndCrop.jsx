import React, { useState, useEffect } from 'react';
import ImageUploader from '../sharedComponents/ImageUploader';
import ImageCropper from '../sharedComponents/ImageCropper';

const CourseImageUploadAndCrop = ({ errors, setNewCourse }) => {
  const [croppingImage, setCroppingImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCroppingImage(reader.result);
        setCroppedImage(null);  // Reinicia la imagen recortada para permitir el crop de la nueva imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageDataUrl) => {
    setCroppedImage(croppedImageDataUrl);
    setCroppingImage(null);  // Oculta el cropper después de recortar
  };

  const resetImage = () => {
    setCroppingImage(null);
    setCroppedImage(null);
  };

  useEffect(() => {
    if (croppedImage) {
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        courseImage: croppedImage,
      }));
    }
  }, [croppedImage, setNewCourse]);

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
            <p>Cropped Image Preview:</p>
            <img src={croppedImage} alt="Cropped Preview" className="max-w-xs rounded shadow-lg" />
            {/* Icono "X" para eliminar la imagen */}
            <button
              type="button"
              onClick={resetImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 px-2 text-xs hover:bg-red-600 transition"
              aria-label="Remove Image"
            >
              ✕
            </button>

            {/* Botón para cambiar la imagen */}
            <button
              type="button"
              onClick={() => document.getElementById('fileInput').click()} // Simula la apertura del input file
              className="btn mt-4"
            >
              Change Image
            </button>
          </div>
        )}
        {errors?.courseImage && <p className="text-red-500 text-sm mt-3">{errors.courseImage}</p>}
      </div>

      {/* Hidden file input for "Change Image" button */}
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
