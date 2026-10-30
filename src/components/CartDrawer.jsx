// The cart panel that slides in from the right side.
import { formatPrice } from "../utils/formatPrice.js";

function CartDrawer({ isOpen, onClose, cart, onChangeQty, onRemove, onClear }) {
  // Add up price x quantity of every item in the cart
  let total = 0;
  cart.forEach((item) => {
    total = total + item.price * item.qty;
  });

  return (
    <>
      {/* Dark background behind the cart. Clicking it closes the cart. */}
      <div className={isOpen ? "overlay show" : "overlay"} onClick={onClose}></div>

      <aside className={isOpen ? "drawer open" : "drawer"}>
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="btn" onClick={onClose}>Close</button>
        </div>

        {cart.length === 0 ? (
          <p className="drawer-empty">Your cart is empty. Add a product to get started.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt="" />

                  <div className="cart-info">
                    <p className="cart-title">{item.title}</p>
                    <p className="cart-price">{formatPrice(item.price * item.qty)}</p>

                    <div className="qty">
                      <button onClick={() => onChangeQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => onChangeQty(item.id, item.qty + 1)}>+</button>
                      <button className="link" onClick={() => onRemove(item.id)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer-foot">
              <div className="total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="btn btn-primary full">Checkout</button>
              <button className="link" onClick={onClear}>Clear cart</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
