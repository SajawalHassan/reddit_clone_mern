const router = require("express").Router();
const Post = require("../models/Post");
const Subreddit = require("../models/Subreddit");

const { verify } = require("../authentication/verifyToken");
const User = require("../models/User");

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

router.put("/edit/:id", verify, async (req, res) => {
  try {
    // Updating post
    await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.json("Updated post");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", verify, async (req, res) => {
  try {
    // Deleting post
    await Post.findByIdAndDelete(req.params.id);

    res.json("Post deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/upvote/:id", verify, async (req, res) => {
  try {
    // Finding post
    const post = await Post.findById(req.params.id);

    // Checking if the post is already upvoted
    if (!post.upvotes.includes(req.user._id)) {
      // Adding user id to upvotes array and removing from downvotes array
      await post.updateOne({
        $push: { upvotes: req.user._id },
        $pull: { downvotes: req.user._id },
      });

      // Adding post id to users upvoted post
      await User.findByIdAndUpdate(req.user, {
        $push: { upvotedPosts: post._id },
      });

      res.json("Added upvote");
    } else {
      // Removing user id to upvotes array
      await post.updateOne({
        $pull: { upvotes: req.user._id },
      });

      // Removing post id to users upvoted post
      await User.findByIdAndUpdate(req.user, {
        $pull: { upvotedPosts: post._id },
      });

      res.json("Removed upvote");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
