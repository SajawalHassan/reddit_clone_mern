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

router.put("/edit/:id", authenticate, async (req, res) => {
  try {
    // Finding post
    const post = await Post.findById(req.params.id);

    if (post.ownerId !== req.user._id)
      return res.status(403).json("Tou are not the owner!");

    const editedPost = await post.updateOne({ $set: req.body });

    res.json(editedPost);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
