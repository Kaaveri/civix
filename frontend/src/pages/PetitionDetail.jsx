import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Users, Download, Send } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PetitionDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [petition, setPetition] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchPetition();
  }, []);

  const fetchPetition = async () => {

    try {

      const res = await fetch(`http://localhost:3000/api/petitions/${id}`);
      const data = await res.json();

      setPetition(data);
      setComments(data.comments || []);

    } catch (error) {
      console.log(error);
    }

  };

  if (!petition) {
    return <div style={{ padding: 40 }}>Loading petition...</div>;
  }

  const signatures = petition.signatures || 0;
  const target = petition.target || 0;

  const progress =
    target > 0 ? Math.min((signatures / target) * 100, 100) : 0;

  const remaining = target - signatures;

  /* GRAPH DATA */

  const graphData = {
    labels: ["Signed", "Remaining"],
    datasets: [
      {
        data: [signatures, remaining],
        backgroundColor: ["#22c55e", "#e5e7eb"]
      }
    ]
  };

  /* ADD COMMENT */

  const handleAddComment = async () => {

    if (!comment.trim()) return;

    try {

      await fetch(`http://localhost:3000/api/petitions/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          author: role === "official" ? "Official" : "Citizen",
          text: comment,
          isOfficial: role === "official"
        })
      });

      setComment("");
      fetchPetition();

    } catch (error) {
      console.log(error);
    }

  };

  /* DOWNLOAD PDF */

  const handleDownloadPDF = () => {

    const doc = new jsPDF();

    const createdDate = petition.createdAt
      ? new Date(petition.createdAt).toLocaleDateString()
      : "N/A";

    const updatedDate = petition.updatedAt
      ? new Date(petition.updatedAt).toLocaleDateString()
      : "N/A";

    const generatedDate = new Date().toLocaleDateString();

    const petitionId = petition._id;

    /* HEADER BACKGROUND */

    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, "F");

    /* TITLE */

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text(petition.title, 105, 22, { align: "center" });

    doc.setTextColor(0, 0, 0);

    /* TABLE */

    autoTable(doc, {
      startY: 50,
      head: [["Petition Info", "Details"]],
      body: [
        ["Petition ID", petitionId],
        ["Location", petition.location],
        ["Category", petition.category],
        ["Signatures", signatures],
        ["Target", target],
        ["Remaining", remaining],
        ["Created Date", createdDate],
        ["Official Updated Date", updatedDate],
        ["PDF Generated Date", generatedDate]
      ]
    });

    doc.save(`petition-${petitionId}.pdf`);

  };

  return (

    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      {/* BACK BUTTON */}

      <button
        onClick={() => navigate("/petitions")}
        style={{
          marginBottom: 20,
          background: "#4f46e5",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        ← Back to Petitions
      </button>

      {/* PETITION CARD */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: 10,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1 style={{ marginBottom: 10 }}>
          {petition.title}
        </h1>

        <div style={{ display: "flex", gap: 20 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <MapPin size={16} />
            {petition.location}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Users size={16} />
            {signatures} Signatures
          </div>

        </div>

        <div style={{ marginTop: 10 }}>
          <StatusBadge status={petition.status} />
        </div>

        {/* DOWNLOAD BUTTON */}

        <button
          onClick={handleDownloadPDF}
          style={{
            marginTop: 20,
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <Download size={16}/>
          Download PDF
        </button>

        {/* DESCRIPTION */}

        <h3 style={{ marginTop: 30 }}>
          Description
        </h3>

        <p style={{ lineHeight: 1.6 }}>
          {petition.description}
        </p>

        {/* PROGRESS BAR */}

        <h3 style={{ marginTop: 30 }}>
          Progress
        </h3>

        <div
          style={{
            background: "#e5e7eb",
            height: 12,
            borderRadius: 20,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: "#22c55e",
              height: "100%"
            }}
          />
        </div>

        <p style={{ marginTop: 5 }}>
          {Math.round(progress)}% completed
        </p>

        {/* GRAPH */}

        <div style={{ width: "250px", marginTop: 20 }}>
          <Doughnut data={graphData}/>
        </div>

      </div>

      {/* COMMENTS */}

      <div
        style={{
          background: "white",
          marginTop: 30,
          padding: 25,
          borderRadius: 10,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h3>Comments</h3>

        {comments.length === 0 && (
          <p style={{ color: "gray" }}>
            No comments yet
          </p>
        )}

        {comments.map((c) => (

          <div
            key={c._id}
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: 10,
              marginBottom: 10
            }}
          >
            <b>{c.author}</b>
            <p style={{ margin: 0 }}>
              {c.text}
            </p>
          </div>

        ))}

        {/* COMMENT BOX */}

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          style={{
            width: "100%",
            marginTop: 15,
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleAddComment}
          style={{
            marginTop: 10,
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <Send size={16}/>
          Add Comment
        </button>

      </div>

    </div>

  );

};

export default PetitionDetail;




