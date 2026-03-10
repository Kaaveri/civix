// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();

// Import packages
const express = require("express");
const cors = require("cors");

// Import database connection
const connectDB = require("./src/config/db");

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const petitionRoutes = require("./src/routes/petitionRoutes");
const pollRoutes = require("./src/routes/pollRoutes");

// const pollRoutes = require("./routes/pollRoutes");

// Initialize express app
const app = express();


// Connect to MongoDB
connectDB();


// Middlewares
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("Civix backend server running successfully");
});

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/petitions", petitionRoutes);
app.use("/api/polls", pollRoutes);
const { protect } = require("./src/middleware/authMiddleware");

app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user
  });
});
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});