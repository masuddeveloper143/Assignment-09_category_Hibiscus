import React from "react";

const JobCard = ({ job, handleOpenModal }) => {
    const {
        title,
        location,
        salary,
        jobType,
    } = job;

    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {title}
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        <span className="badge badge-primary badge-outline">
                            {jobType}
                        </span>

                        <span className="badge badge-success badge-outline">
                            📍 {location}
                        </span>

                    </div>
                </div>

                <div className="text-left md:text-right">

                    <h3 className="text-xl font-bold text-green-600">
                        {salary}
                    </h3>

                    <p className="text-gray-500 text-sm">
                        Salary Range
                    </p>

                </div>

            </div>

            <div className="mt-6">
                <button
                    onClick={() => handleOpenModal && handleOpenModal(job)}
                    className="btn btn-primary w-full md:w-auto"
                >
                    View Details
                </button>
            </div>

        </div>
    );
};

export default JobCard;