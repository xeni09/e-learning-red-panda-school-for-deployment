import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo-transparente.png'; 
import pythonImage from '../assets/images/python.jpg'; 

const ConfirmationCourseBought = () => {
  const location = useLocation();
  const { cart = [], formData = {} } = location.state || {};

  return (
    <div className="container mx-auto p-4 py-20 text-center">
      <img
        alt="Red Panda School"
        src={logo}
        className="mx-auto h-28 w-auto mb-10"
      />
      <h1 className="font-bold text-3xl my-4 text-[var(--color-black)]">Congratulations!</h1>
      <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-6">You have successfully bought the course.</p>
     
        <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-6">An email confirmation has been sent to <strong>{formData.email}</strong> (Not really).
        </p>
        <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-6">Therefore use this info to log in:<br />
        Email: <strong>testemail@test.com</strong> <br /> password: <strong>1234</strong> 
        </p>


       <h2 className="font-bold text-3xl text-[var(--color-black)] mb-6">
        Order Summary
      </h2>

      <div className="flex justify-center">
        {cart.length > 0 ? (
          cart.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center w-full sm:w-1/2 lg:w-1/3">
              {/* Course Image */}
              <img
                src={pythonImage}
                alt="Python Course"
                className="rounded-lg shadow-md mx-auto mb-6"
              />

              {/* Course Information */}
              <h3 className="font-bold text-xl text-[var(--color-black)]">{course.name || 'Python Programming'}</h3>
              <p className="text-lg font-medium text-[var(--color-grey)]">by {course.teacherName || 'Pete Python'}</p>
              <p className="text-lg font-medium text-[var(--color-grey)]">Price: {course.price || '49.99 €'}</p>
            </div>
          ))
        ) : (
          <p className="text-lg font-medium text-[var(--color-grey)]">No courses in the cart.</p>
        )}
      </div>

      <Link to="/courses">
        <button className="btn-wide btn-primary mt-6">
          Back to Courses
        </button>
      </Link>
    </div>
  );
};

export default ConfirmationCourseBought;