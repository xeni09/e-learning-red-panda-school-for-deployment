import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import SubMenu from '../../components/layoutComponents/SubMenu';
import EnrolledCourseTabs from '../../components/courseComponents/EnrolledCourseTabs';

const EnrolledCoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/enrolled`);
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
    <>
      <SubMenu />
      <div className="container my-16 p-4">
        <h1>{course.name}</h1>
        <p>A course from <span className="font-bold">{course.teacher}</span></p>
        <p>Participants: {course.participants}</p>

        {/* Pass the course object to EnrolledCourseTabs */}
        <EnrolledCourseTabs course={course} />
      </div>
    </>
  );
};

export default EnrolledCoursePage;
