// This will be a landing page for users that will be customized if a user is logged in
import {
    useState,
    useEffect,
  } from "react";
  
  import ProductItem from "../Product/ProductItem/ProductItem";
  import { getFavorites } from "../../Services/Products";
  
  const MainPage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
  
    var currUser = 'dJcfo4qvL2'; // hardcoded user id for now
  
    useEffect(() => {
      // Fetch the favorites for the current user
      getFavorites(currUser).then((data) => {
        setFeaturedProducts(data);
      });
    }, [currUser]); // Add currUser as a dependency so it reruns if the user changes
  
    const navigateToItemPage = (product) => {
      // Handles navigation to the item page when clicked
      // TODO: Implement navigation logic here
      console.log("Navigate to product:", product);
    };
  
    return (
      <div className="main-page">
        <header className="main-page-header">
          <h1>Welcome to ND Marketplace</h1>
          <p>The place to shop for all your college needs!</p>
        </header>
        <section className="main-page-featured-products">
          <h2>Your Favorite Products</h2>
          <div className="main-page-product-listings">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigateToItemPage(product)}
                style={{ cursor: "pointer" }}
              >
                <ProductItem
                  key={product.id}
                  title={product.get("title")}
                  price={product.get("price")}
                  image={product.get("imgUrl")?.url()}
                  category={product.get("category")}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };
  
  export default MainPage;
  