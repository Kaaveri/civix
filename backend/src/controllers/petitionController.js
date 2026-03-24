const Petition = require("../models/Petition");

exports.createPetition = async (req, res) => {
  try {
    const { title, description, location, category } = req.body;

    if (!title || !description || !location || !category) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const petition = await Petition.create({
      title,
      description,
      location,
      category,
      status: "under_review",
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Petition created successfully",
      petition
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating petition",
      error: error.message
    });
  }
};

exports.getAllPetitions = async (req, res) => {
  try {
    const filters = {};

    if (req.query.location) filters.location = req.query.location;
    if (req.query.category) filters.category = req.query.category;
    if (req.query.status) filters.status = req.query.status;

    const petitions = await Petition.find(filters)
      .populate("createdBy", "name email")
      .populate("signatures", "name")
      .sort({ createdAt: -1 });

    res.json({
      count: petitions.length,
      petitions
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching petitions",
      error: error.message
    });
  }
};

exports.getPetitionById = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("signatures", "name");
      
    if (!petition) {
      return res.status(404).json({
        message: "Petition not found"
      });
    }

    res.json(petition);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching petition",
      error: error.message
    });
  }
};

exports.updatePetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({
        message: "Petition not found"
      });
    }

    if (petition.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    petition.title = req.body.title || petition.title;
    petition.description = req.body.description || petition.description;
    petition.location = req.body.location || petition.location;
    petition.category = req.body.category || petition.category;

    const updatedPetition = await petition.save();

    res.json({
      message: "Petition updated successfully",
      petition: updatedPetition
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating petition",
      error: error.message
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({
        message: "Petition not found"
      });
    }

    petition.status = status;

    await petition.save();

    res.json({
      message: "Status updated successfully",
      petition
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating status",
      error: error.message
    });
  }
};

exports.signPetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({
        message: "Petition not found"
      });
    }

    if (petition.signatures.includes(req.user.id)) {
      return res.status(400).json({
        message: "You already signed this petition"
      });
    }

    petition.signatures.push(req.user.id);
    await petition.save();

    res.json({
      message: "Petition signed successfully",
      totalSignatures: petition.signatures.length
    });

  } catch (error) {
    res.status(500).json({
      message: "Error signing petition",
      error: error.message
    });
  }
};

exports.deletePetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({
        message: "Petition not found"
      });
    }

    if (petition.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await petition.deleteOne();

    res.json({
      message: "Petition deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting petition",
      error: error.message
    });
  }
};