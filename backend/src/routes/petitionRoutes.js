const express = require("express");
const router = express.Router();

const {
  createPetition,
  getAllPetitions,
  getPetitionById,
  updatePetition,
  signPetition,
  updateStatus,
  deletePetition
} = require("../controllers/petitionController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPetition);

router.get("/", getAllPetitions);

router.get("/:id", getPetitionById);

router.put("/:id", protect, updatePetition);

router.patch("/:id/status", protect, updateStatus);

router.post("/:id/sign", protect, signPetition);

router.delete("/:id", protect, deletePetition);

module.exports = router;