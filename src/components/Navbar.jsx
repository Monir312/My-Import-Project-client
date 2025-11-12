import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import { FaBars, FaUserCircle } from "react-icons/fa";
import logoImg from '../assets/logo.png'
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : ""}>Home</NavLink>
      </li>

      {
        user && <>
          <li><NavLink to="/all-products" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : ""}>Products</NavLink></li>
          <li><NavLink to="/my-imports" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : ""}>My Imports</NavLink></li>
          <li><NavLink to="/add-product" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : ""}>Add Product</NavLink></li>
          
        </>
      }
      <li><NavLink to="/about-us" className={({ isActive }) => isActive ? "text-pink-500 font-semibold" : ""}>About</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-4 md:px-12 py-3 shadow-md sticky top-0 z-50 backdrop-blur-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <FaBars className="text-2xl text-gray-700" />

          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>


        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="FoodXport Logo"
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold text-pink-600">FoodXport</span>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 text-gray-700 text-lg">{navLinks}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>

            <div
              data-tooltip-id="user-tooltip"
              data-tooltip-content={user?.displayName || "User"}
            >
              {user.photoURL ? (
                <Link to='/profile' className="cursor-pointer">
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-10 h-10 rounded-full border-2 border-pink-400 hover:scale-105 transition"
                  />
                </Link>
              ) : (
                <FaUserCircle className="text-3xl text-gray-500" />
              )}
            </div>
            <Tooltip id="user-tooltip" place="bottom" />
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth/login" className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
