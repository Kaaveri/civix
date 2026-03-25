import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/OfficialDashboard.css";

const OfficialDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    pendingPetitions: 0,
    totalPolls: 0,
    totalReports: 0,
    totalCitizens: 0
  });

  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* FETCH DASHBOARD DATA */

  const fetchDashboardData = async () => {
    try {
      const petitionsRes = await API.get("/petitions");

      setPetitions(petitionsRes.data);

      const pending = petitionsRes.data.filter(
        (p) => p.status?.toLowerCase() === "active"
      ).length;

      setStats({
        pendingPetitions: pending,
        totalPolls: 8,
        totalReports: 24,
        totalCitizens: 156
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  /* APPROVE PETITION */

  const handleApprove = async (petitionId) => {
    try {
      await API.put(`/petitions/approve/${petitionId}`);
      fetchDashboardData();
    } catch (error) {
      console.error("Approve error:", error);
    }
  };

  /* REJECT PETITION */

  const handleReject = async (petitionId) => {
    try {
      await API.put(`/petitions/reject/${petitionId}`);
      fetchDashboardData();
    } catch (error) {
      console.error("Reject error:", error);
    }
  };

  /* DELETE PETITION */

  const handleDelete = async (petitionId) => {
    if (window.confirm("Are you sure you want to delete this petition?")) {
      try {
        await API.delete(`/petitions/${petitionId}`);
        fetchDashboardData();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  /* EDIT PETITION */

  const handleEdit = (petitionId) => {
    console.log("Editing petition:", petitionId);
    navigate(`/edit/${petitionId}`);
  };

  /* LOGOUT */

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* FILTER ACTIVE PETITIONS */

  const pendingPetitions = petitions.filter(
    (p) => p.status?.toLowerCase() === "active"
  );

  return (
    <div className="official-container">

      {/* HEADER */}

      <div className="official-header">
        <div>
          <p className="official-role">Official Panel</p>
          <h2>{user?.name || "Government Official"}</h2>
        </div>

        <button className="official-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* STATS GRID */}

      <div className="official-stats-grid">

        <div className="official-stat-card">
          <div className="stat-icon pending">📋</div>
          <div className="stat-content">
            <h3>{stats.pendingPetitions}</h3>
            <p>Pending Petitions</p>
          </div>
        </div>

        <div className="official-stat-card">
          <div className="stat-icon polls">📊</div>
          <div className="stat-content">
            <h3>{stats.totalPolls}</h3>
            <p>Active Polls</p>
          </div>
        </div>

        <div className="official-stat-card">
          <div className="stat-icon reports">📝</div>
          <div className="stat-content">
            <h3>{stats.totalReports}</h3>
            <p>Total Reports</p>
          </div>
        </div>

        <div className="official-stat-card">
          <div className="stat-icon citizens">👥</div>
          <div className="stat-content">
            <h3>{stats.totalCitizens}</h3>
            <p>Registered Citizens</p>
          </div>
        </div>

      </div>

      {/* PETITIONS REVIEW */}

      <div className="official-section">

        <h3 className="section-title">Petitions Review</h3>

        {pendingPetitions.length === 0 ? (

          <div className="official-card">
            <p style={{ textAlign: "center", color: "#718096" }}>
              No pending petitions at the moment.
            </p>
          </div>

        ) : (

          <div className="petitions-list">

            {pendingPetitions.map((petition) => (

              <div key={petition._id} className="petition-review-card">

                <div className="petition-info">

                  <h4>{petition.title}</h4>

                  <p>{petition.description || "No description provided."}</p>

                  <div className="petition-meta">

                    <span className="signature-count">
                      ✍️ {petition.signatures || 0} signatures
                    </span>

                    <span className="petition-date">
                      📅 {new Date(petition.createdAt).toLocaleDateString()}
                    </span>

                    <StatusBadge status={petition.status} />

                  </div>

                </div>

                <div className="petition-actions">

                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(petition._id)}
                  >
                    ✓ Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => handleReject(petition._id)}
                  >
                    ✗ Reject
                  </button>

                  <button
                    className="approve-btn"
                    onClick={() => handleEdit(petition._id)}
                  >
                    ✎ Edit
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => handleDelete(petition._id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ACTION CARDS */}

      <div className="official-grid">

        {[
          "Department Performance",
          "Public Sentiment Analytics",
          "Generate Reports",
          "System Settings"
        ].map((title, i) => (

          <div key={i} className="official-card clickable">

            <div className="card-icon">
              {["📈", "💭", "📄", "⚙️"][i]}
            </div>

            <h3>{title}</h3>

            <p>Some description for {title}.</p>

            <div className="card-footer">
              <span className="view-link">View →</span>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default OfficialDashboard;