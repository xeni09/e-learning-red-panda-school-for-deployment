import React from 'react';

const ReviewOrder = ({ cart, prevStep, handleConfirmOrder, errorMessage }) => {
  return (
    <div>
      <p className="font-bold text-2xl pt-6 my-4">Step 3: Review & Confirm</p>
      <div>
        <h3 className="font-bold text-xl">Order Summary</h3>
        {cart.map((item, index) => (
          <div key={item._id || index} className="flex justify-between">
            <div>
              <p>x1</p>
              <p>Python Programming</p>
            </div>
            <div>
              <p>Price: 49,99 €</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button type="button" onClick={prevStep} className="btn bg-gray-400 mt-4">Back</button>
        <button type="button" onClick={handleConfirmOrder} className="btn mt-4">Confirm Order</button>
      </div>

      {/* Conditionally render the error message */}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 text-red-600 rounded">
          {errorMessage}
        </div>
      )}


    </div>
  );
};

export default ReviewOrder;
