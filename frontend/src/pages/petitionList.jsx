import "../pages/PetitionList.css";

function PetitionList() {
  const petitions = [
    {
      id: 1,
      title: "Improve Local Park Facilities",
      author: "Jane Smith",
      signatures: 145,
      goal: 200,
      category: "Environment",
      description: "We need better maintenance and new equipment for Riverside Park."
    },
    {
      id: 2,
      title: "Better Public Transportation",
      author: "John Davis",
      signatures: 287,
      goal: 300,
      category: "Infrastructure",
      description: "Expand bus routes and increase frequency in underserved areas."
    },
    {
      id: 3,
      title: "Increase School Funding",
      author: "Emily Johnson",
      signatures: 456,
      goal: 500,
      category: "Education",
      description: "Support teachers and improve resources for our children's education."
    }
  ];

  return (
    <div className="petition-list-container">
      <div className="petition-list-wrapper">
        <div className="petition-list-header">
          <h2>Active Petitions</h2>
          <p>Support causes that matter to your community</p>
        </div>

        <div className="petition-list-content">
          {petitions.length > 0 ? (
            petitions.map((petition) => (
              <div key={petition.id} className="petition-card">
                <div className="petition-card-header">
                  <h3>{petition.title}</h3>
                  <div className="petition-card-meta">
                    <span>By {petition.author}</span>
                    <span>{petition.category}</span>
                  </div>
                </div>
                <div className="petition-card-body">
                  <p className="petition-card-description">{petition.description}</p>
                  <div className="petition-card-stats">
                    <div className="stat">
                      <div className="stat-number">{petition.signatures}</div>
                      <div className="stat-label">Signatures</div>
                    </div>
                    <div className="stat">
                      <div className="stat-number">{petition.goal}</div>
                      <div className="stat-label">Goal</div>
                    </div>
                    <div className="stat">
                      <div className="stat-number">
                        {Math.round((petition.signatures / petition.goal) * 100)}%
                      </div>
                      <div className="stat-label">Progress</div>
                    </div>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "#e0e0e0", borderRadius: "3px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${Math.min((petition.signatures / petition.goal) * 100, 100)}%`,
                        height: "100%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        transition: "width 0.3s ease"
                      }}
                    />
                  </div>
                </div>
                <div className="petition-card-footer">
                  <button className="petition-action-btn">Sign Petition</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-petitions">
              <p>No active petitions at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PetitionList;