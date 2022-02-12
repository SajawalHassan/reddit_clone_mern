const router = require("express").Router();
const Post = require("../models/Post");
const Subreddit = require("../models/Subreddit");

const { verify } = require("../authentication/verifyToken");

router.post("/create", verify, async (req, res) => {
  try {
    // Finding subreddit
    const subreddit = await Subreddit.findById(req.body.subredditId);

    // Getting info for post
    const post = new Post({
      title: req.body.title,
      wordContent: req.body.wordContent,
      picContent: req.body.picContent,
      ownerId: req.user._id,
      subredditId: req.body.subredditId,
      subredditPic: subreddit.subredditPic,
    });

    // Creating post
    const newPost = await post.save();

    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
