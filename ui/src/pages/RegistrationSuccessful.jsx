import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-transparente.png';
import useFetch from "../hooks/useFetch";

export default function RegistrationSuccessful() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { data, loading, error: fetchError, execute } = useFetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await execute({ body: { email, password } });

    if (fetchError) {
      setError(fetchError.message || 'Failed to log in');
      setSuccess('');
      return;
    }

    if (data) {
      setSuccess('Logged in successfully');
      setError('');
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center py-12 px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Red Panda School"
            src={logo}
            class="mx-auto mt-6 h-28 w-auto"
          />
          <h2 className="text-center font-bold my-8">
            Your user has been successfully created.
          </h2>
          <p className="text-center font-medium my-4">
            Please proceed to log in here:
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Email address
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
                Password
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
            {success && <p className="text-green-500">{success}</p>}
            {loading && <p>Loading...</p>}

            <div>
              <button type="submit" className="btn-fullwidth">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}