import { useEffect, useState } from "react";
import "./App.css";
import ProductDetails from "./ProductDetails";

function App() {
   const [cart, setCart] = useState([]);
   const [products, setProducts] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);

  // Get products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item._id !== id)
    );
  };

  // Calculate total
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Total number of items
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          GullyWear
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#shop">Shop</a>
          <a href="#">Men</a>
          <a href="#">Women</a>
        </div>

        <div className="nav-icons">

          <span>🔍</span>

          <a href="#cart" className="cart-icon">
            🛒 {cartCount}
          </a>

          <span>👤</span>

        </div>

      </nav>


      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <p className="collection">
            NEW COLLECTION 2026
          </p>

          <h1>
            WEAR YOUR <span>ATTITUDE</span>
          </h1>

          <p className="description">
            Discover premium streetwear designed
            for everyday style.
          </p>

          <button className="shop-button">
            SHOP NOW
          </button>

        </div>

      </section>


      {/* Products */}

      <section
        className="products-section"
        id="shop"
      >

        <p className="section-small-title">
          GULLYWEAR COLLECTION
        </p>

        <h2>NEW ARRIVALS</h2>

        <div className="products-grid">

          {products.map((product) => (

            <div
              className="product-card"
              key={product._id}
            >

             <div
              className="product-image"
              onClick={() => setSelectedProduct(product)}
              style={{ cursor: "pointer" }}
             >
              <img
              src={`/src/assets/${product.image}`}
               alt={product.name}
             />
             </div>

              <div className="product-info">

                <p className="product-category">
                  {product.category}
                </p>

                <h3>
                  {product.name}
                </h3>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <button
                  className="cart-button"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  ADD TO CART
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* Cart */}

      <section
        className="cart-section"
        id="cart"
      >

        <p className="section-small-title">
          YOUR SHOPPING BAG
        </p>

        <h2>SHOPPING CART</h2>

        {cart.length === 0 ? (

          <p className="empty-cart">
            Your cart is empty.
          </p>

        ) : (

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

                <div className="cart-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.category}
                  </p>

                  <strong>
                    ₹{item.price}
                  </strong>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item._id
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item._id
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(
                        item._id
                      )
                    }
                  >
                    REMOVE
                  </button>

                </div>

              </div>

            ))}


            {/* Cart Total */}

            <div className="cart-total">

              <h3>
                Total: ₹{totalPrice}
              </h3>

              <button className="checkout-button">
                PROCEED TO CHECKOUT
              </button>

            </div>

          </div>

        )}

      </section>

    </div>
  );
}

export default App;