import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { petitions, polls, monthlyPetitionTrend, categoryDistribution, locationEngagement } from "@/data/mockData";

const COLORS = [
  "hsl(168, 76%, 42%)",
  "hsl(38, 92%, 50%)",
  "hsl(215, 20%, 65%)",
  "hsl(280, 65%, 60%)",
  "hsl(0, 84%, 60%)",
];

const statusData = [
  { name: "Active", value: petitions.filter((p) => p.status === "active").length },
  { name: "Under Review", value: petitions.filter((p) => p.status === "under-review").length },
  { name: "Closed", value: petitions.filter((p) => p.status === "closed").length },
];

const pollParticipation = polls.map((p) => ({
  name: p.title.length > 25 ? p.title.slice(0, 25) + "..." : p.title,
  votes: p.totalVotes,
}));

const tooltipStyle = {
  backgroundColor: "hsl(217, 33%, 17%)",
  border: "1px solid hsl(217, 33%, 25%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 98%)",
};

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Comprehensive civic engagement insights</p>
      </div>

      {/* Petition Analytics */}
      <h2 className="text-lg font-heading font-semibold text-foreground">📈 Petition Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Breakdown */}
        <div className="glass-card p-5">
          <h3 className="font-heading font-semibold text-foreground mb-4">Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="glass-card p-5">
          <h3 className="font-heading font-semibold text-foreground mb-4">Monthly Petition Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyPetitionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 25%)" />
              <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="hsl(168, 76%, 42%)" strokeWidth={2} dot={{ fill: "hsl(168, 76%, 42%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="glass-card p-5">
          <h3 className="font-heading font-semibold text-foreground mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 25%)" />
              <XAxis type="number" stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <YAxis type="category" dataKey="category" stroke="hsl(215, 20%, 65%)" fontSize={11} width={90} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="hsl(168, 76%, 42%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Poll Analytics */}
      <h2 className="text-lg font-heading font-semibold text-foreground">🗳 Poll Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-heading font-semibold text-foreground mb-4">Total Votes per Poll</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pollParticipation}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 25%)" />
              <XAxis dataKey="name" stroke="hsl(215, 20%, 65%)" fontSize={10} />
              <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="votes" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-heading font-semibold text-foreground mb-4">Most Selected Options</h3>
          <div className="space-y-3">
            {polls.map((poll) => {
              const top = [...poll.options].sort((a, b) => b.votes - a.votes)[0];
              return (
                <div key={poll.id} className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-foreground">{poll.title}</p>
                  <p className="text-xs text-primary mt-1">Winner: {top.label} ({top.votes.toLocaleString()} votes)</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Location Insights */}
      <h2 className="text-lg font-heading font-semibold text-foreground">📍 Location-Based Insights</h2>
      <div className="glass-card p-5">
        <h3 className="font-heading font-semibold text-foreground mb-4">Engagement Rate by Location</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={locationEngagement}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 25%)" />
            <XAxis dataKey="location" stroke="hsl(215, 20%, 65%)" fontSize={12} />
            <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} unit="%" />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="engagement" radius={[4, 4, 0, 0]}>
              {locationEngagement.map((entry, i) => (
                <Cell key={i} fill={entry.engagement >= 70 ? "hsl(168, 76%, 42%)" : entry.engagement >= 50 ? "hsl(38, 92%, 50%)" : "hsl(0, 84%, 60%)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary" /> High (&ge;70%)</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-warning" /> Medium (50-69%)</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-destructive" /> Low (&lt;50%)</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
