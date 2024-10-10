// This component selects the correct page to render and renders the header before the page
import {
  html,
  render,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.module.js";

import Header from "../Header/Header.js";
import SellerForm from "../Seller/SellerForm.js";
import LoginPage from "../Login/LoginPage.js";
import ProductPage from "../Product/ProductPage.js";
import MainPage from "./MainPage/MainPage.js";
import ItemPage from "../Product/ItemPage/ItemPage.js";

const Main = () => {
  const [currentView, setCurrentView] = useState("productPage");
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  // event handling for navigation
  const renderCurrentView = () => {
    switch (currentView) {
      case "mainPage":
        return html`<${MainPage}
          onNavigate=${(view, product) => {
            setCurrentView(view);
            if (view === "itemPage") setSelectedProduct(product);
          }}
        />`;
      case "productPage":
        return html`<${ProductPage}
          onNavigate=${(view, product) => {
            setCurrentView(view);
            if (view === "itemPage") {
              setSelectedProduct(product);
            }
          }}
        />`;
      case "sellerForm":
        return html`<${SellerForm} />`;
      case "login":
        return html`<${LoginPage} />`;
      case "itemPage":
        return html`<${ItemPage} product=${selectedProduct} />`;
      default:
        return html`<${MainPage} />`;
    }
  };

  return html`
    <div>
      <${Header} onNavigate=${setCurrentView} />

      <div class="main-content">${renderCurrentView()}</div>
    </div>
  `;
};

export default Main;
