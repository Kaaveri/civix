// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
// import "../styles/Dashboard.css";

// const CitizenDashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const isMainDashboard = location.pathname === "/dashboard";

//   return (
//     <div className="dashboard-container">

//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-logo">
//           <svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="40" cy="40" r="38" stroke="white" strokeWidth="4"/>
//             <path d="M40 15 L40 35 M40 45 L40 65" stroke="white" strokeWidth="4" strokeLinecap="round"/>
//             <circle cx="40" cy="40" r="5" fill="white"/>
//             <path d="M25 30 L40 40 L55 30" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
//             <path d="M25 50 L40 40 L55 50" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </div>
//         <h3 className="logo">CiviX Portal</h3>

//         <NavLink to="/dashboard" end className="nav-item">
//           Dashboard
//         </NavLink>

//         <div className="menu-section">
//           <button
//             className="menu-toggle"
//             onClick={() => setOpenMenu(!openMenu)}
//           >
//             Public Management ▾
//           </button>

//           {openMenu && (
//             <div className="submenu">
//               <NavLink to="/dashboard/petitions" className="nav-item">
//                 Petitions
//               </NavLink>
//               <NavLink to="/dashboard/polls" className="nav-item">
//                 Polls
//               </NavLink>
//               <NavLink to="/dashboard/reports" className="nav-item">
//                 Reports
//               </NavLink>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">

//         <div className="header">
//           <div>
//             <p className="welcome-text">Welcome back,</p>
//             <h2>{user?.name || "Citizen"}</h2>
//           </div>

//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         {isMainDashboard && (
//           <>
//             {/* Welcome Banner */}
//             <div className="welcome-banner">
//               <div className="banner-content">
//                 <h3>🎯 Your Civic Engagement Hub</h3>
//                 <p>Make your voice heard. Shape your community.</p>
//               </div>
//             </div>

//             {/* Stats Grid */}
//             <div className="stats-grid">
//               <div className="stat-card stat-purple">
//                 <div className="stat-icon">📋</div>
//                 <div className="stat-info">
//                   <p className="stat-label">Active Petitions</p>
//                   <h3 className="stat-value">42</h3>
//                 </div>
//               </div>

//               <div className="stat-card stat-green">
//                 <div className="stat-icon">📊</div>
//                 <div className="stat-info">
//                   <p className="stat-label">Participation Rate</p>
//                   <h3 className="stat-value">76%</h3>
//                 </div>
//               </div>

//               <div className="stat-card stat-blue">
//                 <div className="stat-icon">✅</div>
//                 <div className="stat-info">
//                   <p className="stat-label">Resolved Issues</p>
//                   <h3 className="stat-value">128</h3>
//                 </div>
//               </div>

//               <div className="stat-card stat-orange">
//                 <div className="stat-icon">🗳️</div>
//                 <div className="stat-info">
//                   <p className="stat-label">Active Polls</p>
//                   <h3 className="stat-value">8</h3>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="quick-actions">
//               <h4 className="section-title">Quick Actions</h4>
//               <div className="action-grid">
//                 <div className="action-card" onClick={() => navigate("/dashboard/petitions")}>
//                   <div className="action-icon">✍️</div>
//                   <h5>Create Petition</h5>
//                   <p>Start a new petition</p>
//                 </div>

//                 <div className="action-card" onClick={() => navigate("/dashboard/polls")}>
//                   <div className="action-icon">🗳️</div>
//                   <h5>Vote on Polls</h5>
//                   <p>Share your opinion</p>
//                 </div>

//                 <div className="action-card" onClick={() => navigate("/dashboard/reports")}>
//                   <div className="action-icon">📝</div>
//                   <h5>Report Issue</h5>
//                   <p>Report a problem</p>
//                 </div>

//                 <div className="action-card" onClick={() => navigate("/dashboard/petitions")}>
//                   <div className="action-icon">👁️</div>
//                   <h5>View Petitions</h5>
//                   <p>Browse all petitions</p>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Activity – Petitions */}
//             <div className="recent-activity">
//               <h4 className="section-title">🔥 Trending Petitions</h4>
//               <div className="activity-list">
//                 <div
//                   className="activity-item"
//                   onClick={() => navigate("/dashboard/petitions")}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="activity-icon">🚧</div>
//                   <div className="activity-content">
//                     <h5>Road Repair Initiative</h5>
//                     <p>1,420 signatures • 2 days ago</p>
//                   </div>
//                   <div className="activity-badge trending">Trending</div>
//                 </div>

//                 <div
//                   className="activity-item"
//                   onClick={() => navigate("/dashboard/petitions")}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="activity-icon">📚</div>
//                   <div className="activity-content">
//                     <h5>New Public Library</h5>
//                     <p>980 signatures • 5 days ago</p>
//                   </div>
//                   <div className="activity-badge hot">Hot</div>
//                 </div>

//                 <div
//                   className="activity-item"
//                   onClick={() => navigate("/dashboard/petitions")}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="activity-icon">♻️</div>
//                   <div className="activity-content">
//                     <h5>Waste Management System</h5>
//                     <p>2,310 signatures • 1 week ago</p>
//                   </div>
//                   <div className="activity-badge popular">Popular</div>
//                 </div>
//               </div>
//             </div>

//             {/* Trending Polls */}
//             <div className="recent-activity" style={{ marginTop: 16 }}>
//               <h4 className="section-title">📊 Trending Polls</h4>
//               <div className="activity-list">
//                 <div
//                   className="activity-item"
//                   onClick={() => navigate("/dashboard/polls")}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="activity-icon">🏙️</div>
//                   <div className="activity-content">
//                     <h5>Smart Street Lighting</h5>
//                     <p>2,340 votes • closes in 2 days</p>
//                   </div>
//                   <div className="activity-badge trending">Live</div>
//                 </div>

//                 <div
//                   className="activity-item"
//                   onClick={() => navigate("/dashboard/polls")}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="activity-icon">🚍</div>
//                   <div className="activity-content">
//                     <h5>Weekend Bus Frequency</h5>
//                     <p>1,120 votes • closes in 5 days</p>
//                   </div>
//                   <div className="activity-badge hot">High interest</div>
//                 </div>

//                 <div
//                   className="activity-item"
//                   onClick={() => navigate("/dashboard/polls")}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="activity-icon">🌳</div>
//                   <div className="activity-content">
//                     <h5>New Park Location</h5>
//                     <p>860 votes • results published</p>
//                   </div>
//                   <div className="activity-badge popular">Completed</div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         <Outlet />

//       </div>
//     </div>
//   );
// };

// export default CitizenDashboard;



import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/Dashboard.css";

const CitizenDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <svg width="50" height="50" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="white" strokeWidth="4"/>
            <path d="M40 15 L40 35 M40 45 L40 65" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="40" cy="40" r="5" fill="white"/>
            <path d="M25 30 L40 40 L55 30" stroke="white" strokeWidth="3"/>
            <path d="M25 50 L40 40 L55 50" stroke="white" strokeWidth="3"/>
          </svg>
        </div>

        <h3 className="logo">CiviX Portal</h3>

        <NavLink to="/dashboard" end className="nav-item">
          Dashboard
        </NavLink>

        <div className="menu-section">
          <button
            className="menu-toggle"
            onClick={() => setOpenMenu(!openMenu)}
          >
            Public Management ▾
          </button>

          {openMenu && (
            <div className="submenu">
              <NavLink to="/dashboard/petitions" className="nav-item">
                Petitions
              </NavLink>

              <NavLink to="/dashboard/polls" className="nav-item">
                Polls
              </NavLink>

              <NavLink to="/dashboard/reports" className="nav-item">
                Reports
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <div className="header">
          <div>
            <p className="welcome-text">Welcome back,</p>
            <h2>{user?.name || "Citizen"}</h2>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {isMainDashboard && (
          <>
            {/* Welcome Banner */}
            <div className="welcome-banner">
              <div className="banner-content">
                <h3>🎯 Your Civic Engagement Hub</h3>
                <p>Make your voice heard. Shape your community.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">

              <div className="stat-card stat-purple">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <p className="stat-label">Active Petitions</p>
                  <h3 className="stat-value">42</h3>
                </div>
              </div>

              <div className="stat-card stat-green">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <p className="stat-label">Participation Rate</p>
                  <h3 className="stat-value">76%</h3>
                </div>
              </div>

              <div className="stat-card stat-blue">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <p className="stat-label">Resolved Issues</p>
                  <h3 className="stat-value">128</h3>
                </div>
              </div>

              <div className="stat-card stat-orange">
                <div className="stat-icon">🗳️</div>
                <div className="stat-info">
                  <p className="stat-label">Active Polls</p>
                  <h3 className="stat-value">8</h3>
                </div>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h4 className="section-title">Quick Actions</h4>

              <div className="action-grid">

                {/* FIXED CREATE PETITION ROUTE */}
                <div
                  className="action-card"
                  onClick={() => navigate("/petitions/create")}
                >
                  <div className="action-icon">✍️</div>
                  <h5>Create Petition</h5>
                  <p>Start a new petition</p>
                </div>

                <div
                  className="action-card"
                  onClick={() => navigate("/dashboard/polls")}
                >
                  <div className="action-icon">🗳️</div>
                  <h5>Vote on Polls</h5>
                  <p>Share your opinion</p>
                </div>

                <div
                  className="action-card"
                  onClick={() => navigate("/dashboard/reports")}
                >
                  <div className="action-icon">📝</div>
                  <h5>Report Issue</h5>
                  <p>Report a problem</p>
                </div>

                <div
                  className="action-card"
                  onClick={() => navigate("/dashboard/petitions")}
                >
                  <div className="action-icon">👁️</div>
                  <h5>View Petitions</h5>
                  <p>Browse all petitions</p>
                </div>

              </div>
            </div>

            {/* Trending Petitions */}
            <div className="recent-activity">
              <h4 className="section-title">🔥 Trending Petitions</h4>

              <div className="activity-list">

                <div
                  className="activity-item"
                  onClick={() => navigate("/dashboard/petitions")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="activity-icon">🚧</div>
                  <div className="activity-content">
                    <h5>Road Repair Initiative</h5>
                    <p>1,420 signatures • 2 days ago</p>
                  </div>
                  <div className="activity-badge trending">Trending</div>
                </div>

                <div
                  className="activity-item"
                  onClick={() => navigate("/dashboard/petitions")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="activity-icon">📚</div>
                  <div className="activity-content">
                    <h5>New Public Library</h5>
                    <p>980 signatures • 5 days ago</p>
                  </div>
                  <div className="activity-badge hot">Hot</div>
                </div>

                <div
                  className="activity-item"
                  onClick={() => navigate("/dashboard/petitions")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="activity-icon">♻️</div>
                  <div className="activity-content">
                    <h5>Waste Management System</h5>
                    <p>2,310 signatures • 1 week ago</p>
                  </div>
                  <div className="activity-badge popular">Popular</div>
                </div>

              </div>
            </div>

            {/* Trending Polls */}
            <div className="recent-activity" style={{ marginTop: 16 }}>
              <h4 className="section-title">📊 Trending Polls</h4>

              <div className="activity-list">

                <div
                  className="activity-item"
                  onClick={() => navigate("/dashboard/polls")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="activity-icon">🏙️</div>
                  <div className="activity-content">
                    <h5>Smart Street Lighting</h5>
                    <p>2,340 votes • closes in 2 days</p>
                  </div>
                  <div className="activity-badge trending">Live</div>
                </div>

                <div
                  className="activity-item"
                  onClick={() => navigate("/dashboard/polls")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="activity-icon">🚍</div>
                  <div className="activity-content">
                    <h5>Weekend Bus Frequency</h5>
                    <p>1,120 votes • closes in 5 days</p>
                  </div>
                  <div className="activity-badge hot">High interest</div>
                </div>

                <div
                  className="activity-item"
                  onClick={() => navigate("/dashboard/polls")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="activity-icon">🌳</div>
                  <div className="activity-content">
                    <h5>New Park Location</h5>
                    <p>860 votes • results published</p>
                  </div>
                  <div className="activity-badge popular">Completed</div>
                </div>

              </div>
            </div>
          </>
        )}

        <Outlet />

      </div>
    </div>
  );
};

export default CitizenDashboard;