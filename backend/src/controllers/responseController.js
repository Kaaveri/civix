const Response = require("../models/Response");

// ===============================
// ADD RESPONSE (OFFICIAL)
// ===============================
exports.addResponse = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await Response.create({
      petition: req.params.id,
      message,
      respondedBy: req.user.id
    });

    res.status(201).json({
      message: "Response added successfully",
      response
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding response",
      error: error.message
    });
  }
};

// ===============================
// GET RESPONSES FOR PETITION
// ===============================
exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.find({
      petition: req.params.id
    }).populate("respondedBy", "name email");

    res.json(responses);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching responses"
    });
  }
};