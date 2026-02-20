import "../pages/CreatePetition.css";

function CreatePetition() {
  return (
    <div className="create-petition-container">
      <div className="create-petition-wrapper">
        <div className="create-petition-header">
          <h2>Create Petition</h2>
          <p>Start a movement. Let your voice be heard.</p>
        </div>
        <form className="create-petition-form">
          <div className="petition-form-group">
            <label>Petition Title</label>
            <input type="text" placeholder="Give your petition a clear, compelling title" required />
            <p className="petition-help-text">Be specific and action-oriented</p>
          </div>

          <div className="petition-form-group">
            <label>Description</label>
            <textarea placeholder="Explain why this petition matters. What change are you seeking?" required />
            <p className="petition-help-text">Include relevant context and background information</p>
          </div>

          <div className="petition-form-group">
            <label>Target Audience</label>
            <input type="text" placeholder="Who should address this petition? (e.g., City Council, Mayor)" required />
          </div>

          <div className="petition-form-group">
            <label>Category</label>
            <select required>
              <option value="">Select a category</option>
              <option value="environment">Environment</option>
              <option value="education">Education</option>
              <option value="health">Health & Safety</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="social">Social Issues</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="petition-submit-btn">
            Create Petition
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePetition;