// Category buttons and the "sort by" dropdown.

function Filters({ categories, selectedCategory, onCategoryChange, sortBy, onSortChange, productCount }) {
  return (
    <section className="filters">
      <div className="chips">
        {/* Button for "All", then one button for each category */}
        <button
          className={selectedCategory === "all" ? "chip active" : "chip"}
          onClick={() => onCategoryChange("all")}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "chip active" : "chip"}
            onClick={() => onCategoryChange(category)}
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </div>

      <div className="sort">
        <span className="count">{productCount} products</span>

        <label htmlFor="sort" className="sr-only">Sort products</label>
        <select id="sort" value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>
    </section>
  );
}

export default Filters;
