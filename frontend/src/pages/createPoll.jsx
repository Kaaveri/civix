import { useState } from "react";
import "../pages/CreatePoll.css";

function CreatePoll() {
  const [options, setOptions] = useState(["", ""]);
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className="create-poll-container">
      <div className="create-poll-wrapper">
        <div className="create-poll-header">
          <h2>Create Poll</h2>
          <p>Gather community insights and feedback.</p>
        </div>
        <form className="create-poll-form">
          <div className="poll-form-group">
            <label>Poll Question</label>
            <input type="text" placeholder="What would you like to ask the community?" required />
          </div>

          <div className="poll-form-group">
            <label>Description (Optional)</label>
            <textarea placeholder="Add context or details about this poll" />
          </div>

          <div className="poll-form-group">
            <label>Poll Options</label>
            <div className="poll-options">
              {options.map((option, index) => (
                <div key={index} className="poll-option-input">
                  <input
                    type="text"
                    value={option}
                    placeholder={`Option ${index + 1}`}
                    readOnly
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <div className="poll-option-input">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddOption())}
                />
              </div>
            </div>
            <button
              type="button"
              className="poll-add-option-btn"
              onClick={handleAddOption}
            >
              + Add Option
            </button>
          </div>

          <button type="submit" className="poll-submit-btn">
            Create Poll
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePoll;