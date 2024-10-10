// Product item is a box to display a single product on another page

const ProductItem = ({ title, price, image, category }) => {
  // displays each individual listing
  return (
    <div class="product-card">
      <div class="product-card-content">
        <h2 class="product-title">{title}</h2>
        {image
          ? <img class="product-image" src={image} alt={title} />
          : <div class="product-no-image">No Image Available</div>}
        <p class="product-price">{price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
