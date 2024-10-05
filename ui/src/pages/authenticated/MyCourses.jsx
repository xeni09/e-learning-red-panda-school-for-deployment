import React, { useEffect, useState } from 'react';
import SubMenu from '../../components/layoutComponents/SubMenu';
import EnrolledCourseCard from '../../components/courseComponents/EnrolledCourseCard';
import axios from 'axios';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/courses'); // Fetch courses
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>My Courses</h2>
        <p className="text-xl">Here you can find all your purchased courses.</p>
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {courses.map((course) => (
                <EnrolledCourseCard 
                  key={course._id}
                  id={course._id}
                  name={course.name}
                  imageSrc={course.imageSrc}
                  imageAlt={course.name}
                  teacher={typeof course.teacher === 'object' ? course.teacher.name : course.teacher}
                  description={course.description}
                  participants={course.participants || course.userCount}
                />
              ))}
            </div>
          ) : (
            <p>You haven't bought any courses yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;
