// ProductPage will display products for users to browse
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ProductItem from "./ProductItem/ProductItem.js";
import { getAllProducts } from "../../Services/Products.js";
import './styles.css';

const ProductPage = () => {
  const [category, setCategory] = useState("all");
  const [priceLimit, setPriceLimit] = useState("");
  const [seller, setSeller] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSellerIds, setShowSellerIds] = useState(false);

  var filtered = false;

  // Fetch all products
  useEffect(() => {
    if (products?.length > 0) {
      setProducts(products);
    } else {
      getAllProducts().then((data) => {
        setProducts(data);
        if (!filtered) {
          setFilteredProducts(data);
        }
      });
    }
  }, []);

  const clearFilters = () => {
    setCategory('all');
    setPriceLimit('');
    setSeller('');
    setFilteredProducts(products);
  };

  const filterProducts = () => {
    var result = [];
    setShowSellerIds(false);
    for (const product of products) {
      if (priceLimit == '' || product.get('price') <= priceLimit) {
        if (category == 'all' || product.get('category') == category || product.get('category').includes(category)) {
          if (seller == '' || product.get('sellerId')['id'] == seller) {
            result.push(product);
          }
        }
      }
    }
    setFilteredProducts(result);
  };

  function toggleSellerIds() {
    setShowSellerIds(!showSellerIds);
  }

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

        <label className="filter-label" htmlFor="seller">Seller ID:</label>
        <input
          className="filter-input"
          type="text"
          id="seller"
          placeholder="Enter Seller ID"
          value={seller}
          onInput={(e) => setSeller(e.target.value)}
          onClick={() => toggleSellerIds()}
        />

        <button className="product-filter-button" onClick={filterProducts}>Filter</button>
        <button className="product-clear-button" onClick={clearFilters}>Clear</button>
      </div>
      <hr />
      <div className="product-listings">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to="/product/1"
            state={{
              category: product.get("category"),
              description: product.get("description"),
              isAvailable: product.get("isAvailable"),
              price: product.get("price"),
              sellerId: product.get("sellerId"),
              title: product.get("title"),
              imgUrl: product.get("imgUrl"),
            }}
            className="listing"
          >
            <div style={{ cursor: "pointer" }}>
              <ProductItem
                title={product.get("title")}
                price={product.get("price")}
                image={product.get("imgUrl")?.url()} // Ensure url() is called here
                sellerId={showSellerIds ? product.get("sellerId")["id"] : null}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;