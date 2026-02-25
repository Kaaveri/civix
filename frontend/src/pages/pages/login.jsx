import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
 
const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const res = await API.post("/login", { email, password });
      login(res.data);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };
 
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 gradient-bg">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
 
        <form onSubmit={handleSubmit}>
 
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
 
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
 
          <div className="text-end mb-3">
            <Link to="/forgot-password" className="text-decoration-none small text-primary">
              Forgot Password?
            </Link>
          </div>
 
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">Remember Me</label>
          </div>
 
          <button className="btn btn-success w-100">
            Login
          </button>
        </form>
 
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register
          </Link>
        </p>
 
      </div>
    </div>
  );
};
 
export default Login;