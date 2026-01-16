import { useState } from "react";
import { apiFetch } from "../api/http";

function OrdersCreate() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tableNumber, setTableNumber] = useState("");
  const [result, setResult] = useState("");

  const handleCreateOrder = async () => {
    try {
      const res = await apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify({
          table_number: Number(tableNumber),
          created_by: user.user_id
        })
      });

      localStorage.setItem("current_order_id", res.order_id);
      setResult(`Order created. Order ID: ${res.order_id}`);
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div>
      <h2>Create Order</h2>

      <input
        type="number"
        placeholder="Table number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
      />

      <button onClick={handleCreateOrder}>Create Order</button>

      <p>{result}</p>
    </div>
  );
}

export default OrdersCreate;
