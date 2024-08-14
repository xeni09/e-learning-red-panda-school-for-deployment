import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-transparente.png';
import useFetch from "../hooks/useFetch";
import { useAuth } from '../context/AuthContext'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const { data, loading, error: fetchError, execute } = useFetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (data) {
      login(data.token);
      setError('');
      navigate('/dashboard');
    }
  }, [data, navigate]);

   useEffect(() => {
    if (fetchError) {
      setError(fetchError.message || 'Failed to log in');
    }
  }, [fetchError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await execute({ body: { email, password } });
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Email address*
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Password*
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {loading && <p>Loading...</p>}

            <div>
              <button type="submit" className="btn-fullwidth">
                Log in
              </button>
            </div>
          </form>
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