import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { petitions } from "@/data/mockData";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const PetitionDetail = () => {
  const { id } = useParams();
  const petition = petitions.find((p) => p.id === id);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(petition?.status || "active");

  if (!petition) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Petition not found</p>
          <Button asChild variant="outline"><Link to="/petitions">Back to Petitions</Link></Button>
        </div>
      </div>
    );
  }

  const progress = Math.min((petition.signatures / petition.target) * 100, 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Link to="/petitions"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-heading font-bold text-foreground">{petition.title}</h1>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{petition.location}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{petition.createdAt}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{petition.signatures.toLocaleString()} signatures</span>
          </div>
        </div>
        <StatusBadge status={petition.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="glass-card p-5">
            <h2 className="font-heading font-semibold text-foreground mb-3">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{petition.description}</p>
          </div>

          {/* Signature Growth */}
          <div className="glass-card p-5">
            <h2 className="font-heading font-semibold text-foreground mb-4">Signature Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={petition.signatureHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 25%)" />
                <XAxis dataKey="date" stroke="hsl(215 20% 65%)" fontSize={12} />
                <YAxis stroke="hsl(215 20% 65%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(217 33% 17%)",
                    border: "1px solid hsl(217 33% 25%)",
                    borderRadius: "8px",
                    color: "hsl(210 40% 98%)",
                  }}
                />
                <Line type="monotone" dataKey="count" stroke="hsl(168 76% 42%)" strokeWidth={2} dot={{ fill: "hsl(168 76% 42%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Comments */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="h-4 w-4 text-primary" />
              <h2 className="font-heading font-semibold text-foreground">Comments ({petition.comments.length})</h2>
            </div>
            <div className="space-y-3 mb-4">
              {petition.comments.map((c) => (
                <div key={c.id} className={cn("p-3 rounded-lg", c.isOfficial ? "bg-primary/10 border border-primary/20" : "bg-secondary/50")}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{c.author}</span>
                    {c.isOfficial && <span className="text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded">Official</span>}
                    <span className="text-xs text-muted-foreground ml-auto">{c.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </div>
              ))}
              {petition.comments.length === 0 && (
                <p className="text-sm text-muted-foreground">No comments yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar actions */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="glass-card p-5">
            <h3 className="font-heading font-semibold text-foreground mb-3">Signature Progress</h3>
            <div className="text-3xl font-heading font-bold text-primary">{petition.signatures.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mb-3">of {petition.target.toLocaleString()} target</p>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
          </div>

          {/* Official Response */}
          <div className="glass-card p-5">
            <h3 className="font-heading font-semibold text-foreground mb-3">Official Response</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Update Status</label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Add Comment</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your official response..."
                  className="bg-secondary border-border resize-none"
                  rows={3}
                />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4 mr-2" /> Submit Response
              </Button>
            </div>
          </div>

          {petition.officialResponse && (
            <div className="glass-card p-5 border-primary/30">
              <h3 className="font-heading font-semibold text-foreground mb-2">Resolution</h3>
              <p className="text-sm text-muted-foreground">{petition.officialResponse}</p>
              {petition.resolutionDate && (
                <p className="text-xs text-primary mt-2">Resolved: {petition.resolutionDate}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetitionDetail;
