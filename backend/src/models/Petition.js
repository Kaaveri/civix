const mongoose = require("mongoose");

const petitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    location: { type: String, required: true },
    category: { type: String, required: true },

    status: {
      type: String,
      enum: ["active", "under review", "closed"],
      default: "under review",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    signatures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Petition", petitionSchema);