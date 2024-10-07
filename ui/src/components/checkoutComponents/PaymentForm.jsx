import React from 'react';

const PaymentForm = ({ formData, errors, handleInputChange, prevStep, nextStep }) => {
  return (
    <div>
      <p className="font-bold text-3xl pt-6 my-4">Step 2: Payment Method</p>
      <form>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            className="field"
            id="cardNumber"
            name="cardNumber"
            required
          />
          {errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
            className="field"
            id="expiryDate"
            name="expiryDate"
            required
          />
          {errors.expiryDate && <p className="text-red-500">{errors.expiryDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="cvv">CVV</label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value)}
            className="field"
            id="cvv"
            name="cvv"
            required
          />
          {errors.cvv && <p className="text-red-500">{errors.cvv}</p>}
        </div>
        <div className="flex justify-between ">
          <button type="button" onClick={prevStep} className="btn bg-gray-400 mt-4">Back</button>
          <button type="button" onClick={nextStep} className="btn mt-4">Next</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
