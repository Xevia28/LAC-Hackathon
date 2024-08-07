import React from 'react';
import Navbar from '../components/Navbar';

function FAQPage() {
    return (
        <div>
            <Navbar navItems={[["Home", "/"], ["About", "/about"], ["FAQ", "/faq"]]} isLoggedIn={false} />
            <h1>FAQ</h1>
        </div>
    )
}

export default FAQPage
