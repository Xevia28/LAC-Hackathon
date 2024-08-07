import React from 'react';
import { Link } from 'react-router-dom';
import "../css/navbar.css";
import logo from "../images/logo512.png";

const Navbar = ({ navItems, isLoggedIn }) => {
    function onLogout(e) { e.preventDefault() }
    return (
        <nav>
            <img src={logo} height={50} alt='logo' />
            <ul>
                {navItems.map(([name, path], index) => (
                    <li key={index}>
                        <Link to={path}>{name}</Link>
                    </li>
                ))}
            </ul>
            <div>
                {isLoggedIn ? (
                    <button onClick={onLogout}>Log Out</button>
                ) : (
                    <>
                        <Link to="/signup">
                            <button>Sign Up</button>
                        </Link>
                        <Link to="/login">
                            <button>Sign In</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;