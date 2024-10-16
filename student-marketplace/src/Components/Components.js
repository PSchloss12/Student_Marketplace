import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from './Main/MainPage.js';
import ProductPage from './Product/ProductPage.js';
import SellerPage from './Seller/SellerPage.js';
import LoginPage from './Login/LoginPage.js';
import Header from './Header/Header.js';
import ProductDetailsPage from './Product/ProductDetails/ProductDetailsPage.js';

export default function Components() {
    return (
        <Router style="background-color: #8CBA80">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/products" element={<ProductPage/>} />
                <Route path="/product/:id" element={<ProductDetailsPage/>} />
                <Route path="/seller" element={<SellerPage/>} />
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
        </Router>
    );
}

