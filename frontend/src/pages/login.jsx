import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css";

function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Citizen");
  const [location, setLocation] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([
    { email: "john@example.com", password: "password", name: "John Doe", role: "Citizen" },
    { email: "mayor@example.com", password: "password", name: "Mayor", role: "Official" }
  ]);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    if (user) {
      alert("✅ You are in!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("❌ Invalid credentials. Please register first or try again.");
    }
    setEmail("");
    setPassword("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !location) {
      alert("❌ Please fill out all fields.");
      return;
    }
    const userExists = registeredUsers.find(u => u.email === email);
    if (userExists) {
      alert("❌ Email already registered. Please login.");
      return;
    }
    setRegisteredUsers([...registeredUsers, { email, password, name: fullName, role, location }]);
    alert("✅ Registration successful! Please login with your credentials.");
    setActiveTab("login");
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("Citizen");
    setLocation("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo and Branding */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #5b5bff 0%, #4a4aff 100%)",
            borderRadius: "50%",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            color: "white"
          }}>
            🎯
          </div>
          <h1 style={{ margin: "0 0 5px 0", fontSize: "28px", color: "#000" }}>Civix</h1>
          <p style={{ margin: "10px 0 0 0", fontSize: "0.95em", color: "#666" }}>Digital Civic Engagement & Petition Platform</p>
        </div>

        {/* Tabs */}
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="form-submit-btn">
              Login
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="login-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setRole("Citizen")}
                  style={{
                    flex: 1,
                    padding: "12px 15px",
                    border: "none",
                    borderRadius: "8px",
                    background: role === "Citizen" ? "#667eea" : "#f5f5f5",
                    color: role === "Citizen" ? "white" : "#000",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.3s ease"
                  }}
                >
                  👤 Citizen
                </button>
                <button
                  type="button"
                  onClick={() => setRole("Official")}
                  style={{
                    flex: 1,
                    padding: "12px 15px",
                    border: "none",
                    borderRadius: "8px",
                    background: role === "Official" ? "#667eea" : "#f5f5f5",
                    color: role === "Official" ? "white" : "#000",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.3s ease"
                  }}
                >
                  🏛️ Official
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="form-submit-btn">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;