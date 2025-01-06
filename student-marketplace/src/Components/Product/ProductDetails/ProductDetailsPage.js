// displays the details of the product
import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { getSellerVenmo } from "../../../Services/Transactions";  
import { updateAvailable, addToFavorites, removeFromFavorites } from "../../../Services/Products"; 
import { transactionBuyer } from "../../../Services/Transactions"; 
import ImageGallery from 'react-image-gallery';
import Parse from "parse";
import 'react-image-gallery/styles/css/image-gallery.css';
import './styles.css';

//TODO: add additional buying functionality (connect to stripe, etc.)

const ProductDetailsPage = () => {
  const { id: productId } = useParams();  // Get the product ID from the URL 
  const location = useLocation();
  const [isBought, setIsBought] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [sellerVenmo, setSellerVenmo] = useState(null);

  const currUser = Parse.User.current();

  // Memoize the product details from location.state
  const product = useMemo(() => location.state || {}, [location.state]);
  
  useEffect(() => {
    try {
      if (productId) {  // Use productId to get sellerVenmo
        getSellerVenmo(productId)
          .then((venmo) => setSellerVenmo(venmo))
          .catch((error) => console.error("Error fetching seller's Venmo:", error));
        if (currUser.get('favorites')?.includes(productId)){
          setIsWatched(true);
        } else {
          setIsWatched(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [productId]);

  // Format images for the gallery
  const galleryImages = useMemo(() => {
    if (!product.imgUrls) return []; // If no images
    const imgUrls = Array.isArray(product.imgUrls) ? product.imgUrls : [product.imgUrls];
    return imgUrls.map((img) => ({
      original: img._url || img, 
      thumbnail: img._url || img, // thumbnail URL
    }));
  }, [product.imgUrls]);

  const handleBuy = async () => {
    // TODO: this should only be accessible to sellers so that you can't remove products without buying them
    try {
      // await updateAvailable(productId); //  update availability to false
      // setIsBought(true);
      // await transactionBuyer(productId); //  update the buyerId for the transaction
      alert("Contact the seller to purchase item.")
    } catch (error) {
      console.error("Error processing the purchase:", error);
    }
  };

  const handleWatch = async () => {
    try {
      if (isWatched){
        setIsWatched(!isWatched);
        await removeFromFavorites(productId);
      } else {
        setIsWatched(!isWatched);
        await addToFavorites(productId);
      }
    } catch (error) {
      console.error("Error adding product to favorites:", error);
    }
  };

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
      
      {galleryImages.length > 0 ? (
        <ImageGallery items={galleryImages} />
      ) : (
        <div className="no-image">No Images Available</div>
      )}
      
      <div className="item-price">Price: ${product.price}</div>
      <div className="item-description"><strong>Description:</strong> {product.description}</div>
      <div className="item-venmo"><strong>Seller:</strong> {product.sellerName}</div>
      <div className="item-venmo">
        <strong>Seller's Venmo:</strong> {sellerVenmo || "Error: No Venmo Found"}
      </div>
      {isBought && <div className="bought-message">Item marked as bought!</div>}
      <div className="instruction">To purchase, please Venmo the seller.</div>
      <div>
        <button className="buy-button" onClick={handleBuy}>
          Mark as Sold
        </button>
        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={isWatched}
            onChange={handleWatch}
          />
          Add To Watch List
        </label>
      </div>
    </div>
  );
};

export default ProductDetailsPage;