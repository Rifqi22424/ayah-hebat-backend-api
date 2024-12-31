const express = require("express");
const {
  getReplyCommentsById,
  createReply,
  editReply,
  deleteReply,
  likeReply,
  deleteAllReply,
} = require("../controllers/replyController");
const { authorizeAdmin } = require("../middlewares/authorizationMiddleware");
const router = express.Router();

router.get("/:commentId", getReplyCommentsById);
router.post("/:commentId", createReply);
router.put("/:replyId", editReply);
router.delete("/", authorizeAdmin, deleteAllReply);
router.delete("/:replyId", deleteReply);
router.post("/:replyId/like", likeReply);

module.exports = router;
