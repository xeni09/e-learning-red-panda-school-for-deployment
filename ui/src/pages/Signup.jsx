import React from 'react';
import logo from '../assets/logo-transparente.png';

export default function Signup() {
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

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
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
                  className="block w-full rounded-md border-0 py-1.5 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          
          
            <div>
              <button type="submit" className="btn-fullwidth">
                Sign Up
              </button>
            </div>
          
          
          
          </form>
          <p className="mt-2 text-left  text-[var(--color-grey)]">
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