const express = require("express");
const router = express.Router();

const {
  addResponse,
  getResponses
} = require("../controllers/responseController");

const { protect } = require("../middleware/authMiddleware");

// ===============================
// ADD RESPONSE (OFFICIAL)
// ===============================
router.post("/:id", protect, addResponse);

// ===============================
// GET RESPONSES
// ===============================
router.get("/:id", getResponses);

module.exports = router;