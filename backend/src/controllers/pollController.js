const Poll = require("../models/Poll");
//create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { title, options, targetLocation, expiresAt } = req.body;

    const poll = new Poll({
      title,
      options: options.map(option => ({ text: option })),
      targetLocation,
      expiresAt,
      createdBy: req.user.id,
    });

    await poll.save();

    res.status(201).json({
      message: "Poll created successfully",
      poll,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /api/polls
exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(polls);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /api/polls/:id/results
exports.getPollResults = async (req, res) => {
  try {
    const pollId = req.params.id;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    // calculate total votes
    const totalVotes = poll.options.reduce(
      (sum, option) => sum + option.voteCount,
      0
    );

    // format for graphs
    const formattedOptions = poll.options.map((option) => ({
      text: option.text,
      votes: option.voteCount,
      percentage:
        totalVotes === 0
          ? 0
          : ((option.voteCount / totalVotes) * 100).toFixed(2),
    }));

    res.status(200).json({
      pollTitle: poll.title,
      totalVotes,
      options: formattedOptions,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};