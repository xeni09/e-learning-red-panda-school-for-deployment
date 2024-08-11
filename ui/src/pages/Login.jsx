import React from 'react';
import logo from '../assets/logo-transparente.png';

const Login = () => {
  return (
    <>
      <div className="flex flex-1 flex-col justify-center py-12 px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Red Panda School"
            src={logo}
            className="mx-auto h-28 w-auto"
          />
          <h2 className="text-center font-bold py-8">
            Log in to your account
          </h2>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
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
                  className="block w-full rounded-md border-0 py-1.5 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                  Password
                </label>
                <div className="text-sm">
                  <a href="forgot-password" className="font-semibold text-secondary hover:text-primary">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn-fullwidth"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-2 text-left text-[var(--color-grey)]">
            Not a member?{' '}
            <a href="Signup" className="font-semibold leading-6 text-secondary hover:text-primary">
              Create a free Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;