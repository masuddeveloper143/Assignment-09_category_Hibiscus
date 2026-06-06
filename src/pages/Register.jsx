import React from "react";
import { Link } from "react-router";

const Register = () => {


    if (!/[A-Z]/.test(password)) {
        return alert("Must contain an uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
        return alert("Must contain a lowercase letter");
    }

    if (password.length < 6) {
        return alert("Password must be at least 6 characters");
    }


    return (







        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 mt-5">

            <div className="card w-full max-w-md bg-base-100 shadow-2xl">

                <div className="card-body">

                    <h1 className="text-4xl font-bold text-center text-primary mb-2">
                        Create Account
                    </h1>

                    <p className="text-center text-gray-500 mb-6">
                        Join JobTrack and find your dream job
                    </p>

                    <form className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Full Name
                                </span>
                            </label>

                            <input
                                type="text"
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