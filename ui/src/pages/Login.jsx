// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-transparente.png';
import { authenticateUser } from '../services/authService';
import { useAuth } from '../context/AuthProvider';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError('');
    try {
      const { token, userData } = await authenticateUser({ email, password });
      await login(token, userData); // Espera a que `login` complete antes de redirigir
      console.log('Login successful, redirecting to /my-account');
      navigate('/my-account'); // Redirige después de que el estado se haya actualizado
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center py-12 px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Red Panda School"
            src={logo}
            className="mx-auto mt-6 h-28 w-auto"
          />
          <h2 className="text-center font-bold my-8">
            Log in to your account
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />
          <p className="mt-2 text-left text-[var(--color-grey)]">
            Not a member?{' '}
            <a href="register" className="font-semibold leading-6 text-secondary hover:text-primary">
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
