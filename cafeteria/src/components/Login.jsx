import { useState } from "react";
import { loginStudent } from "../api";

export default function Login({ onLogin }) {
  const [reg, setReg] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!reg.trim() || !name.trim()) {
      setError("Please fill in your registration number and student name.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const student = await loginStudent({ reg: reg.trim(), name: name.trim() });
      onLogin(student);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <h1>🍽 Vignan Food Court</h1>
        <p>Student Login</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Registration Number" value={reg} onChange={(event) => setReg(event.target.value)} autoComplete="off" required />
          <input placeholder="Student Name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Connecting..." : "Go to Menu"}</button>
        </form>
        <p className="local-storage-note">Your account and orders are saved on the cafeteria server.</p>
      </div>
    </div>
  );
}
