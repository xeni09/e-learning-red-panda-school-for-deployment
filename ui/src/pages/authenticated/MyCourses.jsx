import React, { useEffect } from 'react';
import SubMenu from '../../components/layoutComponents/SubMenu';
import { useAuth } from '../../context/AuthProvider';

const MyCourses = () => {
  const { user, updateUser, isAuthenticated, isLoading } = useAuth();  // Obtener los datos del contexto

  useEffect(() => {
    const fetchUpdatedUser = async () => {
      if (isAuthenticated && !user) {
        await updateUser();
      }
    };

    fetchUpdatedUser();
  }, [isAuthenticated, user, updateUser]);

  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>My Courses</h2>
        <p className="text-xl">Here you can find all your purchased courses.</p>

        {user.courses && user.courses.length > 0 ? (
          <ul>
            {user.courses.map((course) => (
              <li key={course.id} className="mb-4">
                <strong>{course.name}</strong> {/* Ajustamos para usar 'name' */}
                <p>Course ID: {course.id}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't bought any courses yet.</p>
        )}
      </div>
    </>
  );
};

export default MyCourses;
