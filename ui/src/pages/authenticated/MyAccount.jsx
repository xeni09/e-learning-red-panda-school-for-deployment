import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SubMenu from './SubMenu';
import useFetch from '../../hooks/useFetch'; 
import { AuthContext } from '../../context/AuthContext';

const MyAccount = () => {
  const { user } = useContext(AuthContext); // Obtener datos del usuario desde el contexto
  const { data: fetchedUser, loading, error, execute } = useFetch('/api/user'); 



  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Your Account</h2>
        <p className="mb-6 text-2xl">Welcome to your dashboard, {fetchedUser?.name}!</p>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <p className="mb-2"><strong>Name:</strong> {fetchedUser?.name}</p>
          <p className="mb-4"><strong>Email:</strong> {fetchedUser?.email}</p>
          <Link to="/settings" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Your Information</Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          {fetchedUser?.courses?.length === 0 ? (
            <p>No courses yet in your account.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {fetchedUser?.courses?.map((course) => (
                <div key={course.id} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <Link to={`/courses/${course.id}`}>
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;