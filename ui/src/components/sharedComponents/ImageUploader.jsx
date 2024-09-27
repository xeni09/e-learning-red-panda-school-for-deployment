import React, { useState } from 'react';

const ImageUploader = ({ onFileChange }) => {
  const [previewImage, setPreviewImage] = useState(null);

  // Manejar el cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo de la imagen
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Mostrar una previsualización
      onFileChange(file); // Enviar el archivo de imagen al componente padre
    } else {
      setPreviewImage(null); // Limpiar la previsualización si se elimina el archivo
      onFileChange(null); // Limpiar el archivo en el componente padre
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
