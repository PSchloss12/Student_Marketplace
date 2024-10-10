// An ProductDetailsPage is a more detailed view of a single selected product
  
  const ProductDetailsPage = ({ product }) => {
    const [isBought, setIsBought] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    // TODO: ensure uniform img size in db/scale images on the front end
    // TODO: add functionality to handle purchasing
  
    return (
      <div class="item-page">
        <h1 class="item-title">${product.title}</h1>
        ${product.image
          ? <img
              class="item-image"
              src={product.image}
              alt={product.title}
            />
          : <div class="no-image">No Image Available</div>}
        <div class="item-price">Price: $${product.price}</div>
        <div class="item-description">${product.description}</div>
        <div class="item-venmo">
          <strong>Seller's Venmo:</strong> ${product.venmo}
        </div>
        ${isBought &&
        <div class="bought-message">Item marked as bought!</div>}
        <div class="instruction">To purchase, please Venmo the seller.</div>
        <div>
          <button class="buy-button" onClick={() => setIsBought(true)}>
            Buy
          </button>
          <label>
            <input
              class="checkbox"
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
  