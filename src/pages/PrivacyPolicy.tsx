import React from 'react';
import logo from '../assets/logo.png';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center py-12 px-12 w-full max-w-screen-md min-h-screen mx-auto">
      <div>
          <img
            alt="Red Panda School"
            src={logo}
            className="mx-auto mt-6 h-28 w-auto"
          />
          <h2 className="mt-6 pb-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark-900">
            Privacy Policy
          </h2>
        </div>

        
          <div className="space-y-6 ">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Introduction
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Welcome to Red Panda School. This Privacy Policy outlines how we collect, use, and protect your personal information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Information We Collect
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                We collect various types of information in connection with the services we provide, including:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Personal identification information (Name, email address, phone number, etc.)</li>
                <li>Usage data (pages visited, time spent on the site, etc.)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                How We Use Your Information
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Log Files
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Red Panda School follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Cookies and Web Beacons
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Like any other website, Red Panda School uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Third Party Privacy Policies
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Red Panda School's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Changes to This Privacy Policy
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Red Panda School may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default PrivacyPolicy;