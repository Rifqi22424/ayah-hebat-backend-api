const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to report a post
const reportPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const { reason } = req.body;
    const userId = req.userId;

    if (!postId || !reason) {
      return res.status(400).json({ error: "Post ID and reason are required" });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Create the report
    const report = await prisma.report.create({
      data: {
        userId,
        postId,
        reason,
      },
    });

    res.json({ message: "Post reported successfully.", data: report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to report a comment
const reportComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId);
    const { reason } = req.body;
    const userId = req.userId;

    if (!commentId || !reason) {
      return res
        .status(400)
        .json({ error: "Comment ID and reason are required" });
    }

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Create the report
    const report = await prisma.report.create({
      data: {
        userId,
        commentId,
        reason,
      },
    });

    res.json({ message: "Comment reported successfully.", data: report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to report a reply
const reportReply = async (req, res) => {
  try {
    const replyId = parseInt(req.params.replyId);
    const { reason } = req.body;
    const userId = req.userId;

    if (!replyId || !reason) {
      return res
        .status(400)
        .json({ error: "Reply ID and reason are required" });
    }

    // Check if reply exists
    const reply = await prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    // Create the report
    const report = await prisma.report.create({
      data: {
        userId,
        replyId,
        reason,
      },
    });

    res.json({ message: "Reply reported successfully.", data: report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update the status of a report
const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;

    if (!reportId || !status) {
      return res
        .status(400)
        .json({ error: "Report ID and new status are required" });
    }

    // Update the status of the report
    const report = await prisma.report.update({
      where: { id: parseInt(reportId) },
      data: { status },
    });

    res.json({ message: "Report status updated successfully.", data: report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all reports, optionally filtering by status
const getAllReports = async (req, res) => {
  try {
    const { status } = req.query; // Optional status filter

    // Fetch all reports, with optional filtering by status
    const reports = await prisma.report.findMany({
      where: status ? { status } : {},
      include: {
        user: true,
        post: true,
        comment: true,
        reply: true,
      },
      orderBy: {
        createdAt: "desc", // Sort by creation date, newest first
      },
    });

    res.json({ message: "Reports retrieved successfully.", data: reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  reportPost,
  reportComment,
  reportReply,
  updateReportStatus,
  getAllReports,
};
