import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import axios from 'axios'; // You could also use a custom hook or service for API requests

const EnrolledCourseCard = ({ id }) => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null); // To hold course details

  // Load course data and store it locally or from API
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data); // Actualiza el estado con los datos más recientes
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  const handleCardClick = () => {
    if (id) {
      console.log(`Course ID in handleCardClick: ${id}`);
      navigate(`/enrolled-course/${id}`);
    } else {
      console.error("Course ID is undefined");
    }
  };

  if (!course) {
    return <p>Loading...</p>; // Handle loading state
  }

  // Mover la verificación de course.description después de que course haya sido cargado
  const shortDescription = course.description.length > 100 
    ? `${course.description.slice(0, 100)}...` 
    : course.description;

  const instructorName = typeof course.teacher === 'object' ? course.teacher.name : course.teacher || 'Unknown Teacher';

  return (
    <div className="border rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col bg-[var(--color-white)]">
      <img
        src={`http://localhost:3000${course.imageSrc}`}
        alt={course.name || 'Course image'}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <p className="text-sm text-[var(--color-grey)]">{instructorName}</p>
        </div>
        <h3 className="font-bold mt-2 text-left">{course.name}</h3>
        <p className="text-[var(--color-black)] mt-0 text-sm sm:text-base text-left">
          {shortDescription}
        </p>

        <div className="flex flex-wrap justify-between items-center mt-4 pt-6">
          <div className="flex items-center">
            <FaUser className="w-5 h-5 text-[var(--color-grey)]" />
            <p className="ml-2 text-sm text-[var(--color-grey)] font-light">{course.participants} Students</p>
          </div>
        </div>
        <div className="mt-auto">
          <button className="btn-fullwidth" onClick={handleCardClick}>
            Start Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
