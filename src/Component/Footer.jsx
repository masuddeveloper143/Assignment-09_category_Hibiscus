import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid md:grid-cols-3 gap-10">

                    {/* Logo Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-blue-400">
                            JobTrack
                        </h2>

                        <p className="mt-4 text-gray-300">
                            Find your dream job from top companies around the world.
                            Explore opportunities and build your career with confidence.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-300">
                            <li>
                                <a className="hover:text-blue-400 cursor-pointer">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a className="hover:text-blue-400 cursor-pointer">
                                    Companies
                                </a>
                            </li>

                            <li>
                                <a className="hover:text-blue-400 cursor-pointer">
                                    About
                                </a>
                            </li>

                            <li>
                                <a className="hover:text-blue-400 cursor-pointer">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Follow Us
                        </h3>

                        <div className="flex gap-4">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:scale-110 transition"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:scale-110 transition"
                            >
                                <FaGithub />
                            </a>

                        </div>
                    </div>

                </div>

                <div className="border-t border-slate-700 mt-10 pt-6 text-center text-gray-400">
                    © 2026 JobTrack. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;