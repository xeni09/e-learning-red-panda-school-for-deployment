import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo-transparente.png'; 

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
     
      <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-6">
        An email confirmation has been sent to <strong>{formData.email}</strong> (Not really).
      </p>
      
      <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-6">
        You can use this info to log in:<br />
        Email: <strong>{formData.email}</strong><br /> password: <strong>1234</strong>
      </p>
      
      <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-6">
        But for testing purposes.... <br />you are already logged in!! please click on the button below:
      </p>
      
      <Link to="/my-account">
        <button className="btn-wide btn-primary mt-6">
          Go to your account
        </button>
      </Link>
    </div>
  );
};

export default ConfirmationCourseBought;
