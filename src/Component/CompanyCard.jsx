import React from "react";

const CompanyCard = ({ company }) => {
    const {
        id,
        name,
        logo,
        location,
        industry,
    } = company;

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border">

            {/* Logo */}
            <div className="flex justify-center mb-4">
                <img
                    src={logo}
                    alt={name}
                    className="w-20 h-20 object-contain"
                />
            </div>

            {/* Company Info */}
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">
                    {name}
                </h2>

                <p className="text-gray-500 mt-2">
                    {industry}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                    📍 {location}
                </p>
            </div>

            {/* Button */}
            <div className="mt-5">
                <button className="btn btn-primary w-full rounded-xl">
                    View Details
                </button>
            </div>

        </div>
    );
};

export default CompanyCard;