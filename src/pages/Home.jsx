import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Home/sidebar';
const Home = () => {
    return (
    <>
        <div className="centered-container">
            <div className='sidebar'>
                <Sidebar/>
            </div> 
        </div>
    </>
    );
};

export default Home;