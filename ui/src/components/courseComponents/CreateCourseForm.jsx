import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import TextareaInput from './TextareaInput';
import ImageUploader from '../sharedComponents/ImageUploader';
import { categories } from '../sharedComponents/constants'; 

const CreateCourseForm = ({ onSubmit, courseToEdit, onCancel }) => {
  const [newCourse, setNewCourse] = useState({
    name: '',
    category: '',
    teacher: '',
    description: '',
    price: '',
    courseImage: null, // El archivo de imagen se almacenará aquí
  });

  const [errors, setErrors] = useState({}); // Estado para manejar los errores de los campos

  // Rellenar el formulario si `courseToEdit` existe
  useEffect(() => {
    if (courseToEdit) {
      setNewCourse({
        name: courseToEdit.name || '',
        category: courseToEdit.category || '',
        teacher: courseToEdit.teacher || '',
        description: courseToEdit.description || '',
        price: courseToEdit.price || '',
        courseImage: courseToEdit.imageSrc || null, // Imagen existente si está disponible
      });
    }
  }, [courseToEdit]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar errores al escribir
  };

  // Manejar el cambio de archivo
  const handleFileChange = (file) => {
    setNewCourse({ ...newCourse, courseImage: file });
    setErrors({ ...errors, courseImage: '' });  // Limpiar errores si se sube un archivo
  };

  const handleSubmit = () => {
    const newErrors = {};
  
    // Validaciones de campos
    if (!newCourse.name) newErrors.name = 'Course name is required.';
    if (!newCourse.category) newErrors.category = 'Category is required.';
    if (!newCourse.teacher) newErrors.teacher = 'Teacher name is required.';
    if (!newCourse.description) newErrors.description = 'Description is required.';
    if (!newCourse.price) newErrors.price = 'Price is required.';
    if (!newCourse.courseImage && !courseToEdit) newErrors.courseImage = 'Please upload an image.';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Crear FormData para enviar al backend
    const formData = new FormData();
    formData.append("name", newCourse.name);
    formData.append("category", newCourse.category);
    formData.append("teacher", newCourse.teacher);
    formData.append("description", newCourse.description);
    formData.append("price", newCourse.price);
    
    // Asegurarse de que el archivo es de tipo "File"
    if (newCourse.courseImage instanceof File) {
      formData.append("courseImage", newCourse.courseImage); // Aquí debe ser un archivo
    }
  
    console.log([...formData]); // Verifica que la imagen se esté añadiendo como archivo
  
    onSubmit(formData); // Enviar los datos al backend
  };
  

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
      <h2 className="text-xl font-bold">{courseToEdit ? 'Edit Course' : 'Create New Course'}</h2>
      <div className="mb-4">
        <TextInput
          label="Course Name"
          name="name"
          value={newCourse.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <SelectInput
          label="Category"
          name="category"
          value={newCourse.category}
          options={categories}
          onChange={handleInputChange}
          error={errors.category}
        />
        <TextInput
          label="Teacher"
          name="teacher"
          value={newCourse.teacher}
          onChange={handleInputChange}
          error={errors.teacher}
        />
        <TextareaInput
          label="Description"
          name="description"
          value={newCourse.description}
          onChange={handleInputChange}
          error={errors.description}
        />
        <TextInput
          label="Price"
          name="price"
          value={newCourse.price}
          onChange={handleInputChange}
          error={errors.price}
        />

        <ImageUploader onFileChange={handleFileChange} />

        <div className="flex justify-between mt-4">
          <button onClick={handleSubmit} className="btn">
            {courseToEdit ? 'Save Changes' : 'Create Course'}
          </button>
          <button onClick={onCancel} className="btn bg-gray-500 text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseForm;
