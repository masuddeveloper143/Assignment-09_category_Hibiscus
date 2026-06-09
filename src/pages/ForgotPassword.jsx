import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const ForgetPassword = () => {




  // const { resetPassword } = useContext(AuthContext);

  // const handleReset = () => {
  //   resetPassword(email)
  //     .then(() => {
  //       alert("Password reset email sent");
  //     })
  //     .catch(console.log);
  // };




  const handleResetPassword = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    try {
      await resetPassword(email);

      alert("Password reset email sent");

      window.location.href = "https://mail.google.com";

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl">

        <div className="card-body">

          <h1 className="text-4xl font-bold text-center text-primary">
            Reset Password
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Enter your email to reset your password
          </p>

          <form
            onSubmit={handleResetPassword}
            className="space-y-4"
          >

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Email Address
                </span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Reset Password
            </button>

          </form>

          <p className="text-center mt-4">
            Back to{" "}
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

export default ForgetPassword;