import React, { useEffect, useState } from "react";
import CompanyCard from "../Component/CompanyCard";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("/companies.json")
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold">
          Our Partner Companies
        </h1>

        <p className="text-gray-500 mt-4">
          Explore companies and discover exciting career opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {
          companies.map(company => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          ))
        }

      </div>

    </div>
  );
};

export default Companies;