import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";


const Register = () => {

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const navigate = useNavigate();


  // handleRegister Function

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Password Validation

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await createUser(email, password);

      await updateUserProfile(name, photoURL);

      console.log(result.user);

      toast.success("✅ Registration Successful!");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };





  return (

    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 ">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl mt-10">

        <div className="card-body">

          <h1 className="text-4xl font-bold text-center text-primary mb-2">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Join JobTrack and find your dream job
          </p>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Full Name
                </span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Email
                </span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Photo URL
                </span>
              </label>

              <input
                type="text"
                name="photoURL"
                placeholder="Paste photo URL"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Password
                </span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
            >
              Register
            </button>

          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          <button className="btn btn-outline w-full">
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;