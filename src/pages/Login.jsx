import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-30">
            <div className="card-body">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p className="text-center mt-4">
                        don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-semibold"
                        >
                            register
                        </Link>
                    </p>
                </fieldset>
            </div>
        </div>
    );
};

export default Login;