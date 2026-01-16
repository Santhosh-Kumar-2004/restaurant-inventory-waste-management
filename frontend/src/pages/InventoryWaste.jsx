import { useEffect, useState } from "react";
import { getInventoryReport } from "../services/inventoryService";
import { apiFetch } from "../api/http";

function InventoryWaste() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadItems() {
      const data = await getInventoryReport();
      setItems(data);
    }
    loadItems();
  }, []);

  const handleWaste = async () => {
    try {
      await apiFetch("/inventory/waste", {
        method: "POST",
        body: JSON.stringify({
          inventory_item_id: Number(itemId),
          quantity: Number(quantity),
          unit,
          reason,
          reported_by: user.user_id
        })
      });

      setMessage("Waste recorded successfully");
      setQuantity("");
      setReason("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Inventory Waste</h2>

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
        placeholder="Quantity wasted"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="kg">Kg</option>
        <option value="liter">Liter</option>
        <option value="piece">Piece</option>
      </select>

      <input
        placeholder="Reason for waste (expired, spilled, overcooked)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button onClick={handleWaste}>Add Waste</button>

      <p>{message}</p>
    </div>
  );
}

export default InventoryWaste;
