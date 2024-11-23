// ProductPage will display products for users to browse
import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Link } from 'react-router-dom';
import ProductItem from "./ProductItem/ProductItem.js";
import { getAllProducts } from "../../Services/Products.js";
import './styles.css';

const ProductPage = () => {
  const [category, setCategory] = useState("all");
  const [priceLimit, setPriceLimit] = useState("");
  const [seller, setSeller] = useState("");
  const [products, setProducts] = useState([]);
  const [showSellerIds, setShowSellerIds] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [jsonProducts, setJsonProducts] = useState([]);

  var filtered = false;

  // Fetch all products from database
  useEffect(() => {
    if (products?.length > 0) {
      setProducts(products);
    } else {
      getAllProducts().then((data) => {
        setProducts(data);
        if (!filtered) {
          setFilteredProducts(data);
        }
        setObjectList(data);
      });
    }
  }, []);

  // The autocomplete class needs objects not Parseobjects so this converts products to a list of objects
  const setObjectList = (data) => {
    let result = []
    for (const product of data){
      if (jsonProducts.length == 0){
          if (product){
            const obj = product.toJSON();
            obj.id = product.id;
            result.push(obj);
          }
      }
    }
    setJsonProducts(result);
  }

  // This function is used to filter products as someone searches
  const fetchSuggestions = (searchTerm, result) => {
    if (products?.length > 0){
      let prods = []
      for (const product of products){
        if (product.get("description").includes(searchTerm) || product.get("title").includes(searchTerm)){
          prods.push(product);
        }
      }
      setFilteredProducts(prods);
    }
  };

  // This function filters products to the selected search item
  function handleOnSelect(search){
    let result = [];
    for (const product of products) {
      if (product.get('title')===search){
        result.push(product)
      }
    }
    setFilteredProducts(result);
  }

  const clearFilters = () => {
    setCategory('all');
    setPriceLimit('');
    setSeller('');
    setFilteredProducts(products);
    filtered = false;
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
    filtered = true;
  };

  function toggleSellerIds() {
    setShowSellerIds(!showSellerIds);
  }

  const formatResult = (item) => {
    return (
        <>
            <span style={{ display: 'block', textAlign: 'left' }}>{item.title}</span>
        </>
    )
}

  return (
    <div className="product-page">
      <h1 className="product-title">Browse Listings</h1>
      <div className="search-bar-container">
        <ReactSearchAutocomplete
          items={jsonProducts}
          resultStringKeyName='title'
          fuseOptions={{
              shouldSort: true,
              threshold: 0.1,
              location: 0,
              distance: 100,
              maxPatternLength: 32,
              minMatchCharLength: 2,
              keys: ["title", "description"]
            }}
          onSearch={fetchSuggestions}
          onSelect={(item) => {handleOnSelect(item.title)}}
          autoFocus
          formatResult={formatResult}
          />
      </div>
      <hr/>
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
        to={`/product/${product.id}`} 
        state={{
          category: product.get("category"),
          description: product.get("description"),
          isAvailable: product.get("isAvailable"),
          price: product.get("price"),
          sellerId: product.get("sellerId"),
          title: product.get("title"),
          imgUrls: product.get("imgUrls"),
        }}
        className="listing"
      >
        <div style={{ cursor: "pointer" }}>
        <ProductItem
  title={product.get("title")}
  price={product.get("price")}
  images={product.get("imgUrls")}
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