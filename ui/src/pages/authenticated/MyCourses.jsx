import React from 'react';
import { useAuth } from '../../context/AuthProvider'; // Import useAuth hook to get the user context
import SubMenu from '../../components/layoutComponents/SubMenu';
import EnrolledCourseCard from '../../components/courseComponents/EnrolledCourseCard';

const MyCourses = () => {
  const { user, isAuthenticated, isLoading } = useAuth(); // Access user, isAuthenticated, and isLoading from context

  // Show loading state while fetching user data
  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  // Show a message if the user is not authenticated
  if (!isAuthenticated || !user) {
    return <div>Please log in to view your courses.</div>;
  }

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>My Courses</h2>
        <p className="text-xl">Here you can find all your purchased courses.</p>
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          {/* Display user's purchased courses */}
          {user.courses && user.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {user.courses.map((course) => (
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

export default MyCourses;
