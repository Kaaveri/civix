import { useState } from "react";
import API from "../services/api";
 
const ForgotPassword = () => {
 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      await API.post("/forgot-password", { email });
      setMessage("Password reset link sent to your email.");
    } catch {
      setMessage("Something went wrong.");
    }
  };
 
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 gradient-bg">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Forgot Password</h3>
 
        {message && (
          <div className="alert alert-info">
            {message}
          </div>
        )}
 
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your registered email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
 
          <button className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default ForgotPassword;