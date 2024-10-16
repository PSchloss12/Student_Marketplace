import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
  return (
    <div className="topappbar">
      <div className="title">ND Marketplace</div>
      <div className="navigation">
        <Link to="/" className="button" role="button">
          Homepage
        </Link>
        <Link to="/products" className="button" role="button">
          View Products
        </Link>
        <Link to="/seller" className="button" role="button">
          List Item
        </Link>
        <Link to="/login" className="button" role="button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;