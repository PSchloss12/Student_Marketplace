// Product item is a box to display a single product on another page
import './styles.css';

const ProductItem = ({ title, price, images, sellerId }) => {
  const firstImage = images && images.length > 0 ? images[0].url() : null; // display first image
  return (
    <div className="product-card">
      <div className="product-card-content">
        <h2 className="product-title">{title}</h2>
        {firstImage ? (
          <img className="product-image" src={firstImage} alt={title} />
        ) : (
          <div className="product-no-image">No Image Available</div>
        )}
        <p className="product-price">${price}</p>
        {sellerId && <p>{sellerId}</p>}
      </div>
    </div>
  );
};

export default ProductItem;