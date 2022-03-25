const router = require("express").Router();
const Post = require("../models/Post");
const Subreddit = require("../models/Subreddit");

const { authenticate } = require("../auth/authenticate");

router.post("/create", authenticate, async (req, res) => {
  try {
    // Finding subreddit
    const subreddit = await Subreddit.findById(req.body.subredditId);

    // Getting info for new post
    const newPost = new Post({
      title: req.body.title,
      wordContent: req.body.wordContent,
      picContent: req.body.picContent,
      subredditId: req.body.subredditId,
      subredditPic: subreddit.subredditPic,
      ownerId: req.user._id,
    });

    // Saving post into db
    await newPost.save();

    res.json(newPost);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
