import { useState } from "react";

export default function Login({ onLogin }) {
  const [reg, setReg] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (reg.trim() === "" || name.trim() === "") {
      alert("Please fill Registration Number and Student Name");
      return;
    }

    // Open Menu
    onLogin({ reg, name });
  };
  return (
    <div className="login">
      <div className="card">
        <h1>🍽 Vignan Food Court</h1>
        <p>Student Login</p>

        <input
          placeholder="Registration Number"
          value={reg}
          onChange={(e) => setReg(e.target.value)}
        />

        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={() => onLogin({ reg, name })}>
          Go to Menu
        </button>
      </div>
    </div>
  );
}