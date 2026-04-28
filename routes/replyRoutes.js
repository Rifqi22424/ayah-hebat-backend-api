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

router.get("/:commentId", /* #swagger.tags = ['Reply Controller'] */ getReplyCommentsById);
router.post("/:commentId", /* #swagger.tags = ['Reply Controller'] */ createReply);
router.put("/:replyId", /* #swagger.tags = ['Reply Controller'] */ editReply);
router.delete("/", /* #swagger.tags = ['Reply Controller'] */ authorizeAdmin, deleteAllReply);
router.delete("/:replyId", /* #swagger.tags = ['Reply Controller'] */ deleteReply);
router.post("/:replyId/like", /* #swagger.tags = ['Reply Controller'] */ likeReply);

module.exports = router;
