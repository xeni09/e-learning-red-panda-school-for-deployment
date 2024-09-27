import React, { useState } from 'react';
import ImageUploader from '../sharedComponents/ImageUploader';

const categories = [
  'Programming',
  'Design',
  'Marketing',
  'Business',
  'Art',
  'Photography',
];

const CourseForm = ({ onSubmit }) => {
  const [newCourse, setNewCourse] = useState({
    name: '',
    category: '',
    teacher: '',
    description: '',
    price: '',
    courseImage: null,
  });

  const [errors, setErrors] = useState({}); // Estado para manejar los errores de cada campo

  // Manejar cambios de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar error cuando el usuario empieza a escribir
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCourse({ ...newCourse, courseImage: file });
      setErrors({ ...errors, courseImage: '' }); // Limpiar error si se selecciona una imagen
    } else {
      setNewCourse({ ...newCourse, courseImage: null });
      setErrors({ ...errors, courseImage: 'Por favor sube una imagen.' });
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    // Validar campos individualmente
    if (!newCourse.name) newErrors.name = 'El campo "Nombre" es obligatorio.';
    if (!newCourse.category) newErrors.category = 'El campo "Categoría" es obligatorio.';
    if (!newCourse.teacher) newErrors.teacher = 'El campo "Profesor" es obligatorio.';
    if (!newCourse.description) newErrors.description = 'El campo "Descripción" es obligatorio.';
    if (!newCourse.price) newErrors.price = 'El campo "Precio" es obligatorio.';
    if (!newCourse.courseImage) newErrors.courseImage = 'Por favor sube una imagen.';

    // Si hay errores, no enviar el formulario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(newCourse);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-10 my-10">
      <h2 className="text-2xl mb-4">Crear Nuevo Curso</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Curso</label>
        <input
          type="text"
          name="name"
          value={newCourse.name}
          onChange={handleInputChange}
          className="input mb-1 w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>} {/* Mostrar error */}

        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select
          name="category"
          value={newCourse.category}
          onChange={handleInputChange}
          className="input mb-1 w-full p-2 border rounded"
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

        <label className="block text-sm font-medium text-gray-700 mb-1">Profesor</label>
        <input
          type="text"
          name="teacher"
          value={newCourse.teacher}
          onChange={handleInputChange}
          className="input mb-1 w-full p-2 border rounded"
        />
        {errors.teacher && <p className="text-red-500 text-sm">{errors.teacher}</p>}

        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          name="description"
          value={newCourse.description}
          onChange={handleInputChange}
          className="textarea mb-1 w-full p-2 border rounded"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
        <input
          type="text"
          name="price"
          value={newCourse.price}
          onChange={handleInputChange}
          className="input mb-1 w-full p-2 border rounded"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <ImageUploader onFileChange={handleFileChange} />
        {errors.courseImage && <p className="text-red-500 text-sm">{errors.courseImage}</p>}

        <button onClick={handleSubmit} className="btn mt-4">
          Crear Curso
        </button>
      </div>
    </div>
  );
};

export default CourseForm;
