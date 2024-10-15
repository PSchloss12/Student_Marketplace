// This component will render the navigation bar or header for each page
import "./styles.css"

const Header = ({ onNavigate }) => {
  return(
    <div class="topappbar">
      <div class="title">ND Marketplace</div>
      <div class="navigation">
        <button
          class="button-52"
          role="button"
          onClick={() => onNavigate("mainPage")}
        >
          Homepage
        </button>
        <button
          class="button-52"
          role="button"
          onClick={() => onNavigate("productPage")}
        >
          View Products
        </button>
        <button
          class="button-52"
          role="button"
          onClick={() => onNavigate("sellerForm")}
        >
          List Item
        </button>
        <button
          class="button-52"
          role="button"
          onClick={() => {
            onNavigate("login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
