import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import { Children } from "react";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Register from "../pages/Register";
import CompanyDetails from "../pages/CompanyDetails";
import MyProfile from "../pages/MyProfile";
import Login from "../pages/Login";
import TestCard from "../Component/TestCard/TestCard";
// import CompanyCard from "../Component/CompanyCard";
// import JobCard from "../Component/JobCard";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,


        children: [
            {
                index: true,
                element: <Home></Home>,
            },

            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "company/:id",
                element: <CompanyDetails></CompanyDetails>
            },
            {
                path: "profile",
                element: <MyProfile></MyProfile>
            },
            // {
            //     path: "/companyCard",
            //     element: <CompanyCard></CompanyCard>
            // },

            {
                path: "/test",
                element: <TestCard></TestCard>
            },

            // {
            //     path: "jobcard",
            //     element: <JobCard></JobCard>
            // }

        ],

    },

])

export default router;