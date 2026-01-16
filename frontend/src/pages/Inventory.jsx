import { useEffect, useState } from "react";
import { getInventoryReport } from "../services/inventoryService";

function Inventory() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInventory() {
      try {
        const data = await getInventoryReport();
        setItems(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadInventory();
  }, []);

  return (
    <div>
      <h2>Inventory Report</h2>

      {error && <p>{error}</p>}

      <ul>
        {items.map((item) => (
          <li key={item.inventory_item_id}>
            {item.item_name} – {item.current_stock} {item.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
