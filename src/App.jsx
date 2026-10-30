// App.jsx is the "brain" of the project.
// It keeps all the data (state) and passes it to the smaller components.
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Filters from "./components/Filters.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { fetchProducts } from "./api/products.js";

function App() {
  /* ---------- STATE (data that can change) ---------- */
  const [products, setProducts] = useState([]); // all products from the API
  const [loading, setLoading] = useState(true); // true while waiting for the API
  const [error, setError] = useState(""); // error message, empty if no error

  const [searchText, setSearchText] = useState(""); // what the user typed
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const [isCartOpen, setIsCartOpen] = useState(false);

  // The cart starts with whatever was saved in localStorage (or an empty list)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("shelf-cart");
    return saved ? JSON.parse(saved) : [];
  });

  /* ---------- LOAD PRODUCTS ---------- */
  async function loadProducts() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  // Runs one time when the page opens
  useEffect(() => {
    loadProducts();
  }, []);

  // Runs every time the cart changes, and saves it in localStorage
  useEffect(() => {
    localStorage.setItem("shelf-cart", JSON.stringify(cart));
  }, [cart]);

  /* ---------- CART FUNCTIONS ---------- */
  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Already in the cart, so increase the quantity by 1
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      // New item, so add it with quantity 1
      setCart([
        ...cart,
        { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, qty: 1 },
      ]);
    }
  }

  function changeQty(id, newQty) {
    if (newQty <= 0) {
      removeItem(id); // quantity 0 means remove the item
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, qty: newQty } : item)));
    }
  }

  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  // Total number of items in the cart (for the badge on the cart button)
  let cartCount = 0;
  cart.forEach((item) => {
    cartCount = cartCount + item.qty;
  });

  /* ---------- SEARCH, FILTER AND SORT ---------- */
  // Step 1: get the list of unique category names
  const categories = [...new Set(products.map((product) => product.category))].sort();

  // Step 2: keep only products that match the search text and the category
  const search = searchText.trim().toLowerCase();
  let visibleProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      search === "" ||
      product.title.toLowerCase().includes(search) ||
      (product.brand || "").toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  // Step 3: sort the list (we copy it first with [...] so the original stays the same)
  if (sortBy === "price-low") {
    visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    visibleProducts = [...visibleProducts].sort((a, b) => b.rating - a.rating);
  }

  function clearFilters() {
    setSearchText("");
    setSelectedCategory("all");
    setSortBy("default");
  }

  /* ---------- WHAT SHOWS ON THE SCREEN ---------- */
  return (
    <>
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="container">
        {/* Show filters only when products have loaded without errors */}
        {!loading && !error && (
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            productCount={visibleProducts.length}
          />
        )}

        <ProductGrid
          products={visibleProducts}
          loading={loading}
          error={error}
          onRetry={loadProducts}
          onClearFilters={clearFilters}
          onAddToCart={addToCart}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onChangeQty={changeQty}
        onRemove={removeItem}
        onClear={clearCart}
      />
    </>
  );
}

export default App;
