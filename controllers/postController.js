const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const formatPost = async (post, userId) => {
  const isLikedByMe = await prisma.postLike.findFirst({
    where: {
      postId: post.id,
      userId,
    },
  });

  const isDislikedByMe = await prisma.postDislike.findFirst({
    where: {
      postId: post.id,
      userId,
    },
  });

  return {
    ...post,
    isLikedByMe: !!isLikedByMe,
    isDislikedByMe: !!isDislikedByMe,
  };
};

const createPost = async (req, res) => {
  try {
    const { body } = req.body;
    const userId = req.userId;

    if (!body) {
      return res.status(400).json({ error: "Body is missing" });
    }

    const post = await prisma.post.create({
      data: {
        userId,
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
          select: { postLikes: true, postDislikes: true, comments: true },
        },
      },
    });

    const formattedPost = await formatPost(post, userId);

    res.json({ message: "Post added successfully.", data: formattedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editPost = async (req, res) => {
  try {
    const { body } = req.body;
    let { postId } = req.params;
    const userId = req.userId;

    postId = parseInt(postId);

    const findPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!findPost) {
      return res.status(404).json({ error: "Post not found" });
    } else if (findPost.userId != userId) {
      return res.status(203).json({ error: "Unauthorized access" });
    }

    const editPost = await prisma.post.update({
      where: { id: postId },
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
          select: { postLikes: true, postDislikes: true, comments: true },
        },
      },
    });

    const formattedPost = await formatPost(editPost, userId);

    res.json({ message: "Post edited successfully.", data: formattedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    let { postId } = req.params;
    const userId = req.userId;

    postId = parseInt(postId);

    const findPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!findPost) {
      return res.status(404).json({ error: "Post not found" });
    } else if (findPost.userId != userId) {
      return res.status(203).json({ error: "Unauthorized access" });
    }

    const deletePost = await prisma.post.delete({
      where: { id: postId },
    });

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const userId = req.userId;

    const posts = await prisma.post.findMany({
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
          select: { postLikes: true, postDislikes: true, comments: true },
        },
      },
      orderBy: {
        postLikes: {
          _count: "desc",
        },
      },
      skip: offset,
      take: limit,
    });

    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const isLikedByMe = await prisma.postLike.findFirst({
          where: {
            postId: post.id,
            userId,
          },
        });

        const isDislikedByMe = await prisma.postDislike.findFirst({
          where: {
            postId: post.id,
            userId,
          },
        });

        return {
          ...post,
          isLikedByMe: !!isLikedByMe,
          isDislikedByMe: !!isDislikedByMe,
        };
      })
    );

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchPosts = async (req, res) => {
  const query = req.query.query;
  const limit = parseInt(req.query.limit) || 5;
  const offset = parseInt(req.query.offset) || 0;
  const userId = req.userId;

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { body: { contains: query } },
          { user: { username: { contains: query } } },
        ],
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
          select: { postLikes: true, postDislikes: true, comments: true },
        },
      },
      skip: offset,
      take: limit,
    });

    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const isLikedByMe = await prisma.postLike.findFirst({
          where: {
            postId: post.id,
            userId,
          },
        });

        const isDislikedByMe = await prisma.postDislike.findFirst({
          where: {
            postId: post.id,
            userId,
          },
        });

        return {
          ...post,
          isLikedByMe: !!isLikedByMe,
          isDislikedByMe: !!isDislikedByMe,
        };
      })
    );

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likePost = async (req, res) => {
  try {
    let { postId } = req.params;
    let userId = req.userId;

    postId = parseInt(postId);
    userId = parseInt(userId);

    const findPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!findPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const checkLikePost = await prisma.postLike.findFirst({
      where: { userId, postId },
    });

    // console.log(checkLikePost.length);

    if (checkLikePost) {
      await prisma.postLike.deleteMany({
        where: { userId, postId },
      });
      res.json({ message: "Post unliked successfully" });
    } else {
      await prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      });
      res.json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const dislikePost = async (req, res) => {
  try {
    let { postId } = req.params;
    let userId = req.userId;

    postId = parseInt(postId);
    userId = parseInt(userId);

    const findPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!findPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const checkLikePost = await prisma.postDislike.findFirst({
      where: { userId, postId },
    });

    // console.log(checkLikePost.length);

    if (checkLikePost) {
      await prisma.postDislike.deleteMany({
        where: { userId, postId },
      });
      res.json({ message: "Post undisliked successfully" });
    } else {
      await prisma.postDislike.create({
        data: {
          postId,
          userId,
        },
      });
      res.json({ message: "Post disliked successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  searchPosts,
  likePost,
  dislikePost,
};
