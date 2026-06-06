import React, { useEffect, useState } from 'react';
import CompanyCard from '../Component/CompanyCard';

const Home = () => {

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch("/companies.json")
            .then(res => res.json())
            .then(data => setCompanies(data));
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-12">

            <h1 className="text-4xl font-bold text-center mb-10">
                Top Companies
            </h1>

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

export default Home;