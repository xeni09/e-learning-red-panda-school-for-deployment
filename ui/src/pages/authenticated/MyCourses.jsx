import React, { useEffect, useState } from 'react';
import SubMenu from '../../components/layoutComponents/SubMenu';
import { useAuth } from '../../context/AuthProvider';
import EnrolledCourseCard from '../../components/courseComponents/EnrolledCourseCard';

const MyCourses = () => {
  const { user, updateUser, isAuthenticated, isLoading } = useAuth();
  const [courses, setCourses] = useState(
    () => JSON.parse(localStorage.getItem('courses')) || [] // Cargar los cursos desde localStorage al inicio
  );

  useEffect(() => {
    const fetchUpdatedUser = async () => {
      if (isAuthenticated) {
        const updatedUser = await updateUser();
        if (updatedUser && updatedUser.courses) {
          setCourses(updatedUser.courses); // Actualizar el estado de los cursos
          localStorage.setItem('courses', JSON.stringify(updatedUser.courses)); // Guardar en localStorage
        }
      }
    };

    fetchUpdatedUser();
  }, [isAuthenticated, updateUser]);

  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>My Courses</h2>
        <p className="text-xl">Here you can find all your purchased courses.</p>
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
        {courses.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {courses.map((course, index) => {
              const teacherName = typeof course.teacher === 'object'
                ? course.teacher.name
                : course.teacher || "Unknown Teacher";

              return (
                <EnrolledCourseCard 
                  key={course._id || index}
                  id={course._id}
                  name={course.name}
                  imageSrc={course.imageSrc}
                  imageAlt={course.name}
                  teacher={teacherName}
                  description={course.description}
                  className="bg-[var(--color-beige)]"
                />
              );
            })}
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
