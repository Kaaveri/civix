import { polls } from "../data/mockData";
import { StatusBadge } from "../components/StatusBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(217, 33%, 17%)",
  border: "1px solid hsl(217, 33%, 25%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 98%)",
};

const Polls = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Polls</h1>
        <p className="text-muted-foreground text-sm mt-1">View and manage citizen polls</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {polls.map((poll) => (
          <div key={poll.id} className="glass-card p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading font-semibold text-foreground">{poll.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{poll.location} · {poll.totalVotes.toLocaleString()} votes</p>
              </div>
              <StatusBadge status={poll.status} />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={poll.options} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 25%)" />
                <XAxis type="number" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                <YAxis type="category" dataKey="label" stroke="hsl(215, 20%, 65%)" fontSize={11} width={120} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="votes" fill="hsl(199, 89%, 48%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Polls;
