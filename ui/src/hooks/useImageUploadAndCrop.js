import { useState } from "react";

const useImageUploadAndCrop = () => {
  const [croppingImage, setCroppingImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCroppingImage(reader.result);
        setCroppedImage(null); // Resetea la imagen recortada al seleccionar un nuevo archivo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageDataUrl) => {
    setCroppedImage(croppedImageDataUrl);
    setCroppingImage(null); // Oculta el cropper después de recortar
  };

  const resetImage = () => {
    setCroppingImage(null);
    setCroppedImage(null); // Resetea ambas imágenes
  };

  return {
    croppingImage,
    croppedImage,
    handleFileChange,
    handleCropComplete,
    resetImage,
  };
};

export default useImageUploadAndCrop;
