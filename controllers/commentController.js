const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createComment = async (req, res) => {
  try {
    let { postId } = req.params;
    const { body } = req.body;
    const userId = req.userId;

    postId = parseInt(postId);

    if (!body) {
      return res.status(400).json({ error: "Body is missing" });
    }

    const checkPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!checkPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        userId,
        postId,
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
          select: { commentLikes: true, replies: true },
        },
        replies: {
          take: 1,
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
        },
      },
    });

    const formattedComments = await formatSingleComment(comment, userId);

    res.json({
      message: "Comment added successfully.",
      data: formattedComments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editComment = async (req, res) => {
  try {
    const { body } = req.body;
    let { commentId } = req.params;
    const userId = req.userId;

    commentId = parseInt(commentId);

    const findComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!findComment) {
      return res.status(404).json({ error: "Comment not found" });
    } else if (findComment.userId != userId) {
      return res.status(203).json({ error: "Unauthorized access" });
    }

    const editedComment = await prisma.comment.update({
      where: { id: commentId },
      data: {
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
          select: { commentLikes: true, replies: true },
        },
        replies: {
          take: 1,
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
        },
      },
    });

    const formattedComment = await formatSingleComment(editedComment, userId);

    res.json({
      message: "Comment edited successfully.",
      data: formattedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    let { commentId } = req.params;
    const userId = req.userId;

    commentId = parseInt(commentId);

    const findComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!findComment) {
      return res.status(404).json({ error: "Comment not found" });
    } else if (findComment.userId != userId) {
      return res.status(203).json({ error: "Unauthorized access" });
    }

    const deleteComment = await prisma.comment.delete({
      where: { id: commentId },
    });

    res.json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPostCommentsById = async (req, res) => {
  try {
    const sort = req.query.sort || "likes";
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    let { postId } = req.params;
    const userId = req.userId;

    postId = parseInt(postId);

    let orderBy = {};

    if (sort === "likes") {
      orderBy = {
        commentLikes: {
          _count: "desc",
        },
      };
    } else if (sort === "recent") {
      orderBy = {
        createdAt: "desc",
      };
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
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
          select: { commentLikes: true, replies: true },
        },
        replies: {
          take: 1,
          orderBy: [
            {
              replyLikes: {
                _count: "desc",
              },
            },
            {
              createdAt: "desc",
            },
          ],
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
        },
      },
      orderBy,
      skip: offset,
      take: limit,
    });

    // const formattedComments = await Promise.all(
    //   comments.map(async (comment) => {
    //     const isLikedByMe = await prisma.commentLike.findFirst({
    //       where: {
    //         commentId: comment.id,
    //         userId,
    //       },
    //     });

    //     const formattedReplies = await Promise.all(
    //       comment.replies.map(async (reply) => {
    //         const isReplyLikedByMe = await prisma.replyLike.findFirst({
    //           where: {
    //             replyId: reply.id,
    //             userId,
    //           },
    //         });

    //         return {
    //           ...reply,
    //           isLikedByMe: !!isReplyLikedByMe, // Check if the reply is liked by the user
    //         };
    //       })
    //     );

    //     return {
    //       ...comment,
    //       isLikedByMe: !!isLikedByMe,
    //       replies: formattedReplies,
    //     };
    //   })
    // );

    const formattedComments = await formatComments(comments, userId);

    res.status(200).json(formattedComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const formatComments = async (comments, userId) => {
  return await Promise.all(
    comments.map(async (comment) => {
      const isLikedByMe = await prisma.commentLike.findFirst({
        where: {
          commentId: comment.id,
          userId,
        },
      });

      const formattedReplies = await Promise.all(
        comment.replies.map(async (reply) => {
          const isReplyLikedByMe = await prisma.replyLike.findFirst({
            where: {
              replyId: reply.id,
              userId,
            },
          });

          return {
            ...reply,
            isLikedByMe: !!isReplyLikedByMe,
          };
        })
      );

      return {
        ...comment,
        isLikedByMe: !!isLikedByMe,
        replies: formattedReplies,
        _count: {
          ...comment._count,
          replies:
            comment._count.replies - 1 > 0 ? comment._count.replies - 1 : 0,
        },
      };
    })
  );
};

const formatSingleComment = async (comment, userId) => {
  const isLikedByMe = await prisma.commentLike.findFirst({
    where: {
      commentId: comment.id,
      userId,
    },
  });

  const formattedReplies = await Promise.all(
    comment.replies.map(async (reply) => {
      const isReplyLikedByMe = await prisma.replyLike.findFirst({
        where: {
          replyId: reply.id,
          userId,
        },
      });

      return {
        ...reply,
        isLikedByMe: !!isReplyLikedByMe,
      };
    })
  );

  return {
    ...comment,
    isLikedByMe: !!isLikedByMe,
    replies: formattedReplies,
  };
};

const likeComment = async (req, res) => {
  try {
    let { commentId } = req.params;
    let userId = req.userId;

    commentId = parseInt(commentId);
    userId = parseInt(userId);

    const findComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!findComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const checkLikeComment = await prisma.commentLike.findFirst({
      where: { userId, commentId },
    });

    if (checkLikeComment) {
      await prisma.commentLike.deleteMany({
        where: { userId, commentId },
      });
      res.json({ message: "Comment unliked successfully" });
    } else {
      await prisma.commentLike.create({
        data: {
          userId,
          commentId,
        },
      });
      res.json({ message: "Comment liked successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createComment,
  editComment,
  deleteComment,
  getPostCommentsById,
  likeComment,
};
