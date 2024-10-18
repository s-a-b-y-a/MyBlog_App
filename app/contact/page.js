"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Contact = () => {
  const [status, setStatus] = useState('');
  const router = useRouter(); // Use Next.js router

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 200) {
      setStatus(result.message);
      // Redirect to another page after successful form submission
      router.push('/thank-you'); // Adjust this path to your desired page
    } else {
      setStatus(result.message || 'Failed to send message.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8">
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-black sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-black sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-black sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-black sm:text-sm"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </div>
        </form>
        {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold">Contact Details</h2>
        <p className="mt-2 text-gray-600">Email: sabyas2004@gmail.com</p>
        <p className="text-gray-600">Phone: +91 8595868702</p>
        <p className="text-gray-600">Address: A-695, G.D. Mayur Vihar Phase 3, Delhi 110096</p>
      </div>
    </div>
  );
};

export default Contact;
