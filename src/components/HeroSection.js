/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import "../css/HeroSection.css";
import { Link } from "react-router-dom";
function HeroSection(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = () => {
    // Check user login status from localStorage
    const user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      // Validate token expiration
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - user.expires_in); // Approximate iat calculation
      const tokenExpiryTime = tokenIssuedAt + user.expires_in;
      const currentTime = Math.round(Date.now() / 1000);

      if (currentTime < tokenExpiryTime) {
        setIsLoggedIn(true); // User is logged in
      } else {
        localStorage.removeItem("user-info"); // Remove expired token
        setIsLoggedIn(false);
      }
    }
  };

  return (
    <div className="hero-container">
      <img src="/images/banner1.png" className="hero-container-img" />
      <h1>The Only Place for Programming Hustlers!</h1>
      {isLoggedIn ? (
        <p className="p-5">You are already logged in! Explore our features.</p>
      ) : (
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--calltoaction"
            buttonSize="btn--large"
          >
            <Link className="btnsLink" to={props.path}>
              GET STARTED
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
