import { useState } from "react";
import { createUser } from "../services/authService";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleRegister = async () => {
    try {
      await createUser({
        full_name: fullName,
        email,
        password
      });

      setResult("User registered successfully. Please login.");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <p>{result}</p>
    </div>
  );
}

export default Register;
