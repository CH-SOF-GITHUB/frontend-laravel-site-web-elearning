import React, { useEffect, useState } from 'react'
import { Button } from './Button';
import '../css/Login.css'
// import  { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"
const Logout = () => {

    useEffect(() => {
        validateToken()
    }, []);
    // Redirect the user to the login page if no token is present
    async function validateToken() {
        var user = JSON.parse(localStorage.getItem('user-info'));
        if (user != null) {
            // Extract the token creation timestamp and expiration time
            const tokenIssuedAt = Math.floor(Date.now() / 1000) - (3600 - user.expires_in); // Approximate iat calculation
            const tokenExpiryTime = tokenIssuedAt + user.expires_in;
            const currentTime = Math.round(Date.now() / 1000);

            if (currentTime > tokenExpiryTime) {
                localStorage.removeItem('user-info');
                window.location.replace("/");
            }
            else{
                localStorage.removeItem('user-info');
                window.location.replace("/");
            }
        }
        else{
            window.location.replace("/");
        }
    }

    
    return (
        <>
        
        </>
    )
}

export default Logout
