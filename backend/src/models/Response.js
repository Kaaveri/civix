const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    petition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Petition",
      required: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Response", responseSchema);