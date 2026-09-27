import React from 'react';
import { Link, Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';


const RootLayout = () => {
    return (
        <div className='zip-site-frame'>
            <div className="zip-announcement">
                <span aria-hidden="true" className="zip-announcement-dot" />
                <span>Thoughtful delivery, from pickup to doorstep.</span>
                <Link to="/coverage">View coverage</Link>
            </div>
            <Navbar />
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default RootLayout;