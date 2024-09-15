import React, { useState } from 'react';
import telephoneOrange from '../assets/telephone-orange.jpg';
import Section from "../components/sharedComponents/Section";
import TermsOfService from './TermsOfService'; 


const Contact = () => {
  const [agreed, setAgreed] = useState(false);
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMessagePopupVisible, setIsMessagePopupVisible] = useState(false);
  
  
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  
  const toggleMessagePopup = () => {
    setIsMessagePopupVisible(!isMessagePopupVisible);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!agreed) {
      setError('You must agree to the terms and conditions');
      return;
    }
    setSuccess('Form submitted successfully');
    setError('');
    toggleMessagePopup(); 
  };




  return (
    <>
      <Section
        backgroundColor="orange"
        titleColor="white"
        textColor="white"
        image={telephoneOrange}
        title="Contact Us"
        text={"Get in touch with our creator friendly support team!"}
        imagePosition="left"
        imageSize={350}
      />

      <div className="relative isolate px-6 py-16 sm:py-20 lg:px-8">
        <div>
          <p className="text-center text-4xl text-[var(--color-black)]">Contact Form</p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                First name*
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                placeholder="First name*"
                className="field"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Last name*
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                placeholder="Last name*"
                className="field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Email address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address*"
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-[var(--color-black)]">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your message*"
                className="field pl-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center pt-5">
            <input
              id="agreed"
              name="agreed"
              type="checkbox"
              className="h-4 w-4 text-[var(--color-orange)] border-gray-300 rounded"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              aria-label="I agree to the terms and conditions"
            />
            <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <span
                className="cursor-pointer underline"
                onClick={togglePopup}
              >
                terms and conditions
              </span>
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="mt-6">
            <button type="submit" className="btn-fullwidth">
              Submit
            </button>
          </div>
        </form>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-48 md:pt-28">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={togglePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <TermsOfService />
          </div>
        </div>
      )}

      {isMessagePopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-48 md:pt-28">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative p-6">
            <button
              onClick={toggleMessagePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <p className="text-xl font-bold mb-4">Here is your message:</p>
            <p className="mb-4"><strong>Name:</strong> {firstName} {lastName}</p>
            <p className="mb-4"><strong>Email:</strong> {email}</p>
            <p className="mb-4"><strong>Message:</strong> {message}</p>
            <p className="text-red-500">But...We don't send emails with this test website :)</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;