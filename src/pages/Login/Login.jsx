import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { GiShakingHands } from "react-icons/gi";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn, googleSignIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log("Logged in user:", user);
        toast.success('Sign in successfully');
        form.reset();
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid email or password ");
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        toast.success('Google Sign in successfully');
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google Sign in failed ");
        setError(error.message);
      });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        <div className="flex items-center justify-center text-3xl mb-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mr-2">
          Welcome Back 
        </h2>
        <GiShakingHands className="text-yellow-500 mt-4"/>
        </div>


        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          {/* Forget Password */}
          <div className="text-right">
            <Link
              to="/auth/forget-password"
              className="text-sm text-indigo-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md cursor-pointer"
          >
            Sign In
          </button>
        </form>


        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition duration-300 cursor-pointer"
        >
          <FcGoogle className="text-2xl" />{" "}
          <span className="font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
