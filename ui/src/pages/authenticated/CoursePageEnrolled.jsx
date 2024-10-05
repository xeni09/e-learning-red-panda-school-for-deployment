import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SubMenu from '../../components/layoutComponents/SubMenu';


const CoursePageEnrolled = () => {
  const { courseId } = useParams(); // Get courseId from URL params
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/enrolled`); // Make sure this matches your backend route
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
      <p>{course.description}</p>
      <p>Instructor: {course.teacher}</p>
      <p>Price: ${course.price}</p>
      <p>Participants: {course.participants}</p>
      {/* Display course sections */}
      <div>
        <h2>Course Sections</h2>
        {course.sections.map((section) => (
          <div key={section._id}>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};



export default CoursePageEnrolled;
