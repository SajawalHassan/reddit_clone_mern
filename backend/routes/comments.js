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

module.exports = router;
