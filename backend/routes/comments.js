const router = require("express").Router();
const Comment = require("../models/Comment");

const { verify } = require("../authentication/verifyToken");

router.post("/create", verify, async (req, res) => {
  try {
    // Getting info for new comment
    const comment = new Comment({
      content: req.body.content,
      postId: req.body.postId,
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

module.exports = router;
