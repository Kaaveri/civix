const Petition = require("../models/Petition");
const Response = require("../models/Response");

exports.respondToPetition = async (req, res) => {
  try {
    // 1. Role check
    if (req.user.role !== "official") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { comment } = req.body;

    // 2. Strong validation
    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({ message: "Comment is required" });
    }

    if (comment.length > 1000) {
      return res.status(400).json({ message: "Comment too long" });
    }

    // 3. Check petition exists
    const petition = await Petition.findById(req.params.id);
    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    // 4. Prevent duplicate response
    const existing = await Response.findOne({
      petitionId: req.params.id,
      officialId: req.user._id, 
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already responded to this petition",
      });
    }

    // 5. Create response
    const response = await Response.create({
      petitionId: req.params.id,
      officialId: req.user._id,
      comment: comment.trim(),
    });

    // 6. Link response to petition
    petition.responses.push(response._id);
  
    await petition.save();

    // 7. Send response
    res.status(201).json({
      message: "Response submitted successfully",
      data: response,
    });

  } catch (error) {
    console.error("RESPOND ERROR:",error); 

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};