import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo-transparente.png';

const CheckoutPage = () => {
  const location = useLocation();
  const { course } = location.state || {};

  if (!course) {
    return (
      <div className="container mx-auto p-4 py-20 text-center">
        <img
            alt="Red Panda School"
            src={logo}
            className="mx-auto h-28 w-auto"
          />
        <h2 className="font-bold text-2xl my-10 text-[var(--color-black)]">You have no courses in the cart</h2>
        <p className="text-lg font-medium text-center mb-4 text-[var(--color-grey)]">It looks like you haven't selected any courses to purchase yet!</p>
        <Link to="/courses">
          <button className="btn-wide">
            Find your Course here!
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-20">
      <h1 className="font-bold text-[var(--color-black)] text-center pb-16">Checkout</h1>
      <div className="flex flex-col md:flex-row border rounded-lg shadow-lg p-6">
        <div className="md:w-1/2 p-4">
          <img src={course.image} alt={course.name} className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="font-bold text-2xl mb-4">{course.name}</h2>
          <p className="text-lg mb-4">{course.description}</p>
          <p className="text-xl text-[var(--color-black)] mb-4">Price: {course.price}</p>
          <div className="border-t pt-4">
            <p className="text-lg">Tax: $5.00</p>
            <p className="text-lg font-bold">Total: {parseFloat(course.price.replace('$', '')) + 5}</p>
          </div>
          <button className="btn-fullwidth mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;