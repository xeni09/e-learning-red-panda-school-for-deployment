import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
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
  const [errorMessage, setErrorMessage] = useState(''); 


  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === 'email') {
      setErrorMessage(''); // Reset error message if email changes
    }
  };

  const nextStep = () => {
    setErrorMessage(''); // Reset error message when moving to next step
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleConfirmOrder = async () => {
    try {
      // Register user
      await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: '1234',
      }, { withCredentials: true });
  
      // Login user
      const loginResponse = await axios.post('/api/auth/login', {
        email: formData.email,
        password: '1234',
      }, { withCredentials: true });
  
      login(loginResponse.data.user);
  
      const userId = loginResponse.data.user._id;
      await axios.put(`/api/courses/67001dc00f968533a71ee9e7/assign`, { userId }, { withCredentials: true });
  
      await updateUser();  // Update user data
  
      // Reset the error message if successful
      setErrorMessage('');
  
      // Pass formData correctly to the confirmation page
      navigate('/confirmationcoursebought', { state: { cart, formData } });
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
    
      // Check if the error is due to user already existing
      if (error.response?.data?.msg === "User already exists") {
        setErrorMessage('This email already exists, please use a different one.');
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message); // General error messages
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="p-2">
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
          errorMessage={errorMessage} // Pass the errorMessage to ReviewOrder
        />
      )}
    </div>
  );
};

export default CheckoutSteps;
