import { useState } from "react";
import { createInventoryItem } from "../services/inventoryService";

function InventoryCreate() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("kg");
  const [minimumStock, setMinimumStock] = useState(0);
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    try {
      await createInventoryItem({
        name,
        unit,
        minimum_stock: Number(minimumStock)
      });

      setMessage("Inventory item created successfully");
      setName("");
      setMinimumStock(0);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Create Inventory Item</h2>

      <input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="kg">Kg</option>
        <option value="liter">Liter</option>
        <option value="piece">Piece</option>
      </select>

      <input
        type="number"
        placeholder="Minimum stock"
        value={minimumStock}
        onChange={(e) => setMinimumStock(e.target.value)}
      />

      <button onClick={handleCreate}>Create</button>

      <p>{message}</p>
    </div>
  );
}

export default InventoryCreate;
