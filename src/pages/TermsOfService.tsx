import React from 'react';
import logo from '../assets/logo.png';

const TermsOfService: React.FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center py-12 px-12 w-full max-w-screen-md min-h-screen mx-auto">
        <div>
          <img
            alt="Red Panda School"
            src={logo}
            className="mx-auto mt-6 h-28 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-dark-900">
            Terms of Service
          </h2>
        </div>

        
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Introduction
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Welcome to Red Panda School. These terms and conditions outline the rules and regulations for the use of our website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Intellectual Property Rights
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Other than the content you own, under these Terms, Red Panda School and/or its licensors own all the intellectual property rights and materials contained in this Website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Restrictions
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                You are specifically restricted from all of the following:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Publishing any Website material in any other media</li>
                <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
                <li>Publicly performing and/or showing any Website material</li>
                <li>Using this Website in any way that is or may be damaging to this Website</li>
                <li>Using this Website in any way that impacts user access to this Website</li>
                <li>Using this Website contrary to applicable laws and regulations</li>
                <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website</li>
                <li>Using this Website to engage in any advertising or marketing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Your Privacy
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Please read our Privacy Policy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Limitation of Liability
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                In no event shall Red Panda School, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Changes to These Terms
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Red Panda School is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
              </p>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default TermsOfService;