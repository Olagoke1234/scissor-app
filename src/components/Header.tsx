// src/components/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "../styles/styles.css";

const Header: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Scissor - URL Shortener</h1>
        <div className="nav-container">
          <div className="left-section">
            <Link to="/shortener" className="home-button">
              Home
            </Link>
            <Link to="/analytics" className="analytics-button">
              Analytics Dashboard
            </Link>
          </div>
          <div className="right-section">
            {auth.currentUser ? (
              <button onClick={handleSignOut} className="sign-out-button">
                Sign Out
              </button>
            ) : (
              <Link to="/" className="auth-link">
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
