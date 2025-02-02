// ProductPage will display products for users to browse
import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Link } from 'react-router-dom';
import ProductItem from "./ProductItem/ProductItem.js";
import { getAvailableProducts } from "../../Services/Products.js";
import './styles.css';

const ProductPage = () => {
  const [category, setCategory] = useState("all");
  const [priceLimit, setPriceLimit] = useState("");
  const [seller, setSeller] = useState("");
  const [products, setProducts] = useState([]);
  const [showSellerNames, setShowSellerIds] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [jsonProducts, setJsonProducts] = useState([]);

  // get only available products from the database
  useEffect(() => {
    getAvailableProducts()
      .then((data) => {
        const s = data.sort((a, b) => a.attributes.price - b.attributes.price);
        setProducts(s);
        setFilteredProducts(s);
        setObjectList(s);
      })
      .catch((error) => console.error("Error fetching available products:", error));
  }, []);

  // Convert products to plain objects for use in autocomplete
  const setObjectList = (data) => {
    const result = data.map((product) => {
      const obj = product.toJSON();
      obj.id = product.id;
      return obj;
    });
    setJsonProducts(result);
  };

  // Filter products based on search input
  const fetchSuggestions = (searchTerm) => {
    const prods = products.filter((product) =>
      String(product.get("description")).toLowerCase().includes(String(searchTerm).toLowerCase()) ||
      String(product.get("title")).toLowerCase().includes(String(searchTerm).toLowerCase())
    );
    setFilteredProducts(prods);
  };

  // Filter products by selected search item
  const handleOnSelect = (search) => {
    const result = products.filter((product) => String(product.get("title")).toLowerCase() === String(search).toLowerCase());
    setFilteredProducts(result);
  };

  const clearFilters = () => {
    setCategory("all");
    setPriceLimit("");
    setSeller("");
    setFilteredProducts(products);
  };

  const filterProducts = () => {
    const result = products.filter((product) => {
      const matchesPrice = !priceLimit || product.get("price") <= priceLimit;
      const matchesCategory = category === "all" || product.get("category") === category || product.get("category").includes(category);
      const matchesSeller = !seller || product.get("sellerUsername").includes(seller);

      return matchesPrice && matchesCategory && matchesSeller;
    });
    setFilteredProducts(result.sort((a, b) => a.attributes.price - b.attributes.price));
  };

  const toggleSellerNames = () => setShowSellerIds(!showSellerNames);

  const formatResult = (item) => (
    <>
      <span style={{ display: "block", textAlign: "left" }}>{item.title}</span>
    </>
  );

  return (
    <div className="product-page">
      <h1 className="product-title">Browse Listings</h1>
      <div className="search-bar-container">
        <ReactSearchAutocomplete
          items={jsonProducts}
          resultStringKeyName="title"
          fuseOptions={{
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: ["title", "description"],
          }}
          onSearch={fetchSuggestions}
          onSelect={(item) => handleOnSelect(item.title)}
          autoFocus
          formatResult={formatResult}
        />
      </div>
      <hr />
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
          <option value="books">Textbooks</option>
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

        <label className="filter-label" htmlFor="seller">Seller:</label>
        <input
          className="filter-input"
          type="text"
          id="seller"
          placeholder="Enter Seller Username"
          value={seller}
          onInput={(e) => setSeller(e.target.value)}
          onClick={toggleSellerNames}
        />

        <button className="product-filter-button" name="filter" onClick={filterProducts}>Filter</button>
        <button className="product-clear-button" name="clear" onClick={clearFilters}>Clear</button>
      </div>
      <hr />
      <div className="product-listings">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            state={{
              category: product.get("category"),
              description: product.get("description"),
              isAvailable: product.get("isAvailable"),
              price: product.get("price"),
              title: product.get("title"),
              imgUrls: product.get("imgUrls"),
              sellerName: product.get("sellerUsername"),
            }}
            className="listing"
          >
            <ProductItem
              title={product.get("title")}
              price={product.get("price")}
              images={product.get("imgUrls")}
              sellerUsername={showSellerNames ? product.get("sellerUsername") : null}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;