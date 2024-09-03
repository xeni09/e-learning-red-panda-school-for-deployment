import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubMenu from './SubMenu';
import AuthContext from '../../context/AuthContext';

const MyAccount = () => {
  const { user, updateUser, isLoading } = useContext(AuthContext); 
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    if (user && localUser !== user) {
      setLocalUser(user);
      updateUser(user); // Asegura que AuthContext esté actualizado con la versión más reciente del usuario
    }
  }, [user, localUser, updateUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const displayName = localUser?.name || 'User';

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Your Account</h2>
        <p className="mb-6 text-2xl">Welcome to your dashboard, {displayName}!</p>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <p className="mb-2"><strong>Name:</strong> {localUser?.name}</p>
          <p className="mb-6"><strong>Email:</strong> {localUser?.email}</p>
          <Link to="/settings" className="btn">Edit Your Information</Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          {localUser?.courses?.length === 0 ? (
            <p>No courses yet in your account.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {localUser?.courses?.map((course) => (
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
