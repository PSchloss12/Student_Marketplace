import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from './Main/MainPage.js';
import ProductPage from './Product/ProductPage.js';
import SellerPage from './Seller/SellerPage.js';
import AuthPage from './Auth/AuthPage.js';
import Header from './Header/Header.js';
import ProductDetailsPage from './Product/ProductDetails/ProductDetailsPage.js';
import ProtectedRoute from '../Services/ProtectedRoute.js';
import { Navigate } from 'react-router-dom';
import AuthRedirect from '../Services/AuthRedirect.js';



// added protected routes to productdetailpage and sellerpage
export default function Components() {
    return (
        <Router style="background-color: #8CBA80;">
            <Header/>
            <br/>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/products" element={<ProductPage/>} />
                <Route path="/product/:id" element={<ProtectedRoute element={ProductDetailsPage} />} /> 
                <Route path="/seller" element={<ProtectedRoute element={SellerPage} />} />
                <Route path="/auth" element={<AuthRedirect element={AuthPage} />} />
                <Route path="*" element={<Navigate to="/auth" replace />} /> 
            </Routes>
            <br/>
        </Router>
    );
}

