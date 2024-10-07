import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import ProgressBar from './ProgressBar';
import PersonalInfoForm from './PersonalInfoForm';
import PaymentForm from './PaymentForm';
import ReviewOrder from './ReviewOrder';

const CheckoutSteps = ({ cart }) => {
  const { login, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Test Name',
    email: 'testemail@test.com',
    address: 'Far Far Away',
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '12/25',
    cvv: '123',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleConfirmOrder = async () => {
    try {
      await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: '1234',
      }, { withCredentials: true });

      const loginResponse = await axios.post('/api/auth/login', {
        email: formData.email,
        password: '1234',
      }, { withCredentials: true });

      login(loginResponse.data.user);

      const userId = loginResponse.data.user._id;
      await axios.put(`/api/courses/67001dc00f968533a71ee9e7/assign`, { userId }, { withCredentials: true });

      await updateUser();  // Update the user data

      navigate('/confirmationcoursebought');
    } catch (error) {
      console.error("Error creating user or assigning course:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 pr-20">
      <ProgressBar step={step} setStep={setStep} />

      {step === 1 && (
        <PersonalInfoForm
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <PaymentForm
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {step === 3 && (
        <ReviewOrder
          cart={cart}
          prevStep={prevStep}
          handleConfirmOrder={handleConfirmOrder}
        />
      )}
    </div>
  );
};

export default CheckoutSteps;
