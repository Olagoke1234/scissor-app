import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Header: React.FC = () => {
  return (
    <header className="App-header">
      <h1>Scissor - URL Shortener</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/qr-code">QR Code Generator</Link>
          </li> */}
          <li>
            <Link to="/analytics">Analytics Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
