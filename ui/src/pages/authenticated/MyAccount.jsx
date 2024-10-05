import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubMenu from '../../components/layoutComponents/SubMenu';
import { useAuth } from '../../context/AuthProvider';
import EnrolledCourseCard from '../../components/courseComponents/EnrolledCourseCard';

const MyAccount = () => {
  const { user, updateUser, isAuthenticated, isLoading } = useAuth();
  const [localUser, setLocalUser] = useState(
    () => JSON.parse(localStorage.getItem('user')) || null // Cargar los datos del usuario desde localStorage al inicio
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpdatedUser = async () => {
      if (isAuthenticated) {
        const updatedUser = await updateUser();
        if (updatedUser) {
          setLocalUser(updatedUser); // Guardar el usuario actualizado en el estado local
          localStorage.setItem('user', JSON.stringify(updatedUser)); // Guardar el usuario en localStorage
        }
      } else if (!isAuthenticated && !isLoading) {
        navigate('/login');
      }
    };

    fetchUpdatedUser();
  }, [isAuthenticated, isLoading, updateUser, navigate]);

  if (isLoading || !localUser) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated || !localUser) {
    return <div>Please log in to view your account.</div>;
  }

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>My Account</h2>
        <p className="mb-6 text-2xl">Welcome to your dashboard, {localUser.name}!</p>

        {/* Información de la cuenta */}
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl mb-4">Account Information</h2>
          <p className="mb-2"><strong>Name:</strong> {localUser.name}</p>
          <p className="mb-6"><strong>Email:</strong> {localUser.email}</p>
          <Link to="/settings" className="btn">Change Your Information</Link>
        </div>

        {/* Cursos del usuario */}
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl mb-4">My Courses</h2>

          {localUser.courses && localUser.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {localUser.courses.map((course, index) => {
                return (
                  <EnrolledCourseCard 
                    key={course._id || `course-${index}`}  // Utilizar _id o index como key
                    id={course._id}  // Pasar el _id como id
                    {...course}  // Pasar el resto de los detalles del curso
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

export default MyAccount;
