// An ProductDetailsPage is a more detailed view of a single selected product
import { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';

import './styles.css';

  const ProductDetailsPage = () => {
    const location = useLocation();
    console.log(`state ${JSON.stringify(location.state, null, 4)}`)
    const product = location.state || {}; 
    const { id } = useParams();
    const [isBought, setIsBought] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    // TODO: ensure uniform img size in db/scale images on the front end
    // TODO: add functionality to handle purchasing
    if (!product){
      console.error("Product could not be found: ", product);
      return (
        <div className="item-page">
          <h1 className="item-title">Product Not Found</h1>
        </div>
      );
    }
  
    return (
      <div className="item-page">
        <h1 className="item-title">{product["title"]} ({id})</h1>
        {product["imgUrl"] ? (
          <img className="item-image" src={product["imgUrl"].url()} alt={product["title"]} />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
        <div className="item-price">Price: ${product["price"]}</div>
        <div className="item-description">{product["description"]}</div>
        <div className="item-venmo">
          <strong>Seller's Venmo:</strong> {"Example_venmo"}
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
  