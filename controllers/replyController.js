const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createReply = async (req, res) => {
  try {
    let commentId = parseInt(req.params.commentId);
    const { body } = req.body;
    const userId = req.userId;

    if (!body) {
      return res.status(400).json({ error: "Body is missing" });
    }

    const checkComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!checkComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const reply = await prisma.reply.create({
      data: {
        userId,
        commentId,
        body,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                nama: true,
                photo: true,
              },
            },
          },
        },
        _count: {
          select: { replyLikes: true },
        },
      },
    });

    const isLikedByMe = await prisma.replyLike.findFirst({
      where: {
        replyId: reply.id,
        userId,
      },
    });

    const formattedReply = {
      ...reply,
      isLikedByMe: !!isLikedByMe,
    };

    res.json({ message: "Reply added successfully", data: formattedReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editReply = async (req, res) => {
  try {
    const { body } = req.body;
    let replyId = parseInt(req.params.replyId);
    const userId = req.userId;

    const findReply = await prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!findReply) {
      return res.status(404).json({ error: "Reply not found" });
    } else if (findReply.userId != userId) {
      return res.status(203).json({ error: "Unauthorized access" });
    }

    const editReply = await prisma.reply.update({
      where: { id: replyId },
      data: {
        body,
      },
    });

    res.json({ message: "Reply edited successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteReply = async (req, res) => {
  try {
    let replyId = parseInt(req.params.replyId);
    const userId = req.userId;

    const findReply = await prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!findReply) {
      return res.status(404).json({ error: "Reply not found" });
    } else if (findReply.userId != userId) {
      return res.status(203).json({ error: "Unauthorized access" });
    }

    const deleteReply = await prisma.reply.delete({
      where: { id: replyId },
    });

    res.json({ message: "Reply deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAllReply = async (req, res) => {
  try {
    const userId = req.userId;

    const deleteReply = await prisma.reply.deleteMany();

    res.json({ message: "All Reply deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReplyCommentsById = async (req, res) => {
  try {
    const sort = req.query.sort || "likes";
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const commentId = parseInt(req.params.commentId);
    const userId = req.userId;

    let orderBy = {};

    if (sort === "likes") {
      orderBy = [
        {
          replyLikes: {
            _count: "desc",
          },
        },
        {
          createdAt: "asc", 
        },
      ];
    } else if (sort === "recent") {
      orderBy = {
        createdAt: "desc",
      };
    }

    const replies = await prisma.reply.findMany({
      where: { commentId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                nama: true,
                photo: true,
              },
            },
          },
        },
        _count: {
          select: { replyLikes: true },
        },
      },
      orderBy,
      skip: offset,
      take: limit,
    });

    const formattedReplies = await Promise.all(
      replies.map(async (reply) => {
        const isLikedByMe = await prisma.replyLike.findFirst({
          where: {
            replyId: reply.id,
            userId,
          },
        });

        return {
          ...reply,
          isLikedByMe: !!isLikedByMe,
        };
      })
    );

    res.status(200).json(formattedReplies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likeReply = async (req, res) => {
  try {
    let replyId = parseInt(req.params.replyId);
    let userId = req.userId;

    const findReply = await prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!findReply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    const checkLikeReply = await prisma.replyLike.findFirst({
      where: { userId, replyId },
    });

    // console.log(checkLikeReply.length);

    if (checkLikeReply) {
      await prisma.replyLike.deleteMany({
        where: { userId, replyId },
      });
      res.json({ message: "Reply unliked successfully" });
    } else {
      await prisma.replyLike.create({
        data: {
          replyId,
          userId,
        },
      });
      res.json({ message: "Reply liked successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createReply,
  editReply,
  deleteReply,
  deleteAllReply,
  getReplyCommentsById,
  likeReply,
};
