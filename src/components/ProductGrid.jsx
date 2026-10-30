// Shows the list of products. It also handles three special cases:
// 1. loading   2. error   3. no products found
import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products, loading, error, onRetry, onClearFilters, onAddToCart }) {
  // Case 1: still loading, so show grey placeholder boxes
  if (loading) {
    return (
      <div className="grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <div key={number} className="card skeleton"></div>
        ))}
      </div>
    );
  }

  // Case 2: the API call failed, so show the error and a retry button
  if (error) {
    return (
      <div className="state">
        <p>{error}</p>
        <button className="btn btn-primary" onClick={onRetry}>Try again</button>
      </div>
    );
  }

  // Case 3: search or filter found nothing
  if (products.length === 0) {
    return (
      <div className="state">
        <p>No products match your search.</p>
        <button className="btn" onClick={onClearFilters}>Clear search and filters</button>
      </div>
    );
  }

  // Normal case: show one card for each product
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductGrid;
