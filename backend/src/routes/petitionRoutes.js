const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  createPetition,
  getAllPetitions,
  getPetitionById,
  updatePetition,
  signPetition,
  updateStatus
} = require("../controllers/petitionController");

// MIDDLEWARE
const { protect } = require("../middleware/authMiddleware");

// ===============================
// CREATE PETITION
// ===============================
router.post("/", protect, createPetition);

// ===============================
// GET ALL PETITIONS
// ===============================
router.get("/", getAllPetitions);

// ===============================
// GET PETITION BY ID
// ===============================
router.get("/:id", getPetitionById);

// ===============================
// UPDATE PETITION
// ===============================
router.put("/:id", protect, updatePetition);

// ===============================
// UPDATE STATUS
// ===============================
router.patch("/:id/status", protect, updateStatus);

// ===============================
// SIGN PETITION
// ===============================
router.post("/:id/sign", protect, signPetition);

module.exports = router;