// This will be a landing page for users that will be customized if a user is logged in
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Parse from "parse";
import ProductItem from "../Product/ProductItem/ProductItem";
import { getFavorites } from "../../Services/Products";
import './styles.css';

  const MainPage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
  
    var currUser = Parse.User.current(); 
  
    useEffect(() => {
      // check if featuredProducts already exists
      if (featuredProducts?.length>0) {
        setFeaturedProducts(featuredProducts)
      } else {
        // Fetch the favorites for the current user
        getFavorites(currUser?.id).then((data) => {
        setFeaturedProducts(data);
        });
    }
    }, [currUser]); 
    return (
      <div className="main-page">
        <header className="main-page-header">
          <h1>Welcome to ND Marketplace</h1>
          <p>The place to shop for all your college needs!</p>
        </header>
        <section className="featured-products-section">
          <h2>Featured Products</h2>
          <div className="product-listings">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`} 
                state={ {
                  "category" : product.get("category"),
                  "description" : product.get("description"),
                  "isAvailable" : product.get("isAvailable"),
                  "price" : product.get("price"),
                  "sellerId" : product.get("sellerId"),
                  "title" : product.get("title"),
                  "imgUrls" : product.get("imgUrls"),
                } }
                className="listing"
              >
                <div
                  style={{ cursor: "pointer" }}
                >
                  <ProductItem
                    title={product.get("title")}
                    price={product.get("price")}
                    images={product.get("imgUrls")}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  };
  
  export default MainPage;
  