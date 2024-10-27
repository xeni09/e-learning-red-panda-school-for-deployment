import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubMenu from '../../components/layoutComponents/SubMenu';
import { useAuth } from '../../context/AuthProvider';
import EnrolledCourseCard from '../../components/courseComponents/EnrolledCourseCard';

const MyAccount = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading || !user) {
    return <p></p>;
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
        <div className=" bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl mb-4">Account Information</h2>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-6"><strong>Email:</strong> {user.email}</p>
          <Link to="/settings" className="btn">Change Your Information</Link>
        </div>

        {/* Cursos del usuario */}
        <div className="bg-white shadow-md rounded-lg p-10 pb-10 my-10">
          <div className="flex flex-col sm:flex-row justify-between">
            <h2 className="text-2xl">My Courses</h2>
            <div className="my-5 mb-10 sm:pt-0">
              <Link to="/my-courses" className="btn-orange">
                See All Courses
              </Link>
            </div>
          </div>

          {user.courses && user.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {user.courses.slice(0, 6).map((course) => (
                <EnrolledCourseCard key={course._id} id={course._id} />
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

export default MyAccount;
