import React from 'react';
import pythonImage from '../../assets/images/python.jpg'; 

const CheckoutSummary = ({ cart, removeCourse }) => {
  return (
    <div className="md:w-1/3 p-5 bg-white rounded-lg shadow-md">
      <p className="font-bold text-3xl my-4">Cart</p>
      <img src={pythonImage} className="rounded-lg shadow-md mr-4 mb-6" />
      <div>
        <ul>
          {cart.map((course, index) => (
            <li key={course._id || index} className="flex items-center mb-4">
              <div className="flex-1">
                <p className="font-bold text-lg">{course.name || "Python Programming"}</p>
                <p>{course.teacherName || "by Pete Python"}</p>
                <p className="text-lg">{course.price || "49,99"} €</p> 
              </div>
              {/* Botón para eliminar curso usando el ID estático */}
              <button 
                className="text-red-500 hover:text-red-700 font-bold ml-4"
                onClick={() => removeCourse("67001dc00f968533a71ee9e7")} // ID estático para testeo
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t pt-4">
          <p className="text-lg font-bold">
            Subtotal: {cart.reduce((total, course) => total + parseFloat(course.price || "49.99"), 0)} €
          </p>
          <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
