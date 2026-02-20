import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Dashboard.css";

function Dashboard() {
  const [user] = useState(() => {
    const currentUser = localStorage.getItem("currentUser");
    try {
      return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
      console.error("Failed to parse user data:", error);
      return null;
    }
  });
  const [myPetitions] = useState(0);
  const [petitionsSigned] = useState(0);
  const [activePolls] = useState(3);
  const [engagement] = useState("+24%");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      {/* Navigation Header */}
      <div className="dashboard-header">
        <div className="dashboard-user-info">
          <div className="dashboard-avatar">🏛️</div>
          <div>
            <h1 style={{ margin: "0 0 5px 0", fontSize: "1.5em" }}>Civix</h1>
            <p style={{ margin: "0", fontSize: "0.85em", opacity: 0.8 }}>Civic Engagement Platform</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div className="dashboard-welcome">
            <h2>Welcome back, {user.name.split(" ")[0]}!</h2>
            <p>{user.role}</p>
          </div>
          <button className="dashboard-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="dashboard-stats">
          <div className="stat-card stat-card-1">
            <div className="stat-label">📋 My Petitions</div>
            <p className="stat-value">{myPetitions}</p>
          </div>

          <div className="stat-card stat-card-2">
            <div className="stat-label">✅ Petitions Signed</div>
            <p className="stat-value">{petitionsSigned}</p>
          </div>

          <div className="stat-card stat-card-3">
            <div className="stat-label">📊 Active Polls</div>
            <p className="stat-value">{activePolls}</p>
          </div>

          <div className="stat-card stat-card-4">
            <div className="stat-label">📈 Engagement</div>
            <p className="stat-value">{engagement}</p>
          </div>
        </div>

        {/* Main Actions Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {/* Petitions Section */}
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#000", fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px" }}>
                📋 Petitions
              </h3>
              <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>Browse, create, and sign petitions in your community</p>
            </div>
            <button
              className="action-button"
              onClick={() => navigate("/petitions")}
            >
              View All Petitions
            </button>
          </div>

          {/* Polls Section */}
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#000", fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px" }}>
                📊 Public Polls
              </h3>
              <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>Participate in community sentiment polls and surveys</p>
            </div>
            <button
              className="action-button"
              onClick={() => navigate("/polls")}
            >
              View All Polls
            </button>
          </div>
        </div>

        {/* Recent Petitions Section */}
        <div style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f0"
        }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#000", fontSize: "18px", fontWeight: "700" }}>Recent Petitions in Your Area</h3>
          <p style={{ margin: "0 0 25px 0", color: "#666", fontSize: "14px" }}>Latest petitions from {user.location || "your area"}</p>
          
          <div style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f9f9f9",
            borderRadius: "8px",
            border: "1px dashed #e0e0e0",
            marginBottom: "20px"
          }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: "0 0 10px 0", color: "#888", fontSize: "16px" }}>No recent petitions yet</p>
              <p style={{ margin: "0", color: "#aaa", fontSize: "14px" }}>Check back soon for updates in your area</p>
            </div>
          </div>

          <button
            className="action-button"
            onClick={() => navigate("/petitions")}
            style={{ background: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)", color: "white" }}
          >
            View All Petitions
          </button>
        </div>

        {/* Quick Create Actions */}
        <div style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px"
        }}>
          <button style={{
            padding: "15px 20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onClick={() => navigate("/create-petition")}
          onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            ➕ Create Petition
          </button>
          <button style={{
            padding: "15px 20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onClick={() => navigate("/create-poll")}
          onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            ➕ Create Poll
          </button>
          <button style={{
            padding: "15px 20px",
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onClick={() => navigate("/reports")}
          onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            📊 View Reports
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;