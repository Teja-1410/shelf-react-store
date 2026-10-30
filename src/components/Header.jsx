// The top bar: logo, search box and cart button.
// It receives data and functions from App.jsx through "props".

function Header({ searchText, onSearchChange, cartCount, onOpenCart }) {
  return (
    <header className="header">
      <h1 className="logo">Shelf</h1>

      <div className="search">
        <label htmlFor="search" className="sr-only">Search products</label>
        <input
          id="search"
          type="search"
          placeholder="Search products or brands"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <button className="btn cart-btn" onClick={onOpenCart}>
        Cart
        <span className="badge">{cartCount}</span>
      </button>
    </header>
  );
}

export default Header;
