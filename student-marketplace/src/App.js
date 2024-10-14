import logo from './logo.svg';
import './App.css';
import MainPage from './Components/Main/MainPage.js';
import Parse from "parse";
import * as ENV from "./environment.js"
import SellerForm from './Components/Seller/SellerForm';
import LoginPage from './Components/Login/LoginPage';
import ProductPage from './Components/Product/ProductPage';

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;

function App() {
  return (
    <div className="App">
      {/* <LoginPage /> */}
      {/* <SellerForm /> */}
      <MainPage />
      {/* <ProductPage /> */}

    </div>
  );
}

export default App;
