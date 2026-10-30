// One product card: image, name, rating, price and "Add to cart" button.
import { formatPrice } from "../utils/formatPrice.js";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="card">
      <div className="card-img">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>

      <div className="card-body">
        <p className="card-cat">{product.category.replace(/-/g, " ")}</p>
        <h2 className="card-title">{product.title}</h2>
        <p className="card-meta">Rating {product.rating.toFixed(1)} / 5</p>

        <div className="card-footer">
          <strong className="price">{formatPrice(product.price)}</strong>
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
