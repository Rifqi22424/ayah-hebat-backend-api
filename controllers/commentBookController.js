const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCommentBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const userId = parseInt(req.userId);
    const { description } = req.body;

    const commentBook = await prisma.commentBook.create({
      data: {
        userId,
        bookId,
        description,
      },
    });

    return res.status(200).json({
      message: "succses create comment",
      data: {
        commentBook,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const editComment = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const userId = parseInt(req.userId);
    const commentId = parseInt(req.params.commentId);
    const { description } = req.body;

    const comment = await prisma.commentBook.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment || comment.bookId !== bookId) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId !== userId) {
      return res.status(401).json({
        message: "You are not authorized to edit this comment",
      });
    }

    await prisma.commentBook.update({
      where: {
        id: commentId,
      },
      data: {
        description,
      },
    });

    return res.status(200).json({
      message: "success update comment",
      data: {
        description,
      },
    });
  } catch (e) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const userId = parseInt(req.userId);
    const commentId = parseInt(req.params.commentId);

    const comment = await prisma.commentBook.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment || comment.bookId !== bookId) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId !== userId) {
      return res.status(401).json({
        message: "You are not authorized to delete this comment",
      });
    }

    await prisma.commentBook.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(200).json({
      message: "success delete comment",
    });
  } catch (e) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { createCommentBook, editComment, deleteComment };
