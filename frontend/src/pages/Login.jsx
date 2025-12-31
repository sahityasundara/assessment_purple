import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await api.post("/api/auth/login", { email, password });
      await login(res.data.token);
      navigate("/", { replace: true });
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px" }}>
      <div className="card">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Welcome Back
        </h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "45px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "14px",
                color: "#4f46e5",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button className="primary" style={{ marginTop: "10px" }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
