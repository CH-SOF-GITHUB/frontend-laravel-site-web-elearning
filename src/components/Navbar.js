import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import '../css/Navbar.css';
import axios from 'axios';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isloginned, setLoginStatus] = useState(false);
    const [user, setUser] = useState(null);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const checkLogin = () => {
        var storedUser = JSON.parse(localStorage.getItem('user-info'));

        if (storedUser != null) {
            // Get current timestamp
            const current = Math.round(Date.now() / 1000);

            // Calculate token expiration based on 'expires_in' value
            const tokenIssuedAt = Math.floor(Date.now() / 1000) - (3600 - storedUser.expires_in);
            const tokenExpiryTime = tokenIssuedAt + storedUser.expires_in;

            // Check if token has expired
            if (current > tokenExpiryTime) {
                setLoginStatus(false);
                localStorage.removeItem('user-info');
                setUser(null);  // Clear user data
            } else {
                setLoginStatus(true);
                setUser(storedUser);  // Set user data
            }
        } else {
            setLoginStatus(false);
            setUser(null);  // Clear user data if not logged in
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    /* Dropdown menu handling */
    const myFunction = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    };

    window.onclick = function (event) {
        if (!event.target.matches('.circle') || event.target.parentNode.matches('.circle')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <Link to="/" className="navbar-logo">
                        LetsProgramify
                    </Link>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                {!button && <i className="fas fa-home"></i>}Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/courses" className="nav-links" onClick={closeMobileMenu}>
                                {!button && <i className="fas fa-book"></i>}Courses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-links" onClick={closeMobileMenu}>
                                {!button && <i className="fas fa-blog"></i>}Blog
                            </Link>
                        </li>
                    </ul>
                    <div className="nav-menu-right">
                        <i className="fas fa-search"></i>
                        <i className="far fa-bell"></i>
                        <Link to="/login" className="login-link">
                            {button && !isloginned && <Button buttonStyle="btn--secondary" to="/login">Login</Button>}
                        </Link>
                        <Link to="/signup" className="signup-link">
                            {button && !isloginned && <Button>Signup</Button>}
                        </Link>
                        <div className="dropdown">
                            {isloginned && user && <button className="circle" onClick={myFunction}>{user.user.name[0]}</button>}
                            {!isloginned && !button && <button className="circle" onClick={myFunction}><i className="fas fa-user"></i></button>}
                            <div id="myDropdown" className="dropdown-content">
                                {!isloginned && <Link to="/login" className="login-link">Login</Link>}
                                {!isloginned && <Link to="/signup" className="login-link">Sign Up</Link>}
                                {isloginned && <Link to="/instructor/mycourses" className="login-link">Instructor</Link>}
                                {isloginned && <Link to="/myaccount" className="login-link">My Account</Link>}
                                {isloginned && <Link to="/logout" className="login-link">Logout</Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;