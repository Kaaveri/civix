import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Trash2, Edit } from 'lucide-react';
import { usePoll } from '../context/PollContext';
import './PollsPage.css';

const totalVotes = (poll) => poll.options.reduce((s, o) => s + o.votes, 0);
const leadingOption = (poll) => poll.options.reduce((a, b) => (a.votes > b.votes ? a : b));

export default function PollsPage() {
    const { polls, votedPolls, closePoll, deletePoll, ISSUES } = usePoll();
    const navigate = useNavigate();

    const [search, setSearch]           = useState('');
    const [statusFilter, setStatusFilter]     = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Delete confirm modal state
    const [showModal, setShowModal]   = useState(false);
    const [deleteId, setDeleteId]     = useState(null);
    const [deleteInput, setDeleteInput] = useState('');

    const filtered = useMemo(() => {
        return polls.filter(p => {
            const q = search.toLowerCase();
            const matchSearch =
                p.title.toLowerCase().includes(q) ||
                (p.tags && p.tags.join(' ').toLowerCase().includes(q));
            const matchStatus   = statusFilter === 'all'   || p.status === statusFilter;
            const matchCategory = categoryFilter === 'all' || p.issue === categoryFilter;
            return matchSearch && matchStatus && matchCategory;
        });
    }, [polls, search, statusFilter, categoryFilter]);

    const openDelete = (id) => { setDeleteId(id); setDeleteInput(''); setShowModal(true); };
    const confirmDelete = () => {
        if (deleteInput.trim().toUpperCase() !== 'DELETE') {
            alert('Type DELETE to confirm'); return;
        }
        deletePoll(deleteId);
        setShowModal(false); setDeleteId(null); setDeleteInput('');
    };

    return (
        <div className="pp-container">

            {/* HEADER */}
            <div className="pp-header-row">
                <h1 className="pp-heading">Polls Dashboard</h1>
                <div className="pp-header-actions">
                    <button className="pp-back-btn" onClick={() => navigate('/dashboard')}>
                        ← Back to Dashboard
                    </button>
                    <Link to="/create" className="pp-create-btn">
                        + Create Poll
                    </Link>
                </div>
            </div>

            {/* FILTERS */}
            <div className="pp-filter-row">
                <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pp-search"
                />
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="pp-select"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                </select>
                <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="pp-select"
                >
                    <option value="all">All Categories</option>
                    {ISSUES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>

            {/* POLL CARDS */}
            {filtered.length === 0 ? (
                <div className="pp-empty">
                    <div className="pp-empty-icon">🗳️</div>
                    <h3>No polls found</h3>
                    <p>Try adjusting your filters or <Link to="/create">create a new poll</Link>.</p>
                </div>
            ) : (
                <div className="pp-grid">
                    {filtered.map(poll => (
                        <PollCard
                            key={poll.id}
                            poll={poll}
                            voted={!!votedPolls[poll.id]}
                            onClose={() => closePoll(poll.id)}
                            onDelete={() => openDelete(poll.id)}
                        />
                    ))}
                </div>
            )}

            {/* DELETE MODAL */}
            {showModal && (
                <div className="pp-modal-overlay">
                    <div className="pp-modal">
                        <h3>Confirm Delete</h3>
                        <p>Type <b>DELETE</b> to confirm deletion of this poll.</p>
                        <input
                            type="text"
                            placeholder="Type DELETE"
                            value={deleteInput}
                            onChange={e => setDeleteInput(e.target.value)}
                            className="pp-modal-input"
                        />
                        <div className="pp-modal-actions">
                            <button className="pp-confirm-btn" onClick={confirmDelete}>Delete</button>
                            <button className="pp-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function PollCard({ poll, voted, onClose, onDelete }) {
    const total   = totalVotes(poll);
    const leading = leadingOption(poll);
    const pct     = total > 0 ? Math.round((leading.votes / total) * 100) : 0;
    const location = poll.tags && poll.tags[0] ? poll.tags[0] : '';

    return (
        <div className="pp-card">
            {/* Card Header */}
            <div className={`pp-card-header ${voted ? 'pp-card-header-voted' : ''}`}>
                <h3 className="pp-card-title">{poll.title}</h3>
                <span className={`pp-status ${poll.status === 'active' ? 'pp-active' : 'pp-closed'}`}>
                    {poll.status === 'active' ? 'Active' : 'Closed'}
                </span>
            </div>

            {/* Location */}
            {location && <p className="pp-location">{location}</p>}

            {/* Category tag */}
            {poll.issue && (
                <span className="pp-category">{poll.issue}</span>
            )}

            {/* Progress section */}
            <div className="pp-progress-section">
                <p className="pp-votes-text">{total} total votes</p>
                <div className="pp-progress-bar">
                    <div className="pp-progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <p className="pp-leading-text">
                    Leading: <strong>{leading.text}</strong> — {pct}%
                </p>
            </div>

            {/* Voted badge */}
            {voted && (
                <div className="pp-voted-ribbon">✓ Voted</div>
            )}

            {/* Actions */}
            <div className="pp-actions">
                <Link to={`/poll/${poll.id}`}>
                    <button className="pp-view-btn">
                        <Eye size={15} /> View
                    </button>
                </Link>
                {poll.status === 'active' && (
                    <button className="pp-edit-btn" onClick={onClose} title="Close this poll">
                        <Edit size={15} /> Close
                    </button>
                )}
                <button className="pp-delete-btn" onClick={onDelete}>
                    <Trash2 size={15} /> Delete
                </button>
            </div>
        </div>
    );
}
