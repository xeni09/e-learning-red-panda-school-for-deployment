import React, { useState } from 'react';
import logo from '../assets/logo-transparente.png';

export default function Signup() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }
    // Proceed with form submission
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="field"
                />
              </div>
            </div>

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

            <div>
              <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Repeat Password
              </label>
              <div className="mt-2">
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  required
                  className="field"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div>
              <button type="submit" className="btn-fullwidth">
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-2 text-left text-[var(--color-grey)]">
            Already a member?{' '}
            <a href="Login" className="font-semibold leading-6 text-secondary hover:text-primary">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}