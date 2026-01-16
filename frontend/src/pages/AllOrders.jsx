import { useEffect, useState } from "react";
import { apiFetch } from "../api/http";

function AllOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await apiFetch("/orders");
    setOrders(data);
  };

  return (
    <div>
      <h2>All Orders</h2>

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Table:</strong> {order.table_number}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AllOrders;
