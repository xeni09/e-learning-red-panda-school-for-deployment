import React, { useState, useEffect } from 'react';
import CourseImageUploadAndCrop from '../../components/courseComponents/CourseImageUploadAndCrop';

const AddSectionForm = ({ newSection, setNewSection, handleAddSection }) => {
  const [croppingImage, setCroppingImage] = useState(null); // Imagen para recortar
  const [croppedImage, setCroppedImage] = useState(null); // Imagen recortada final
  const [errors, setErrors] = useState({}); // Estado para manejar errores

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (file) => {
    console.log("File selected: ", file.name); // Mostrar solo el nombre del archivo
    const reader = new FileReader();
    reader.onloadend = () => {
      setCroppingImage(reader.result); // Mostrar la imagen cargada para recortar
      console.log("Image for cropping loaded: (size: ", reader.result.length, ")"); // Mostrar el tamaño del resultado, no la imagen completa
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl); // Guardar la imagen recortada final
    setCroppingImage(null); // Limpiar la imagen cargada para recortar
    console.log("Cropped image saved (size: ", croppedImageUrl.length, ")"); // Mostrar el tamaño del resultado
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newSection.title) {
      newErrors.title = 'Title is required.';
    }
    if (!newSection.description) {
      newErrors.description = 'Description is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, retorna `true`.
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Form data before submission: ", {
      ...newSection,
      thumbnail: croppedImage ? `Image size: ${croppedImage.length}` : "No image",
    });

    handleAddSection({ ...newSection, thumbnail: croppedImage || null });

    // Limpiar el formulario y los estados después de agregar la sección
    setNewSection({
      title: '',
      description: '',
      videoUrl: '',
    });
    setCroppedImage(null);
    setErrors({});
  };

  useEffect(() => {
    // Limpiar el estado de la imagen cuando se limpia el formulario
    return () => {
      setCroppedImage(null);
    };
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="mb-6">
      <h3 className="text-2xl font-semibold mb-4">Add New Section</h3>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Section Title*</label>
        <input 
          type="text" 
          name="title"
          value={newSection.title}
          onChange={handleInputChange}
          className={`border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Section Description*</label>
        <textarea 
          name="description"
          value={newSection.description}
          onChange={handleInputChange}
          className={`border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Video URL (optional)</label>
        <input 
          type="text" 
          name="videoUrl"
          value={newSection.videoUrl}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

     

      <button 
        type="submit" 
        className="btn"
      >
        Add Section
      </button>
    </form>
  );
};

export default AddSectionForm;
