// This component will render the navigation bar or header for each page
import "./styles.css";
import {Link} from "react-router-dom";

const Header = ({ onNavigate }) => {
  return(
    <div className="topappbar">
      <div className="title">ND Marketplace</div>
      <div className="navigation">
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
        <Link to="/login">
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