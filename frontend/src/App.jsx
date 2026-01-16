import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
// import Orders from "./pages/Orders";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div>
        <Login />
        <hr />
        <Link to="/register">Register</Link>

        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }

  return (
    <div>
      <h1>Restaurant System</h1>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      >
        Logout
      </button>

      <Routes>
        <Route path="/" element={<Inventory />} />
        {/* <Route path="/orders" element={<Orders />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
