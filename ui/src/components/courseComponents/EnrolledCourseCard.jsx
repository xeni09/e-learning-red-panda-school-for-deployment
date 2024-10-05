import React from 'react';
import { useNavigate } from 'react-router-dom';

// EnrolledCourseCard.jsx
const EnrolledCourseCard = ({ id, name, imageSrc, imageAlt, teacher, description }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (id) {
      console.log(`Course ID in handleCardClick: ${id}`); // Verificar el ID
      navigate(`/enrolled-course/${id}`); // Navegar a la ruta correcta
    } else {
      console.error("Course ID is undefined");
    }
  };

  const instructorName = typeof teacher === 'object' ? teacher.name : teacher || 'Unknown Teacher';

  return (
    <div className="border rounded-lg shadow-lg" >
      <img 
  src={`http://localhost:3000${imageSrc}`}  // Asegúrate de que la URL es correcta
  alt={imageAlt || 'Course image'} 
  className="w-full h-64 object-cover rounded-t-lg" 
/>

      <div className="p-6 bg-[var(--color-beige)]">
        <h3>{name}</h3>
        <p>Instructor: {instructorName}</p>
        <p>{description}</p>
        <button className="btn-fullwidth" onClick={handleCardClick}>View Course</button>
      </div>
    </div>
  );
};



export default EnrolledCourseCard;
