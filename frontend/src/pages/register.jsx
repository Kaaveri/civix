import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import AlertMessage from "../components/AlertMessage";
 
const Register = () => {
 
  const navigate = useNavigate();
 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Citizen",
    location: ""
  });
 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
 
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          location: `${position.coords.latitude}, ${position.coords.longitude}`
        }));
        setError("");
      },
      () => setError("Unable to fetch location")
    );
  };
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
 
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
 
    try {
 
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        location: form.location
      });
 
      setMessage("Registered successfully");
      setTimeout(() => navigate("/"), 1500);
 
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };
 
  return (
<div className="d-flex align-items-center justify-content-center vh-100 gradient-bg">
<div className="card p-3 shadow-sm" style={{ width: "320px" }}>
 
        <h6 className="text-center mb-2 fw-bold">Register</h6>
 
        <AlertMessage type="danger" message={error} onClose={() => setError("")} />
<AlertMessage type="success" message={message} onClose={() => setMessage("")} />
 
        <form onSubmit={handleSubmit}>
 
          <input
            type="text"
            name="name"
            className="form-control form-control-sm mb-2"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
 
          <input
            type="email"
            name="email"
            className="form-control form-control-sm mb-2"
            placeholder="Email"
            onChange={handleChange}
            required
          />
 
          <input
            type="password"
            name="password"
            className="form-control form-control-sm mb-2"
            placeholder="Password"
            onChange={handleChange}
            required
          />
 
          <input
            type="password"
            name="confirmPassword"
            className="form-control form-control-sm mb-2"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
 
          <select
            name="role"
            className="form-select form-select-sm mb-2"
            onChange={handleChange}
>
<option value="Citizen">Citizen</option>
<option value="Government Official">Official</option>
</select>
 
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm w-100 mb-2"
            onClick={detectLocation}
>
            Detect Location
</button>
 
          <input
            type="text"
            name="location"
            className="form-control form-control-sm mb-2"
            placeholder="Location"
            value={form.location}
            readOnly
          />
 
          <button className="btn btn-primary btn-sm w-100">
            Register
</button>
 
        </form>
 
        <p className="text-center mt-2 small">
          Already registered?{" "}
<Link to="/" className="text-decoration-none fw-semibold">
            Login
</Link>
</p>
 
      </div>
</div>
  );
};
 
export default Register;