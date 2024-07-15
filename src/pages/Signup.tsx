import logo from '../assets/logo.png';

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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-dark-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn-fullwidth"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="Login" className="font-semibold leading-6 text-secondary hover:text-primary">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}