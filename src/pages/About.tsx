import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function About() {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        {user && (
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Timer
          </Link>
        )}
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to provide a simple and intuitive platform for creating and sharing countdown timers. Whether you're counting down to a special event, a project deadline, or just a personal milestone, we're here to help you keep track of time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-700">
            We are a small, passionate team of developers and designers who love building tools that make life easier. Our goal is to create a seamless experience for our users, and we're constantly working to improve our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions, feedback, or just want to say hello, feel free to reach out to us at <a href="mailto:support@countdownapp.com" className="text-blue-500 hover:underline">support@countdownapp.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}