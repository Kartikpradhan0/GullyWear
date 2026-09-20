import "./ProductDetails.css";

function ProductDetails({ product, onAddToCart }) {
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <section className="product-details">

      <div className="product-details-image">
        <img
          src={`/src/assets/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-details-info">

        <p className="product-details-category">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p className="product-details-description">
          {product.description}
        </p>

        <p className="product-stock">
          Stock Available: {product.stock}
        </p>

        <button
          className="details-cart-button"
          onClick={() => onAddToCart(product)}
        >
          ADD TO CART
        </button>

      </div>

    </section>
  );
}

export default ProductDetails;