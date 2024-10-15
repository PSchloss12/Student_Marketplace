// An ProductDetailsPage is a more detailed view of a single selected product
import { useState } from "react";
import { useParams } from 'react-router-dom';

import './styles.css';

  const ProductDetailsPage = ({ product }) => {
    const { id } = useParams();
    const [isBought, setIsBought] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    // TODO: ensure uniform img size in db/scale images on the front end
    // TODO: add functionality to handle purchasing
  
    return (
      <div className="item-page">
        <h1 className="item-title">{product.get("title")} ({id})</h1>
        {product.get("imgUrl") ? (
          <img className="item-image" src={product.get("imgUrl").url()} alt={product.get("title")} />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
        <div className="item-price">Price: ${product.get("price")}</div>
        <div className="item-description">{product.get("description")}</div>
        <div className="item-venmo">
          <strong>Seller's Venmo:</strong> {product.get("venmo")}
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
  