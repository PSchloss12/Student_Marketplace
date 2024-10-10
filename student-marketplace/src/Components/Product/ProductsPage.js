// ProductPage will display products for users to browse
import {
    useState,
    useEffect,
  } from "react";
  
  import ProductItem from "./ProductItem/ProductItem.js";
  import { getProducts } from "../../Services/Products.js";
  
  const ProductPage = ({ onNavigate }) => {
    const [category, setCategory] = useState("dormEssentials");
    const [priceLimit, setPriceLimit] = useState("");
    const [products, setProducts] = useState([]);
  
    // call getProducts service
    useEffect(() => {
      console.log("render products");
      getProducts().then((data) => {
        setProducts(data);
      });
    }, []);
  
    const handleFilter = () => {
      console.log("Selected Category:", category);
      console.log("Price Limit:", priceLimit);
      // TODO: add filtering logic
    };
    const navigateToItemPage = (product) => {
      // Set the current view to the ItemPage and pass the selected product
      onNavigate("itemPage", product);
    };
  
    return (
      <div class="product-page">
        <h1 class="product-title">Browse Listings</h1>
        <div class="product-filter-section">
          <label class="filter-label" for="category">Select Category:</label>
          <select
            class="filter-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="dormEssentials">All</option>
            <option value="dormEssentials">Dorm Essentials</option>
            <option value="tickets">Tickets</option>
            <option value="electronics">Electronics</option>
            <option value="textbooks">Textbooks</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
  
          <label class="filter-label" for="priceLimit">Price Limit ():</label>
          <input
            class="filter-input"
            type="number"
            id="priceLimit"
            placeholder="Enter Price Limit"
            value={priceLimit}
            onInput={(e) => setPriceLimit(e.target.value)}
          />
  
          <button class="filter-button" onClick={handleFilter}>Filter</button>
        </div>
        <hr />
        <div class="product-listings">
          {products.map(
            (product) => (
              <div
                onClick={() => navigateToItemPage(product)}
                style="cursor: pointer;"
              >
                <{ProductItem}
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
      </div>
          );
  };
  export default ProductPage;
  