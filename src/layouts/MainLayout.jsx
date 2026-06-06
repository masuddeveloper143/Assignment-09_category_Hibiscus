import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const MainLayout = () => {
    return (
        <>

            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </>
    );
};

export default MainLayout;