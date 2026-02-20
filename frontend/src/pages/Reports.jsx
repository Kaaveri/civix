import "../pages/Reports.css";

function Reports() {
  return (
    <div className="reports-container">
      <div className="reports-wrapper">
        <div className="reports-header">
          <h2>Reports & Analytics</h2>
          <p>Track engagement and impact across the platform</p>
        </div>

        <div className="reports-grid">
          {/* Petition Report Card */}
          <div className="report-card">
            <div className="report-card-header">
              <div className="report-icon">📋</div>
              <div className="report-header-text">
                <h3>Petitions</h3>
                <p>Active campaigns</p>
              </div>
            </div>
            <div className="report-card-body">
              <div className="report-stat">
                <span className="report-stat-label">Total Petitions</span>
                <span className="report-stat-value">24</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">Active Campaigns</span>
                <span className="report-stat-value">8</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">Total Signatures</span>
                <span className="report-stat-value">2,341</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">Avg. Signatures/Petition</span>
                <span className="report-stat-value">98</span>
              </div>
            </div>
          </div>

          {/* Polls Report Card */}
          <div className="report-card">
            <div className="report-card-header">
              <div className="report-icon">📊</div>
              <div className="report-header-text">
                <h3>Polls</h3>
                <p>Community feedback</p>
              </div>
            </div>
            <div className="report-card-body">
              <div className="report-stat">
                <span className="report-stat-label">Total Polls</span>
                <span className="report-stat-value">15</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">Active Polls</span>
                <span className="report-stat-value">3</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">Total Responses</span>
                <span className="report-stat-value">1,246</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">Avg. Participation</span>
                <span className="report-stat-value">83</span>
              </div>
            </div>
          </div>

          {/* User Report Card */}
          <div className="report-card">
            <div className="report-card-header">
              <div className="report-icon">👥</div>
              <div className="report-header-text">
                <h3>Users</h3>
                <p>Community engagement</p>
              </div>
            </div>
            <div className="report-card-body">
              <div className="report-stat">
                <span className="report-stat-label">Total Users</span>
                <span className="report-stat-value">342</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">Active Users</span>
                <span className="report-stat-value">187</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">New This Month</span>
                <span className="report-stat-value">34</span>
              </div>
              <div className="report-stat">
                <span className="report-stat-label">Engagement Rate</span>
                <span className="report-stat-value">54.7%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="report-chart-container">
          <h2 className="report-chart-title">Engagement Trends</h2>
          <div className="chart-placeholder">
            <p>Signature & Poll Response Trends Chart</p>
            <p style={{ fontSize: "0.9em", marginTop: "10px" }}>Monthly activity visualization</p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="reports-summary">
          <h2 className="summary-title">Platform Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-item-value">2,341</div>
              <div className="summary-item-label">Total Signatures</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-value">1,246</div>
              <div className="summary-item-label">Poll Responses</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-value">342</div>
              <div className="summary-item-label">Community Members</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-value">+24%</div>
              <div className="summary-item-label">Growth This Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;