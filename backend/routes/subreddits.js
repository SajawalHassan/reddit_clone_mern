const router = require("express").Router();
const Subreddit = require("../models/Subreddit");
const { authenticate } = require("../auth/authenticate");

router.post("/create", authenticate, async (req, res) => {
  try {
    // Making sure the subreddit is not a duplicate
    const subreddit = await Subreddit.findOne({ title: req.body.title });
    if (subreddit) return res.status(400).json("Subreddit already exists!");

    // Making sure the subreddit title doesn't contain spaces
    if (req.body.title.includes(" "))
      return res.status(400).json("Title cannot contain spaces!");

    // Getting info for new subreddit
    const newSubreddit = new Subreddit({
      title: req.body.title,
      titleDescription: req.body.titleDescription,
      subredditPic: req.body.subredditPic,
      description: req.body.description,
      ownerId: req.user._id,
    });

    await newSubreddit.save();

    res.json(newSubreddit);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
