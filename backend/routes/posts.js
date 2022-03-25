const router = require("express").Router();
const Post = require("../models/Post");
const Subreddit = require("../models/Subreddit");
const User = require("../models/User");

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
    await post.updateOne({ $set: req.body });

    res.json("Post updated");
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

router.put("/upvote/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Checking if the post isn't already upvoted
    if (!post.upvotes.includes(req.user._id)) {
      // Adding upvote
      await post.updateOne({
        $push: { upvotes: req.user._id },
        $pull: { downvotes: req.user._id },
      });

      // Adding post id to the user upvoted posts and removing from the downvoted array
      await User.findByIdAndUpdate(req.user._id, {
        $push: { upvotedPosts: post._id },
        $pull: { downvotedPosts: post._id },
      });

      return res.json("Post upvoted");
    } else {
      // Removing upvote
      await post.updateOne({ $pull: { upvotes: req.user._id } });

      // Removing post id to the user upvoted posts
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { upvotedPosts: post._id },
      });

      return res.json("Upvote removed");
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/downvote/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Checking if the post isn't already downvoted
    if (!post.downvotes.includes(req.user._id)) {
      // Adding downvote
      await post.updateOne({
        $push: { downvotes: req.user._id },
        $pull: { upvotes: req.user._id },
      });

      // Adding post id to the user downvoted posts
      await User.findByIdAndUpdate(req.user._id, {
        $push: { downvotedPosts: post._id },
        $pull: { upvotedPosts: post._id },
      });

      return res.json("Post downvoted");
    } else {
      // Removing upvote
      await post.updateOne({ $pull: { downvotes: req.user._id } });

      // Removing post id to the user downvoted posts
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { downvotedPosts: post._id },
      });

      return res.json("Downvote removed");
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/feed", authenticate, async (req, res) => {
  try {
    // Finding all posts
    const posts = await Post.find();

    res.json(posts);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
