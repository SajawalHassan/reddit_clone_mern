const router = require("express").Router();
const Comment = require("../models/Comment");

const { authenticate } = require("../auth/authenticate");

router.post("/create", authenticate, async (req, res) => {
  try {
    const newComment = new Comment({
      content: req.body.content,
      postId: req.body.postId,
      ownerId: req.user._id,
    });

    await newComment.save();

    res.json(newComment);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/edit/:id", authenticate, async (req, res) => {
  try {
    // Finding comment
    const comment = await Comment.findById(req.params.id);

    // making sure the user is the owner
    if (comment.ownerId !== req.user._id)
      return res.status(403).json("You are not the owner");

    // Updating the comment
    await comment.updateOne({ $set: req.body });

    res.json("Comment updated");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    // Finding comment
    const comment = await Comment.findById(req.params.id);

    // making sure the user is the owner
    if (comment.ownerId !== req.user._id)
      return res.status(403).json("You are not the owner");

    // Deleting comment
    await comment.deleteOne();

    res.json("Comment deleted");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/repost/:id", authenticate, async (req, res) => {
  try {
    // Finding comment
    const comment = await Comment.findById(req.params.id);

    // Getting info for new post
    const newComment = new Comment({
      content: comment.content,
      postId: comment.postId,
      ownerId: req.user._id,
    });

    // Saving comment
    await newComment.save();

    res.json(newComment);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/upvote/:id", authenticate, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // Checking if the comment isn't already upvoted
    if (!comment.upvotes.includes(req.user._id)) {
      // Adding upvote
      await comment.updateOne({
        $push: { upvotes: req.user._id },
        $pull: { downvotes: req.user._id },
      });

      return res.json("comment upvoted");
    } else {
      // Removing upvote
      await comment.updateOne({ $pull: { upvotes: req.user._id } });

      return res.json("Upvote removed");
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/downvote/:id", authenticate, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // Checking if the comment isn't already downvoted
    if (!comment.downvotes.includes(req.user._id)) {
      // Adding downvote
      await comment.updateOne({
        $push: { downvotes: req.user._id },
        $pull: { upvotes: req.user._id },
      });

      return res.json("comment downvoted");
    } else {
      // Removing downvote
      await comment.updateOne({ $pull: { downvotes: req.user._id } });

      return res.json("Downvote removed");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
