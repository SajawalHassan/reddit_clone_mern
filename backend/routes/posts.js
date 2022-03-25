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

    // Making sure the user is the owner
    if (post.ownerId !== req.user._id)
      return res.status(403).json("You are not the owner!");

    // Editing post
    const editedPost = await post.updateOne({ $set: req.body });

    res.json(editedPost);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    // Finding post
    const post = await Post.findById(req.params.id);

    // Making sure the user is the owner
    if (post.ownerId !== req.user._id)
      return res.status(403).json("You are not the owner!");

    // Deleting post
    await post.deleteOne();

    res.json("Post deleted");
  } catch (error) {
    res.status(500);
  }
});

router.post("/repost/:id", authenticate, async (req, res) => {
  try {
    // Finding post
    const post = await Post.findById(req.params.id);

    // Getting info for new post
    const newPost = new Post({
      title: post.title,
      wordContent: post.wordContent,
      picContent: post.picContent,
      subredditId: post.subredditId,
      subredditPic: post.subredditPic,
      ownerId: req.user._id,
    });

    // Saving new post
    await newPost.save();

    res.json("Post reposted");
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
