import React, { useEffect, useState } from "react";
import { getMenuItems } from "../services/menuService";
import { createOrder, addOrderItem } from "../services/orderService";
import Navbar from "../components/Navbar";
import "../styles/CustomerMenu.css";

function CustomerMenu() {
  const tableNumber = 1; // Temporary hardcode

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await getMenuItems();
        setMenu(data.filter((item) => item.is_available));
      } catch (err) {
        console.error("Failed to load menu", err);
      }
    }
    loadMenu();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = async () => {
    try {
      const order = await createOrder({
        table_number: tableNumber,
        created_by: null,
      });

      for (const item of cart) {
        await addOrderItem(order.order_id, {
          item_name: item.name,
          quantity: item.quantity,
          price_per_unit: item.price,
        });
      }

      setOrderId(order.order_id);
      setCart([]);
      setMessage("Order placed successfully! Please wait while we prepare your meal.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="customer-menu-app">
      <Navbar />

      <header className="menu-hero">
        <div className="hero-content">
          <h1>KitchenPro</h1>
          <div className="table-badge">Table {tableNumber}</div>
        </div>
      </header>

      <div className="menu-container">
        <section className="menu-list">
          <div className="section-title">
            <h3>Our Selection</h3>
            <span className="item-count">{menu.length} Items Available</span>
          </div>
          
          {menu.map((item) => (
            <div className="menu-item-card" key={item.id}>
              <div className="item-details">
                <span className="category-pill">{item.category}</span>
                <h4>{item.name}</h4>
                <span className="price">₹{item.price}</span>
              </div>
              <button className="add-btn" onClick={() => addToCart(item)}>
                Add <span>+</span>
              </button>
            </div>
          ))}
        </section>

        {cart.length > 0 && (
          <div className="cart-sticky-container">
            <div className="cart-overlay">
              <div className="cart-header">
                <h3>Your Selection ({totalItems})</h3>
                <button className="close-cart" onClick={() => setCart([])}>Clear</button>
              </div>
              
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-row">
                    <div className="cart-item-info">
                      <span className="qty">{item.quantity}x</span>
                      <span className="name">{item.name}</span>
                    </div>
                    <div className="cart-item-actions">
                      <span className="row-total">₹{item.price * item.quantity}</span>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total-display">
                  <span>Grand Total</span>
                  <span className="total-amount">₹{cartTotal}</span>
                </div>
                <button className="place-order-btn" onClick={placeOrder}>
                  Confirm & Place Order
                </button>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="success-modal">
            <div className="modal-content animate-pop">
              <div className="success-icon">🥘</div>
              <h2>Order Received!</h2>
              <p>{message}</p>
              {orderId && <div className="order-id-tag">Order Reference: #{orderId}</div>}
              <button className="modal-close-btn" onClick={() => setMessage("")}>Back to Menu</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerMenu;