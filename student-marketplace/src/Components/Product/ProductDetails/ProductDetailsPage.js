// displays the details of the product
import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { getSellerVenmo } from "../../../Services/Transactions";  
import { updateAvailable, addToFavorites } from "../../../Services/Products"; // Import the new service
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './styles.css';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();  // Get the product ID from the URL 
  const location = useLocation();
  const [isBought, setIsBought] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [sellerVenmo, setSellerVenmo] = useState(null);

  // Memoize the product details from location.state
  const product = useMemo(() => location.state || {}, [location.state]);

  useEffect(() => {
    if (productId) {  // Use productId to get sellerVenmo
      getSellerVenmo(productId)
        .then((venmo) => setSellerVenmo(venmo))
        .catch((error) => console.error("Error fetching seller's Venmo:", error));
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
    try {
      await updateAvailable(productId); // Call the service to update availability
      setIsBought(true); // Update the state to reflect the purchase
    } catch (error) {
      console.error("Error updating product availability:", error);
    }
  };

  const handleWatch = async () => {
    try {
      await addToFavorites(productId); // Call the service to add the product to favorites
      setIsWatched(true); // Update the state to reflect the addition
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
      <div className="item-venmo">
        <strong>Seller's Venmo:</strong> {sellerVenmo || "Error: No Venmo Found"}
      </div>
      {isBought && <div className="bought-message">Item marked as bought!</div>}
      <div className="instruction">To purchase, please Venmo the seller.</div>
      <div>
        <button className="buy-button" onClick={handleBuy}>
          Buy
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