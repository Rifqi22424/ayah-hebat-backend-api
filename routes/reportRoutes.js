const express = require("express");
const {
  reportPost,
  reportComment,
  reportReply,
  updateReportStatus,
  getAllReports,
} = require("../controllers/reportController");
const { authorizeAdmin } = require("../middlewares/authorizationMiddleware");
const router = express.Router();

router.delete("/post/:postId", reportPost);
router.delete("/comment/:commentId", reportComment);
router.delete("/reply/:replyId", reportReply);
router.put("/:reportId", authorizeAdmin, updateReportStatus);
router.get("/", authorizeAdmin, getAllReports)

module.exports = router;
