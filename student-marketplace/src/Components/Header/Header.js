// This component will render the navigation bar or header for each page
import "./styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(!menuOpen)
  };

  return(
    <div className="topappbar">
      <div className="title">ND Marketplace</div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`navigation ${menuOpen ? "open" : ""}`}>
        <Link to="/">
          <button
            className="button-52"
            role="button"
          >
            Homepage
          </button>
        </Link>
        <Link to="/products">
          <button
            className="button-52"
            role="button"
          >
            View Products
          </button>
        </Link>
        <Link to="/seller">
          <button
            className="button-52"
            role="button"
          >
            List Item
          </button>
        </Link>
        <Link to="/listings">
          <button
            className="button-52"
            role="button"
          >
            Your Listings
          </button>
        </Link>
        <Link to="/auth">
          <button
            className="button-52"
            role="button"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;