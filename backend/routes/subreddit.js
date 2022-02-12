const router = require("express").Router();
const Subreddit = require("../models/Subreddit");

const { verify } = require("../authentication/verifyToken");

router.post("/create", verify, async (req, res) => {
  try {
    // Getting info for subreddit
    const subreddit = new Subreddit({
      title: req.body.title,
      titleDescription: req.body.titleDescription,
      ownerId: req.user._id,
      subredditPic: req.body.subredditPic,
      description: req.body.description,
    });

    // Creating subreddit
    const newSubreddit = await subreddit.save();

    res.json(newSubreddit);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
