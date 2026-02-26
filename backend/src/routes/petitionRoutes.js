const express = require("express");
const router = express.Router();

const {
  createPetition,
  getAllPetitions,
  getPetitionById,
  updatePetition,
  signPetition,
} = require("../controllers/petitionController");

const { protect } = require("../middleware/authMiddleware");


// Create petition
router.post("/", protect, createPetition);

// Get all petitions (with filter)
router.get("/", getAllPetitions);

// Get by ID
router.get("/:id", getPetitionById);

// Update petition
router.put("/:id", protect, updatePetition);

// Sign petition
router.post("/:id/sign", protect, signPetition);

module.exports = router;