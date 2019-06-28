import React from 'react'
import Navbar from '../components/NavbarHeader';
import HomePage from '../components/Homepage';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className='d-flex justify-content-center align-items-center' style={{ height:'90vh' }}>
                <HomePage />
            </div>
        </>
    )
}
