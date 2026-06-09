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
import UpdateProfile from "../pages/UpdateProfile";
import About from "../pages/About";
import Companies from "../Component/Companies";
import ForgetPassword from "../pages/ForgotPassword";
import PrivateRoute from "../Component/PrivateRoute";
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
                element: (
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                ),
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
                element: (
                    <PrivateRoute>
                        <CompanyDetails></CompanyDetails>
                    </PrivateRoute>
                )
            },

            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <MyProfile></MyProfile>
                    </PrivateRoute>
                )

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

            {
                path: "update-profile",
                element: (
                    <PrivateRoute>
                        <UpdateProfile />
                    </PrivateRoute>
                )
            },

            {
                path: "/about",
                element: (
                    <PrivateRoute>
                        <About />
                    </PrivateRoute>
                )
            },

            {
                path: "/companies",
                element: (
                    <PrivateRoute>
                        <Companies />
                    </PrivateRoute>
                )
            },

            {
                path: "/forget-password",
                element: <ForgetPassword></ForgetPassword>
            },



        ],

    },

])

export default router;