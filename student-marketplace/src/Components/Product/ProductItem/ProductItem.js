// Product item is a box to display a single product on another page
import './styles.css';

const ProductItem = ({ title, price, image, sellerId }) => {
  return (
    <div className="product-card">
      <div className="product-card-content">
        <h2 className="product-title">{title}</h2>
        {image ? (
          <img className="product-image" src={image} alt={title} />
        ) : (
          <div className="product-no-image">No Image Available</div>
        )}
        <p className="product-price">${price}</p>
        {
          sellerId ? (
            <p>{sellerId}</p>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  );
};

export default ProductItem;
