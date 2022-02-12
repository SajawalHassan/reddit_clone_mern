const router = require("express").Router();
const Comment = require("../models/Comment");

const { verify } = require("../authentication/verifyToken");
const User = require("../models/User");

router.post("/create", verify, async (req, res) => {
  try {
    // Getting info for new comment
    const comment = new Comment({
      content: req.body.content,
      postId: req.body.postId,
      ownerId: req.user._id,
    });

    const newComment = await comment.save();

    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/edit/:id", verify, async (req, res) => {
  try {
    // Updating comment
    await Comment.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.json("Comment updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", verify, async (req, res) => {
  try {
    // Deleting comment
    await Comment.findByIdAndDelete(req.params.id);

    res.json("Comment deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/upvote/:id", verify, async (req, res) => {
  try {
    // Finding comment
    const comment = await Comment.findById(req.params.id);

    // Checking if the user has already upvoted the comment
    if (!comment.upvotes.includes(req.user._id)) {
      // Adding user id to upvotes array
      await comment.updateOne({
        $push: { upvotes: req.user._id },
        $pull: { downvotes: req.user._id },
      });

      // Adding 1 karma to OP
      await User.findByIdAndUpdate(comment.ownerId, { $inc: { karma: 1 } });

      res.json("Upvote added!");
    } else {
      // Removing user id to upvotes array
      await comment.updateOne({ $pull: { upvotes: req.user._id } });

      // Removing 1 karma to OP
      await User.findByIdAndUpdate(comment.ownerId, { $inc: { karma: -1 } });

      res.json("Upvote removed!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/downvote/:id", verify, async (req, res) => {
  try {
    // Finding comment
    const comment = await Comment.findById(req.params.id);

    // Checking if the user has already downvoted the comment
    if (!comment.downvotes.includes(req.user._id)) {
      // Adding user id to downvotes array
      await comment.updateOne({
        $push: { downvotes: req.user._id },
        $pull: { upvotes: req.user._id },
      });

      // Removing 1 karma to OP
      await User.findByIdAndUpdate(comment.ownerId, { $inc: { karma: -1 } });

      res.json("Downvote added!");
    } else {
      // Removing user id to downvotes array
      await comment.updateOne({ $pull: { downvotes: req.user._id } });

      // Adding 1 karma to OP
      await User.findByIdAndUpdate(comment.ownerId, { $inc: { karma: 1 } });

      res.json("Downvote removed!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
