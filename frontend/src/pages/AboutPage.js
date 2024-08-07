import React from 'react';
import Navbar from '../components/Navbar';

function AboutPage() {
    return (
        <div>
            <Navbar navItems={[["Home", "/"], ["About", "/about"], ["FAQ", "/faq"]]} isLoggedIn={false} />
            <h1>ABOUT PAGE</h1>
        </div>
    )
}

export default AboutPage
