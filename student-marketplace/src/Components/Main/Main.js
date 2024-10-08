// This will be a landing page for users that will be customized if a user is logged in
import {useEffect, useState} from "react";
  
//   import ProductItem from "../../Product/ProductItem.js";
//   import { getFavorites } from "../../../Services/getFavorites.js";
  
  const MainPage = ({ onNavigate }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
  
    var currUser = 2; // default user id for now - TODO: replace in future with id of user that is logged in
  
    useEffect(() => {
      console.log("render favorites");
      // call getFavorites service
      getFavorites(currUser).then((data) => {
        setFeaturedProducts(data);
      });
    }, []);
  
    const navigateToItemPage = (product) => {
      // handles navigation to item page when clicked
      onNavigate("itemPage", product);
    };
  
    return (
      <div class="main-page">
        <header class="main-page-header">
          <h1>Welcome to ND Marketplace</h1>
          <p>The place to shop for all your college needs!</p>
        </header>
        <section class="main-page-featured-products">
          <h2>Featured Products</h2>
          <div class="main-page-product-listings">
            ${featuredProducts.map(
              (product) => (
                <div
                  onClick={() => navigateToItemPage(product)}
                  style="cursor: pointer;"
                >
                  <ProductItem
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                  />
                </div>
              )
            )}
          </div>
        </section>
      </div>
    );
  };
  
  export default MainPage;
  