import CompanyCard from "../CompanyCard";

const TestCard = () => {

    const company = {
        id: 1,
        name: "Google",
        logo: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
        location: "California",
        industry: "Technology"
    };

    return <CompanyCard company={company} />;
};

export default TestCard;