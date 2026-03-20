// ===============================
// LOAD ENV
// ===============================
const dotenv = require("dotenv");
dotenv.config();

// ===============================
// IMPORT PACKAGES
// ===============================
const express = require("express");
const cors = require("cors");

// ===============================
// IMPORT DB
// ===============================
const connectDB = require("./src/config/db");

// ===============================
// IMPORT ROUTES
// ===============================
const authRoutes = require("./src/routes/authRoutes");
const petitionRoutes = require("./src/routes/petitionRoutes");
const pollRoutes = require("./src/routes/pollRoutes");
const responseRoutes = require("./src/routes/responseRoutes");
const reportRoutes = require("./src/routes/reportRoutes");

// ===============================
// INIT APP
// ===============================
const app = express();

// ===============================
// CONNECT DATABASE
// ===============================
connectDB();

// ===============================
// MIDDLEWARES
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 Civix backend server running successfully");
});

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/petitions", petitionRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/responses", responseRoutes);

// ===============================
// PROTECTED ROUTE (TEST)
// ===============================
app.use("/api/reports", reportRoutes);
const { protect } = require("./src/middleware/authMiddleware");

app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user
  });
});

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// ===============================
// GLOBAL ERROR HANDLER (OPTIONAL)
// ===============================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(500).json({
    message: err.message || "Server Error"
  });
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});