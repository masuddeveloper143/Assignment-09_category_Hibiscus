import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {


  const { googleLogin } = useContext(AuthContext);


  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";





  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await loginUser(email, password);

      console.log(result.user);

      toast.success("🎉 Login Successful!");

      navigate(from);

    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };







  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      console.log(result.user);

      toast.success("🚀 Google Login Successful!");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };








  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl">

        <div className="card-body">

          <h1 className="text-4xl font-bold text-center text-primary">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Login to continue your journey
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Email
                </span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={"masud143@gmail.com"}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Password
                </span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                defaultValue={'MASUd143'}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Forget Password */}
            <div className="text-right">
              <Link
                to="/forget-password"
                className="text-primary font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Login
            </button>

          </form>

          <div className="divider">OR</div>

          {/* Google Login */}
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
            Continue With Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;