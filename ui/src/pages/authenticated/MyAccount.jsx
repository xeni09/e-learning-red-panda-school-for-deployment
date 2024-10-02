import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubMenu from '../../components/layoutComponents/SubMenu';
import { useAuth } from '../../context/AuthProvider';

const MyAccount = () => {
  const { user, updateUser, isAuthenticated, isLoading } = useAuth();  // Directamente desde el contexto
  const navigate = useNavigate();

  // useEffect para verificar autenticación y cargar datos del usuario
  useEffect(() => {
    const fetchUpdatedUser = async () => {
      if (isAuthenticated && !user) {
        await updateUser();
      } else if (!isAuthenticated && !isLoading) {
        navigate('/login');
      }
    };
  
    fetchUpdatedUser();
  }, [isAuthenticated, isLoading, user, updateUser, navigate]);
  
  // Mostrar loading mientras los datos del usuario se están cargando
  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated || !user) {
    return <div>Please log in to view your account.</div>;
  }

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>My Account</h2>
        <p className="mb-6 text-2xl">Welcome to your dashboard, {user.name}!</p>
        
        {/* Información de la cuenta */}
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl mb-4">Account Information</h2>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-6"><strong>Email:</strong> {user.email}</p>
          <Link to="/settings" className="btn">Change Your Information</Link>
        </div>

        {/* Información de los cursos */}
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl mb-4">My Courses</h2>



          {user.courses && user.courses.length > 0 ? (
            <ul>
              {user.courses.map((course) => (
                <li key={course._id} className="mb-4">
                  <strong>{course.name}</strong> 
                  <p>Course ID: {course._id}</p>
                </li>
              ))}
            </ul>
          ) : (
  <p>You haven't bought any courses yet.</p>
)}

        </div>
      </div>
    </>
  );
};

export default MyAccount;
