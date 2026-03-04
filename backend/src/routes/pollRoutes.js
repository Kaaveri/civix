const express = require("express");
const router = express.Router();

const { getPollResults } = require("../controllers/pollController");
const { voteOnPoll, removeVote } = require("../controllers/voteController");

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/role");

// Citizen votes or changes vote
router.post("/:id/vote", protect, allowRoles("citizen"), voteOnPoll);

// Citizen removes their vote completely
router.delete("/:id/vote", protect, allowRoles("citizen"), removeVote);

// Public poll results (for graphs)
router.get("/:id/results", getPollResults);

module.exports = router;