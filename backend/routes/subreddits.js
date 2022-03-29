const router = require("express").Router();
const Subreddit = require("../models/Subreddit");
const User = require("../models/User");
const Post = require("../models/Post");

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

    // Saving subreddit info into db
    await newSubreddit.save();

    res.json(newSubreddit);
  } catch (error) {
    if (error._message) return res.status(500).json(error.message);
    res.sendStatus(500);
  }
});

router.put("/edit/:id", authenticate, async (req, res) => {
  try {
    // Finding subreddit
    const subreddit = await Subreddit.findById(req.params.id);

    // Making sure the user is the owner
    if (subreddit.ownerId !== req.user._id)
      return res.status(403).json("You are not the owner!");

    // Updating the subreddit
    await subreddit.updateOne({ $set: req.body });

    res.json("Subreddit info updated");
  } catch (error) {
    if (error._message) return res.status(500).json(error.message);
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    // Finding subreddit and all posts related to said subreddit
    const subreddit = await Subreddit.findById(req.params.id);

    // Making sure the user is the owner
    if (subreddit.ownerId !== req.user._id)
      return res.status(405).json("You are not the owner!");

    // Deleting the subreddit and all posts related to subreddit
    await subreddit.deleteOne();
    await Post.deleteMany({ subredditId: req.params.id });

    res.json("Deleted subreddit");
  } catch (error) {
    if (error._message) return res.status(500).json(error.message);
    res.sendStatus(500);
  }
});

router.put("/join/:id", authenticate, async (req, res) => {
  try {
    const subreddit = await Subreddit.findById(req.params.id);

    // Checking if the user hasn't already joined
    if (!req.user.joinedSubreddits.includes(req.params.id)) {
      // Adding subreddit id to user's joined subreddits
      await User.findByIdAndUpdate(subreddit._id, {
        $push: { joinedSubreddits: req.params.id },
      });

      return res.json("Joined subreddit");
    } else {
      // Removing subreddit id from user's joined subreddits
      User.findByIdAndUpdate(subreddit._id, {
        $pull: { joinedSubreddits: req.params.id },
      });

      return res.json("Left subreddit");
    }
  } catch (error) {
    if (error._message) return res.status(500).json(error.message);
    res.sendStatus(500);
  }
});

router.get("/feed", async (req, res) => {
  try {
    // Getting all subreddits
    const subreddits = await Subreddit.find();

    res.json(subreddits);
  } catch (error) {
    if (error._message) return res.status(500).json(error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
