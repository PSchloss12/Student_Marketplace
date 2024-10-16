// ProductPage will display products for users to browse
import { useState, useEffect } from "react";
import ProductItem from "./ProductItem/ProductItem.js";
import { getAllProducts } from "../../Services/Products.js";
import './styles.css';
import ProductDetailsPage from "./ProductDetails/ProductDetailsPage.js";

const ProductPage = () => {
  const [category, setCategory] = useState("all");
  const [priceLimit, setPriceLimit] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data); // Initialize filteredProducts with all products
    });
  }, []);

  const handleFilter = () => {
    let filtered = products;

    // Filter by category if it's not 'all'
    if (category !== "all") {
      filtered = filtered.filter((product) => {
        const productCategories = product.get("category").split(",").map(cat => cat.trim().toLowerCase());
        return productCategories.includes(category.toLowerCase());
      });
    }

    // Filter by price limit if a valid number is entered
    if (priceLimit) {
      const priceLimitNumber = parseFloat(priceLimit);
      if (!isNaN(priceLimitNumber)) {
        filtered = filtered.filter(
          (product) => product.get("price") <= priceLimitNumber
        );
      }
    }

    setFilteredProducts(filtered);
  };

  const navigateToItemPage = (product) => {
    // Set the current view to the ItemPage and pass the selected product - 
    // add routing to ProductDetailsPage here in the future
  };

  return (
    <div className="product-page">
      <h1 className="product-title">Browse Listings</h1>
      <div className="product-filter-section">
        <label className="filter-label" htmlFor="category">Select Category:</label>
        <select
          className="filter-select"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="dormEssentials">Dorm Essentials</option>
          <option value="tickets">Tickets</option>
          <option value="electronics">Electronics</option>
          <option value="textbooks">Textbooks</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>

        <label className="filter-label" htmlFor="priceLimit">Price Limit ($):</label>
        <input
          className="filter-input"
          type="number"
          id="priceLimit"
          placeholder="Enter Price Limit"
          value={priceLimit}
          onInput={(e) => setPriceLimit(e.target.value)}
        />

        <button className="product-filter-button" onClick={handleFilter}>Filter</button>
      </div>
      <hr />
      <div className="product-listings">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigateToItemPage(product)}
              style={{ cursor: "pointer" }}
            >
              <ProductItem
                title={product.get("title")}
                price={product.get("price")}
                image={product.get("imgUrl")?.url()}
              />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;