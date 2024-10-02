import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoursePage = () => {
  const { courseId } = useParams(); // Obtener el ID del curso de la URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load course');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      <p>Teacher: {course.teacher}</p>
      <p>Price: ${course.price}</p>
      <p>Participants: {course.participants}</p>
    </div>
  );
};

export default CoursePage;
