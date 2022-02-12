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
    // Finding subreddit
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

router.post("/mods/create/:id", verify, async (req, res) => {
  try {
    // Finding subreddit
    const subreddit = await Subreddit.findById(req.params.id);

    // Checking if the person sending the req to make x a mod is the owner or a mod
    if (
      subreddit.ownerId === req.user._id ||
      subreddit.mods.includes(req.user._id)
    ) {
      // Checking if x is already a mod or not
      if (!subreddit.mods.includes(req.body.modId)) {
        // Adding users id to subreddit mods array
        await subreddit.updateOne({ $push: { mods: req.body.modId } });

        res.json("Added mod");
      } else {
        // Removing users id to subreddit mods array
        await subreddit.updateOne({ $pull: { mods: req.body.modId } });

        res.json("Removed mod");
      }
    } else {
      return res
        .status(403)
        .json("You are not a moderator or the owner to perform this action");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/rule/create/:id", verify, async (req, res) => {
  try {
    // Finding subreddit
    const subreddit = await Subreddit.findById(req.params.id);

    // Checking if the person sending the req to make the rule is the owner or a mod
    if (
      subreddit.ownerId === req.user._id ||
      subreddit.mods.includes(req.user._id)
    ) {
      // Checking if the rule already exists
      if (!subreddit.rules.includes(req.body.rule)) {
        // Adding rule to rules array
        await subreddit.updateOne({ $push: { rules: req.body.rule } });

        res.json("Added rule");
      } else {
        // Removing rule to rules array
        await subreddit.updateOne({ $pull: { rules: req.body.rule } });

        res.json("Removed rule");
      }
    } else {
      return res
        .status(403)
        .json("You are not a moderator or the owner to perform this action");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/feed", async (req, res) => {
  try {
    // Getting all subreddits
    const allSubreddits = await Subreddit.find();

    res.json(allSubreddits);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
