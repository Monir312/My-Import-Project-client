import React from "react";
import { Link } from "react-router";
import { FaSadTear } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4 text-center">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg">
        <FaSadTear className="text-6xl text-purple-500 mx-auto mb-4 animate-bounce" />
        <h1 className="text-6xl font-extrabold text-purple-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition duration-300 font-semibold"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};


export default ErrorPage;


