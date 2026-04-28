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

router.delete("/post/:postId", /* #swagger.tags = ['Report Controller'] */ reportPost);
router.delete("/comment/:commentId", /* #swagger.tags = ['Report Controller'] */ reportComment);
router.delete("/reply/:replyId", /* #swagger.tags = ['Report Controller'] */ reportReply);
router.put("/:reportId", /* #swagger.tags = ['Report Controller'] */ authorizeAdmin, updateReportStatus);
router.get("/", /* #swagger.tags = ['Report Controller'] */ authorizeAdmin, getAllReports)

module.exports = router;
