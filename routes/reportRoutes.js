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

router.post("/post/:postId", reportPost);
router.post("/comment/:commentId", reportComment);
router.post("/reply/:replyId", reportReply);
router.put("/:reportId", authorizeAdmin, updateReportStatus);
router.get("/", authorizeAdmin, getAllReports)

module.exports = router;
