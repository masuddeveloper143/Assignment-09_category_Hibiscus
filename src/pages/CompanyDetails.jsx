import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobCard from "../Component/JobCard";

const CompanyDetails = () => {
    const { id } = useParams();

    const [company, setCompany] = useState(null);

    useEffect(() => {
        fetch("/companies.json")
            .then((res) => res.json())
            .then((data) => {
                const singleCompany = data.find(
                    (company) => company.id === parseInt(id)
                );

                setCompany(singleCompany);
            });
    }, [id]);

    if (!company) {
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-bold">
                    Company Not Found
                </h1>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Company Info Card */}
            <div className="bg-white rounded-3xl shadow-lg border p-8">

                <div className="flex flex-col md:flex-row gap-8 items-center">

                    <img
                        src={company.logo}
                        alt={company.name}
                        className="w-32 h-32 object-contain"
                    />

                    <div>
                        <h1 className="text-4xl font-bold">
                            {company.name}
                        </h1>

                        <p className="text-lg text-gray-500 mt-2">
                            {company.industry}
                        </p>

                        <p className="text-gray-600 mt-2">
                            📍 {company.location}
                        </p>

                        <a
                            href={company.website}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary mt-5"
                        >
                            Visit Website
                        </a>
                    </div>

                </div>

            </div>

            {/* Jobs Section */}

            <div className="mt-12">

                <h2 className="text-3xl font-bold mb-8">
                    Available Jobs
                </h2>

                <div className="space-y-6">

                    {
                        company.jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                            />
                        ))
                    }

                </div>

            </div>

        </div>
    );
};

export default CompanyDetails;