import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoll } from '../context/PollContext';
import './CreatePollPage.css';

export default function CreatePollPage() {
    const navigate = useNavigate();
    const { createPoll, ISSUES } = usePoll();

    const [form, setForm] = useState({
        title: '',
        description: '',
        issue: '',
        location: '',
        createdBy: 'Official',
        endDate: '',
    });
    const [options, setOptions] = useState(['', '']);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Poll title is required';
        const validOpts = options.filter(o => o.trim());
        if (validOpts.length < 2) e.options = 'At least 2 options are required';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 600));

        let durationDays = 7;
        if (form.endDate) {
            const diff = new Date(form.endDate) - new Date();
            durationDays = Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
        }

        const tags = form.location ? [form.location] : [];
        const id = createPoll({
            title: form.title,
            description: form.description,
            issue: form.issue,
            durationDays,
            tags,
            options: options.filter(o => o.trim()),
        });
        navigate('/dashboard/polls');
    };

    const addOption = () => {
        if (options.length < 6) setOptions(prev => [...prev, '']);
    };

    const removeOption = (i) => {
        if (options.length <= 2) return;
        setOptions(prev => prev.filter((_, idx) => idx !== i));
    };

    const setOption = (i, val) => {
        setOptions(prev => prev.map((o, idx) => idx === i ? val : o));
    };

    const clearError = (key) => setErrors(prev => {
        const n = { ...prev }; delete n[key]; return n;
    });

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="ccp-page">
            <div className="ccp-wrapper">
                <div className="ccp-card">

                    {/* Header */}
                    <div className="ccp-header">
                        <div className="ccp-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <rect x="2" y="2" width="20" height="20" rx="3" fill="white" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="ccp-title">Create New Poll</h1>
                            <p className="ccp-subtitle">Create a community poll to gather public opinion.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} id="create-poll-form">

                        {/* Poll Title */}
                        <div className="ccp-field">
                            <label className="ccp-label" htmlFor="ccp-poll-title">POLL TITLE *</label>
                            <input
                                id="ccp-poll-title"
                                className={`ccp-input ${errors.title ? 'ccp-input-error' : ''}`}
                                placeholder="Enter the poll question..."
                                value={form.title}
                                onChange={e => { setForm(f => ({ ...f, title: e.target.value })); clearError('title'); }}
                                maxLength={200}
                            />
                            {errors.title && <span className="ccp-error">{errors.title}</span>}
                        </div>

                        {/* Description — full width */}
                        <div className="ccp-field">
                            <label className="ccp-label" htmlFor="ccp-desc">DESCRIPTION</label>
                            <textarea
                                id="ccp-desc"
                                className="ccp-textarea"
                                placeholder="Provide context for this poll..."
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                maxLength={600}
                            />
                        </div>

                        {/* Category + Location — side by side */}
                        <div className="ccp-two-col">
                            <div className="ccp-field">
                                <label className="ccp-label" htmlFor="ccp-issue">CATEGORY</label>
                                <select
                                    id="ccp-issue"
                                    className={`ccp-select ${errors.issue ? 'ccp-input-error' : ''}`}
                                    value={form.issue}
                                    onChange={e => { setForm(f => ({ ...f, issue: e.target.value })); clearError('issue'); }}
                                >
                                    <option value="">Select a category...</option>
                                    {ISSUES.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                                {errors.issue && <span className="ccp-error">{errors.issue}</span>}
                            </div>
                            <div className="ccp-field">
                                <label className="ccp-label" htmlFor="ccp-location">LOCATION *</label>
                                <input
                                    id="ccp-location"
                                    className="ccp-input ccp-input-highlight"
                                    placeholder="e.g. Salem"
                                    value={form.location}
                                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* End Date + Created By — side by side */}
                        <div className="ccp-two-col">
                            <div className="ccp-field">
                                <label className="ccp-label" htmlFor="ccp-end-date">END DATE (OPTIONAL)</label>
                                <input
                                    id="ccp-end-date"
                                    type="date"
                                    className="ccp-input"
                                    value={form.endDate}
                                    min={today}
                                    onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                                />
                            </div>
                            <div className="ccp-field">
                                <label className="ccp-label" htmlFor="ccp-created-by">CREATED BY</label>
                                <input
                                    id="ccp-created-by"
                                    className="ccp-input"
                                    placeholder="Official"
                                    value={form.createdBy}
                                    onChange={e => setForm(f => ({ ...f, createdBy: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* Poll Options */}
                        <div className="ccp-field">
                            <label className="ccp-label">
                                POLL OPTIONS * (MIN 2, MAX 6)
                                {errors.options && <span className="ccp-error" style={{ marginLeft: 8, textTransform: 'none', fontWeight: 400 }}>{errors.options}</span>}
                            </label>

                            <div className="ccp-options-list">
                                {options.map((opt, i) => (
                                    <div key={i} className="ccp-option-row">
                                        <input
                                            id={`ccp-option-${i}`}
                                            className={`ccp-input ccp-option-input ${opt ? 'ccp-option-filled' : ''}`}
                                            placeholder={`Option ${i + 1}`}
                                            value={opt}
                                            onChange={e => setOption(i, e.target.value)}
                                            maxLength={100}
                                        />
                                        {options.length > 2 && (
                                            <button
                                                type="button"
                                                className="ccp-remove-btn"
                                                onClick={() => removeOption(i)}
                                                title="Remove option"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {options.length < 6 && (
                                <button
                                    type="button"
                                    className="ccp-add-option-btn"
                                    onClick={addOption}
                                    id="ccp-add-option-btn"
                                >
                                    + Add Option
                                </button>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="ccp-actions">
                            <button
                                type="button"
                                className="ccp-btn-cancel"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ccp-btn-submit"
                                disabled={submitting}
                                id="ccp-submit-btn"
                            >
                                {submitting ? (
                                    <>
                                        <span className="ccp-spinner" />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Poll'
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
