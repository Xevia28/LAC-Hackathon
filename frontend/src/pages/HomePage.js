import React from 'react';
import Navbar from '../components/Navbar';

function HomePage() {
    return (
        <div>
            <Navbar navItems={[["Home", "/"], ["About", "/about"], ["FAQ", "/faq"]]} isLoggedIn={false} />
            <h1>HOME PAGE</h1>
        </div>
    )
}

export default HomePage
