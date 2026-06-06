import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Logo */}
        <div className="navbar-start">
          <a className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <FaBriefcase />
            JobTrack
          </a>
        </div>

        {/* Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 font-medium">
            <li>
              <NavLink to="/"><a>Home</a></NavLink>
            </li>

            <li>
              <NavLink to="/company">Companies</NavLink>
            </li>

            <li>
              <a>About</a>
            </li>

            <li>
              <a>My Profile</a>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2">
          <NavLink to="/login" className="btn btn-outline btn-primary">
            Login
          </NavLink>

          <NavLink to="/register" className="btn btn-primary">
            Register
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default Navbar;