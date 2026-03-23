const mongoose = require("mongoose");

const petitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    // ✅ FIXED STATUS ENUM
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved", "rejected"],
      default: "pending"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    signatures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Petition", petitionSchema);