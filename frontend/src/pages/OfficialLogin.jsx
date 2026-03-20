import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

const dummySentimentData = [
  { time: '10 AM', positive: 60, neutral: 20, negative: 20 },
  { time: '11 AM', positive: 65, neutral: 15, negative: 20 },
  { time: '12 PM', positive: 55, neutral: 25, negative: 20 },
  { time: '1 PM', positive: 70, neutral: 20, negative: 10 },
  { time: '2 PM', positive: 75, neutral: 15, negative: 10 },
];

const dummyVoteDist = [
  { name: 'Strongly Support', votes: 420 },
  { name: 'Support /w terms', votes: 280 },
  { name: 'Neutral', votes: 155 },
  { name: 'Oppose', votes: 140 }
];

const OPTION_COLORS = [
    'rgba(139,92,246,0.85)', 'rgba(99,102,241,0.85)',
    'rgba(6,182,212,0.85)', 'rgba(236,72,153,0.85)'
];

const lastSent = { positive: 80, neutral: 5, negative: 15 };
const domSentiment = 'positive';

const OfficialLogin = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeChart, setActiveChart] = useState('line');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {

      const res = await API.post("/auth/login/official", {
        email,
        password
      });

      const user = res.data;

      if (!user || !user.role) {
        setError("Invalid credentials");
        return;
      }

      // Ensure role is official
      if (user.role !== "OFFICIAL") {
        setError("Only officials can login here");
        return;
      }

      // Save user in context
      login(user);

      // Redirect to official dashboard
      navigate("/official-dashboard");

    } catch (err) {

      console.error("Official login error:", err);

      if (err.response?.status === 400) {
        setError("Invalid email or password");
      } else if (err.response?.status === 403) {
        setError("You are not registered as an official");
      } else if (err.response?.status === 404) {
        setError("User not found. Please register first.");
      } else {
        setError("Login failed. Please try again.");
      }

    }
  };

  return (
    <div className="auth-container" style={{ gap: '40px', flexWrap: 'wrap', padding: '60px 40px', height: 'auto', minHeight: '100vh', alignItems: 'center' }}>
      <div className="auth-card" style={{ flexShrink: 0 }}>

        <h2>Official Login</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button official-btn">
            Login
          </button>

        </form>

        <div className="auth-links">
          <Link to="/forgotpassword">Forgot Password?</Link>
          <Link to="/register">Register</Link>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '700px' }}>
        
        {/* Current sentiment */}
        <div className="auth-card" style={{ width: '100%', padding: '24px', textAlign: 'left', gridColumn: 'span 1' }}>
            <h3 style={{ marginBottom: '16px', color: '#2d3748', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>Live Sentiment</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(5, 150, 105, 0.2)', background: 'rgba(5, 150, 105, 0.08)' }}>
                <span style={{ fontSize: '28px' }}>
                    👍
                </span>
                <div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#12101f' }}>Positive</div>
                    <div style={{ fontSize: '11px', color: '#8f8dab', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Dominant Mood</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                    { key: 'positive', label: 'Positive', value: lastSent.positive || 0, color: '#10b981' },
                    { key: 'neutral', label: 'Neutral', value: lastSent.neutral || 0, color: '#f59e0b' },
                    { key: 'negative', label: 'Negative', value: lastSent.negative || 0, color: '#ef4444' },
                ].map(s => (
                    <div key={s.key} style={{ display: 'block' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#4b4870', marginBottom: '6px' }}>
                            <span>{s.label}</span>
                            <span style={{ color: s.color, fontWeight: '700' }}>{s.value}%</span>
                        </div>
                        <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${s.value}%`, background: s.color, height: '100%', borderRadius: '3px' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Votes by option */}
        <div className="auth-card" style={{ width: '100%', padding: '24px', gridColumn: 'span 1' }}>
            <h3 style={{ marginBottom: '20px', color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Vote Distribution</h3>
            <ResponsiveContainer width="100%" height={230}>
                <BarChart
                    layout="vertical"
                    data={dummyVoteDist}
                    margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} width={85} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, color: '#2d3748', fontSize: 12 }} />
                    <Bar dataKey="votes" radius={[0, 4, 4, 0]}>
                        {dummyVoteDist.map((_, i) => (
                            <Cell key={i} fill={OPTION_COLORS[i % OPTION_COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Sentiment Over Time */}
        <div className="auth-card" style={{ width: '100%', padding: '24px', gridColumn: 'span 2' }}>
           <h3 style={{ marginBottom: '16px', color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Sentiment Over Time</h3>
           <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                <button 
                    style={{ 
                        padding: '6px 16px', 
                        borderRadius: '6px', 
                        border: 'none', 
                        cursor: 'pointer',
                        background: activeChart === 'line' ? '#667eea' : '#e2e8f0',
                        color: activeChart === 'line' ? 'white' : '#4a5568',
                        fontWeight: '600'
                    }} 
                    onClick={() => setActiveChart('line')}
                >
                    Line
                </button>
                <button 
                    style={{ 
                        padding: '6px 16px', 
                        borderRadius: '6px', 
                        border: 'none', 
                        cursor: 'pointer',
                        background: activeChart === 'bar' ? '#667eea' : '#e2e8f0',
                        color: activeChart === 'bar' ? 'white' : '#4a5568',
                        fontWeight: '600'
                    }} 
                    onClick={() => setActiveChart('bar')}
                >
                    Bar
                </button>
           </div>
           
           <ResponsiveContainer width="100%" height={260}>
              {activeChart === 'line' ? (
                 <LineChart data={dummySentimentData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" tick={{fill: '#718096', fontSize: 11}} />
                    <YAxis tick={{fill: '#718096', fontSize: 11}} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, color: '#2d3748', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={3} />
                    <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={3} />
                 </LineChart>
              ) : (
                 <BarChart data={dummySentimentData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" tick={{fill: '#718096', fontSize: 11}} />
                    <YAxis tick={{fill: '#718096', fontSize: 11}} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, color: '#2d3748', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="positive" fill="#10b981" radius={[4,4,0,0]} />
                    <Bar dataKey="neutral" fill="#f59e0b" radius={[4,4,0,0]} />
                    <Bar dataKey="negative" fill="#ef4444" radius={[4,4,0,0]} />
                 </BarChart>
              )}
           </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default OfficialLogin;