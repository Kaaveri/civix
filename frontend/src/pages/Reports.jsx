import { useState } from "react";
import API from "../services/api";
import "../styles/Reports.css";

const Reports = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Infrastructure",
    location: ""
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/reports", formData);
      setMessage("success");
      setFormData({ title: "", description: "", category: "Infrastructure", location: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("error");
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div className="reports-container">
      <h3 className="reports-heading">📋 Report an Issue</h3>

      <div className="reports-wrapper">
        {message && (
          <div className={`message ${message === "success" ? "success" : "error"}`}>
            {message === "success" 
              ? "✓ Report submitted successfully! We'll review it within 48 hours."
              : "✗ Failed to submit report. Please try again."}
          </div>
        )}

        <div className="report-card">
          <h4>Submit a New Report</h4>
          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-group">
              <label className="form-label">Issue Title</label>
              <input
                type="text"
                placeholder="Brief title of the issue"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                placeholder="Detailed description of the issue"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-select"
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="Safety">Safety</option>
                <option value="Environment">Environment</option>
                <option value="Public Services">Public Services</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                placeholder="Location of the issue"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Report
            </button>
          </form>
        </div>

        <div className="report-card">
          <h4>📌 Report Guidelines</h4>
          <ul className="guidelines-list">
            <li>Provide clear and accurate information</li>
            <li>Include specific location details</li>
            <li>Attach photos if possible (feature coming soon)</li>
            <li>Reports are reviewed within 48 hours</li>
            <li>You'll receive updates via email</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
