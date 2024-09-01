import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubMenu from './SubMenu';
import { getUserData } from '../../services/authService'; 
import AuthContext from '../../context/AuthContext';

const MyAccount = () => {
  const { user } = useContext(AuthContext); 
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        console.log('User from AuthContext:', user);
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const data = await getUserData(user.id, token);
            setFetchedUser(data);
            console.log('Fetched User:', data);
          } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err);
          } finally {
            setLoading(false);
          }
        } else {
          console.error('No token found in localStorage');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const displayName = fetchedUser?.user?.name || user?.name || 'User';

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Your Account</h2>
        <p className="mb-6 text-2xl">Welcome to your dashboard, {displayName}!</p>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <p className="mb-2"><strong>Name:</strong> {fetchedUser?.user?.name || user?.name}</p>
          <p className="mb-6"><strong>Email:</strong> {fetchedUser?.user?.email || user?.email}</p>
          <Link to="/settings" className="btn">Edit Your Information</Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          {fetchedUser?.user?.courses?.length === 0 ? (
            <p>No courses yet in your account.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {fetchedUser?.user?.courses?.map((course) => (
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
