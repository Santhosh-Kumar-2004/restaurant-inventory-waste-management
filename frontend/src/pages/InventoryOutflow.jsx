import { useEffect, useState } from "react";
import { getInventoryReport } from "../services/inventoryService";
import { apiFetch } from "../api/http";

function InventoryOutflow() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [reason, setReason] = useState("order_preparation");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadItems() {
      const data = await getInventoryReport();
      setItems(data);
    }
    loadItems();
  }, []);

  const handleOutflow = async () => {
    try {
      await apiFetch("/inventory/outflow", {
        method: "POST",
        body: JSON.stringify({
          inventory_item_id: Number(itemId),
          quantity: Number(quantity),
          unit,
          reason,
          used_by: user.user_id
        })
      });

      setMessage("Outflow recorded successfully");
      setQuantity("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Inventory Outflow (Usage)</h2>

      <select onChange={(e) => setItemId(e.target.value)}>
        <option value="">Select Item</option>
        {items.map((item) => (
          <option key={item.inventory_item_id} value={item.inventory_item_id}>
            {item.item_name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity used"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="kg">Kg</option>
        <option value="liter">Liter</option>
        <option value="piece">Piece</option>
      </select>

      <select value={reason} onChange={(e) => setReason(e.target.value)}>
        <option value="order_preparation">Order Preparation</option>
        <option value="staff_meal">Staff Meal</option>
        <option value="testing">Testing</option>
      </select>

      <button onClick={handleOutflow}>Add Outflow</button>

      <p>{message}</p>
    </div>
  );
}

export default InventoryOutflow;
