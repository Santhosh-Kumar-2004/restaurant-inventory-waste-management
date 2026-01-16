import React, { useEffect, useState } from "react";
import { addOrderItem } from "../services/orderService";
import { getMenuItems } from "../services/menuService";
import "../styles/OrderItems.css";
import Navbar from "../components/Navbar";

function OrderItems() {
  const orderId = localStorage.getItem("current_order_id");
  const [menu, setMenu] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await getMenuItems();
        setMenu(data.filter((item) => item.is_available));
      } catch (err) {
        setMessage(err.message);
      }
    }
    loadMenu();
  }, []);

  const selectedItem = menu.find((item) => item.id === Number(selectedMenuId));

  const handleAddItem = async () => {
    if (!selectedItem) {
      setMessage("❌ Please select a menu item");
      return;
    }
    try {
      await addOrderItem(orderId, {
        item_name: selectedItem.name,
        quantity: Number(quantity),
        price_per_unit: Number(selectedItem.price),
      });
      setMessage(`✅ Added ${quantity}x ${selectedItem.name}`);
      setQuantity("");
      setSelectedMenuId("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  if (!orderId) {
    return (
      <div className="order-items-empty">
        <p>No active order found. Please create an order first.</p>
        <button onClick={() => window.location.href='/orders/create'}>New Order</button>
      </div>
    );
  }

  return (
    <div className="order-items-container">
        <Navbar />
      <div className="order-items-card">
        <div className="order-items-header">
          <span className="order-badge">Active Order #{orderId}</span>
          <h2>Add Menu Items</h2>
          <p>Select the dish and quantity for the table.</p>
        </div>

        <div className="order-items-form">
          <div className="form-group">
            <label>Menu Item</label>
            <select
              className="styled-select"
              value={selectedMenuId}
              onChange={(e) => setSelectedMenuId(e.target.value)}
            >
              <option value="">Search for a dish...</option>
              {menu.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} — ₹{item.price}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              className="styled-input"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {selectedItem && (
            <div className="price-preview-box">
              <div className="preview-row">
                <span>Price per unit:</span>
                <strong>₹{selectedItem.price}</strong>
              </div>
              <div className="preview-row total">
                <span>Estimated Total:</span>
                <strong>₹{(selectedItem.price * (quantity || 0)).toFixed(2)}</strong>
              </div>
            </div>
          )}

          <button className="add-item-btn" onClick={handleAddItem}>
            Add to Bill
          </button>
        </div>

        {message && (
          <div className={`order-status-msg ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItems;