import { useState, useEffect, useMemo } from "react";
import { useLocation } from 'react-router-dom';
import { getSellerVenmo } from "../../../Services/Users";
import './styles.css';

const ProductDetailsPage = () => {
  // TODO: add purchase capability
  // TODO: if someone clicks that its bought, update db
  // TODO: if someone 'watches' item, add it to favorites
  const location = useLocation();
  const [isBought, setIsBought] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [sellerVenmo, setSellerVenmo] = useState(null);

  // Memoize the product
  const product = useMemo(() => location.state || {}, [location.state]);

  useEffect(() => {
    if (product.sellerId) {
      getSellerVenmo(product.sellerId)
        .then((venmo) => setSellerVenmo(venmo))
        .catch((error) => console.error("Error fetching seller's Venmo:", error));
    }
  }, [product]);

  // see if an image was included 
  const imgUrl = product.imgUrl ? product.imgUrl._url : null;

  if (!product) {
    console.error("Product could not be found:", product);
    return (
      <div className="item-page">
        <h1 className="item-title">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="item-page">
      <h1 className="item-title">{product.title}</h1>
      {imgUrl ? (
        <img className="item-image" src={imgUrl} alt={product.title} />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <div className="item-price">Price: ${product.price}</div>
      <div className="item-description">{product.description}</div>
      <div className="item-venmo">
        <strong>Seller's Venmo:</strong> {sellerVenmo || "Loading..."}
      </div>
      {isBought && <div className="bought-message">Item marked as bought!</div>}
      <div className="instruction">To purchase, please Venmo the seller.</div>
      <div>
        <button className="buy-button" onClick={() => setIsBought(true)}>
          Buy
        </button>
        <label>
          <input
            className="checkbox"
            type="checkbox"
            onChange={() => setIsWatched(!isWatched)}
          />
          Add To Watch List
        </label>
      </div>
    </div>
  );
};

export default ProductDetailsPage;