const router = require("express").Router();
const Subreddit = require("../models/Subreddit");
const User = require("../models/User");

const { verify } = require("../authentication/verifyToken");

router.post("/create", verify, async (req, res) => {
  try {
    if (req.body.title.includes(" ")) {
      return res.status(400).json("Title cannot have space");
    }

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

router.put("/edit/:id", verify, async (req, res) => {
  try {
    // Updating subreddit
    await Subreddit.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.json("Subreddit updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", verify, async (req, res) => {
  try {
    // Deleting subreddit
    await Subreddit.findByIdAndDelete(req.params.id);

    res.json("Subreddit deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/join/:id", verify, async (req, res) => {
  try {
    // Getting subreddit
    const subreddit = await Subreddit.findById(req.params.id);

    // Checking if the user is already joined
    if (!subreddit.joinedMembers.includes(req.user._id)) {
      // Adding user id to joined member
      await subreddit.updateOne({ $push: { joinedMembers: req.user._id } });

      // Adding subreddit to users joined subreddit
      await User.findByIdAndUpdate(req.user._id, {
        $push: { joinedSubreddits: subreddit._id },
      });

      res.json(`User has joined subreddit r/${subreddit.title}`);
    } else {
      // Removing user id to joined member
      await subreddit.updateOne({ $pull: { joinedMembers: req.user._id } });

      // Removing subreddit to users joined subreddit
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { joinedSubreddits: subreddit._id },
      });

      res.json(`User has left subreddit r/${subreddit.title}`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
