import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePoll } from '../context/PollContext';
import './PollDetailPage.css';

const SENTIMENT_COLORS = {
    positive: '#10b981',
    neutral: '#f59e0b',
    negative: '#ef4444',
};

const OPTION_COLORS = [
    'rgba(139,92,246,0.85)', 'rgba(99,102,241,0.85)',
    'rgba(6,182,212,0.85)', 'rgba(236,72,153,0.85)',
    'rgba(16,185,129,0.85)', 'rgba(245,158,11,0.85)',
];

const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso);
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
};

export default function PollDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { polls, votedPolls, vote, addComment, closePoll, deletePoll, deleteComment } = usePoll();
    const poll = polls.find(p => p.id === id);
    const [selectedOption, setSelectedOption] = useState(null);
    const [comment, setComment] = useState('');
    const [commenterName, setCommenterName] = useState('');
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    if (!poll) {
        return (
            <div className="poll-not-found container">
                <h2>Poll not found</h2>
                <Link to="/dashboard/polls" className="btn btn-primary">← Back to Polls</Link>
            </div>
        );
    }

    const total = poll.options.reduce((s, o) => s + o.votes, 0);
    const voted = votedPolls[poll.id];
    const canVote = poll.status === 'active' && !voted;

    const handleVote = () => {
        if (!selectedOption) return;
        const success = vote(poll.id, selectedOption);
        if (success) setVoteSubmitted(true);
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        addComment(poll.id, comment.trim(), commenterName.trim() || 'Anonymous');
        setComment('');
        setCommenterName('');
    };

    const confirmDeleteComment = () => {
        if (commentToDelete) {
            deleteComment(poll.id, commentToDelete);
            setCommentToDelete(null);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Delete this poll permanently?')) {
            deletePoll(poll.id);
            navigate('/');
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="chart-tooltip">
                <p className="tooltip-label">{label}</p>
                {payload.map(p => (
                    <p key={p.dataKey} style={{ color: p.color }}>
                        {p.name}: {p.value}%
                    </p>
                ))}
            </div>
        );
    };

    return (
        <div className="poll-detail-page">
            <div className="container">
                {/* Back */}
                <Link to="/dashboard/polls" className="back-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back to Polls
                </Link>

                <div className="poll-detail-grid">
                    {/* Left column */}
                    <div className="poll-detail-left">
                        {/* Header */}
                        <div className="poll-detail-header card animate-fade">
                            <div className="poll-detail-meta">
                                <span className="badge badge-purple">{poll.issue}</span>
                                <span className={`badge ${poll.status === 'active' ? 'badge-green' : 'badge-amber'}`}>
                                    {poll.status === 'active' ? (
                                        <><span className="live-dot" />Active</>
                                    ) : 'Closed'}
                                </span>
                                <span className="poll-date">
                                    {new Date(poll.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                            <h1 className="poll-detail-title">{poll.title}</h1>
                            <p className="poll-detail-desc">{poll.description}</p>
                            <div className="poll-tags">
                                {poll.tags.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                            <div className="poll-admin-actions">
                                {poll.status === 'active' && (
                                    <button className="btn btn-ghost btn-sm" onClick={() => closePoll(poll.id)}>Close Poll</button>
                                )}
                                <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>

                        {/* Voting */}
                        <div className="poll-vote-section card animate-fade" style={{ animationDelay: '80ms' }}>
                            <div className="section-header">
                                <h2 className="section-title">Cast Your Vote</h2>
                                <span className="total-votes">{total.toLocaleString()} votes</span>
                            </div>

                            <div className="options-list">
                                {poll.options.map((opt, i) => {
                                    const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                                    const isVoted = voted === opt.id;
                                    const isSelected = selectedOption === opt.id;
                                    return (
                                        <div
                                            key={opt.id}
                                            className={`option-item ${isSelected ? 'selected' : ''} ${voted ? 'reveal' : ''} ${isVoted ? 'user-voted' : ''}`}
                                            onClick={() => canVote && setSelectedOption(opt.id)}
                                            id={`option-${opt.id}`}
                                        >
                                            <div className="option-content">
                                                <div className="option-left">
                                                    <div className={`option-radio ${isSelected ? 'checked' : ''} ${isVoted ? 'voted' : ''}`}>
                                                        {(isSelected || isVoted) && (
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4" /></svg>
                                                        )}
                                                    </div>
                                                    <span className="option-text">{opt.text}</span>
                                                </div>
                                                {(voted || !canVote) && (
                                                    <span className="option-pct">{pct}%</span>
                                                )}
                                            </div>
                                            {(voted || !canVote) && (
                                                <div className="option-bar-bg">
                                                    <div
                                                        className="option-bar-fill"
                                                        style={{
                                                            width: `${pct}%`,
                                                            background: OPTION_COLORS[i % OPTION_COLORS.length],
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div className="option-votes-count">
                                                {voted || !canVote ? `${opt.votes.toLocaleString()} votes` : ''}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {canVote && (
                                <button
                                    className="btn btn-primary btn-lg vote-btn"
                                    onClick={handleVote}
                                    disabled={!selectedOption}
                                    id="submit-vote-btn"
                                >
                                    {voteSubmitted ? (
                                        <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>Vote Cast!</>
                                    ) : 'Submit Vote'}
                                </button>
                            )}
                            {!canVote && poll.status === 'active' && (
                                <div className="already-voted">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                                    You already voted
                                </div>
                            )}
                            {poll.status === 'closed' && (
                                <div className="poll-closed-notice">This poll is closed</div>
                            )}
                        </div>

                        {/* Comments */}
                        <div className="poll-comments card animate-fade" style={{ animationDelay: '160ms' }}>
                            <h2 className="section-title">Discussion ({poll.comments.length})</h2>

                            <form className="comment-form" onSubmit={handleComment}>
                                <input
                                    className="form-input"
                                    placeholder="Your name (optional)"
                                    value={commenterName}
                                    onChange={e => setCommenterName(e.target.value)}
                                    id="commenter-name"
                                />
                                <textarea
                                    className="form-textarea"
                                    placeholder="Share your perspective on this issue..."
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    id="comment-input"
                                    style={{ minHeight: 80 }}
                                />
                                <button type="submit" className="btn btn-secondary" disabled={!comment.trim()} id="submit-comment-btn">
                                    Post Comment
                                </button>
                            </form>

                            <div className="comments-list">
                                {poll.comments.length === 0 && (
                                    <p className="no-comments">Be the first to comment on this poll.</p>
                                )}
                                {poll.comments.map(c => (
                                    <div key={c.id} className="comment-item">
                                        <div className="comment-header">
                                            <div className="comment-avatar">{c.author.charAt(0).toUpperCase()}</div>
                                            <span className="comment-author">{c.author}</span>
                                            <span className={`badge badge-${c.sentiment === 'positive' ? 'green' : c.sentiment === 'negative' ? 'red' : 'amber'} badge-sm`}>
                                                {c.sentiment}
                                            </span>
                                            <span className="comment-time">{timeAgo(c.time)}</span>
                                            {c.isOwner && (
                                                <button 
                                                    onClick={() => setCommentToDelete(c.id)} 
                                                    style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', fontWeight: '600', cursor: 'pointer', padding: '2px 6px', borderRadius: '4px' }}
                                                    title="Delete Comment"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                        <p className="comment-text">{c.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Custom Modal for Delete Confirmation */}
            {commentToDelete && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal animate-fade-in-up">
                        <div className="custom-modal-icon pulse-red">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                        </div>
                        <h3 className="custom-modal-title">Delete your comment?</h3>
                        <p className="custom-modal-text">This action cannot be undone. Are you sure you want to permanently remove this comment from the discussion?</p>
                        <div className="custom-modal-actions">
                            <button className="btn btn-ghost" onClick={() => setCommentToDelete(null)}>Cancel</button>
                            <button className="btn btn-danger" onClick={confirmDeleteComment}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
