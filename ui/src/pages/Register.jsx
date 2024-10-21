import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-transparente.png';
import useApi from "../hooks/useApi";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { data, loading, error: fetchError, execute } = useApi('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  useEffect(() => {
    if (data) {
      setSuccess('User created successfully');
      setError('');
      navigate('/registrationsuccessful'); 
    }
  }, [data, navigate]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message || 'Failed to create user');
      setSuccess('');
    }
  }, [fetchError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    console.log('Executing fetch');
    await execute({ body: { name, email, password } });
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
            Create your account
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Full Name*
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Repeat Password*
                </label>
              <div className="relative mt-2">
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type={showRepeatPassword ? 'text' : 'password'}
                  required
                  className="field"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={toggleRepeatPasswordVisibility}
                    className="focus:outline-none"
                  >
                    {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            {loading && <p>Loading...</p>}

            <div>
              <button type="submit" className="btn-fullwidth">
                Register
              </button>
            </div>
          </form>
          <p className="mt-2 text-left text-[var(--color-grey)]">
            Already a member?{' '}
            <Link to="Login" className="font-semibold leading-6 text-secondary hover:text-primary">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}