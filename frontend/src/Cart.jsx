import "./Cart.css";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-page">
      <div className="cart-container">

        <p className="cart-small-title">
          YOUR SHOPPING BAG
        </p>

        <h1>SHOPPING CART</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="cart-content">

            {/* Cart Items */}
            <div className="cart-items">

              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item._id}
                >

                  <img
                    src={`/src/assets/${item.image}`}
                    alt={item.name}
                  />

                  <div className="cart-item-details">

                    <h2>{item.name}</h2>

                    <p>{item.category}</p>

                    <strong>
                      ₹{item.price}
                    </strong>

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          decreaseQuantity(item._id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item._id)
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      REMOVE
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div className="cart-summary">

              <h2>ORDER SUMMARY</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

              <button className="checkout-button">
                PROCEED TO CHECKOUT
              </button>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default Cart;