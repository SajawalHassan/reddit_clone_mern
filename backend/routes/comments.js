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

module.exports = router;
