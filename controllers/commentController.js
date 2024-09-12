const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createComment = async (req, res) => {
    try {
      let { postId } = req.params;
      const { body } = req.body;
      const userId = req.userId;

      postId = parseInt(postId);

      if (!body) {
        return res.status(400).json({ error: 'Body is missing'})
      }

      const checkPost = await prisma.post.findUnique({
        where: { id: postId }
      });

      if (!checkPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const post = await prisma.comment.create({
        data: {
            userId,
            postId,
            body,
        }
      });
  
      res.json({ message: 'Comment added successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const editComment = async (req, res) => {
    try {
      const { body } = req.body;
      let { commentId } = req.params;
      const userId = req.userId;
      
      commentId = parseInt(commentId)
      
      const findComment = await prisma.comment.findUnique({
        where: { id: commentId }
      });

      if (!findComment) {
        return res.status(404).json({ error: 'Comment not found' });
      } else if (findComment.userId != userId) {
        return res.status(203).json({ error: 'Unauthorized access'})
      }

      const editComment = await prisma.comment.update({
        where: { id: commentId },
        data: {
            body,
        }
      });
  
      res.json({ message: 'Comment edited successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteComment = async (req, res) => {
    try {
      let { commentId } = req.params;
      const userId = req.userId;

      commentId = parseInt(commentId);
      
      const findComment = await prisma.comment.findUnique({
        where: { id: commentId }
      });

      if (!findComment) {
        return res.status(404).json({ error: 'Comment not found' });
      } else if (findComment.userId != userId) {
        return res.status(203).json({ error: 'Unauthorized access'})
      }

      const deleteComment = await prisma.comment.delete({
        where: { id: commentId },
      });
  
      res.json({ message: 'Comment deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getPostCommentsById = async (req, res) => {
    try {
        
        const sort = req.query.sort || 'likes';
        const limit = parseInt(req.query.limit) || 5;
        const offset = parseInt(req.query.offset) || 0;
        let { postId } = req.params;
        const userId = req.userId;

        postId = parseInt(postId);

        let orderBy = {}

        if (sort === 'likes') {
            orderBy = {
                commentLikes: {
                    _count: 'desc',
                }
            };
        } else if (sort === 'recent') {
            orderBy = {
                createdAt: 'desc',
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
                      }
                    }
                }
            },
            _count: {
                select: { commentLikes: true, replies: true }
            },
        },
        orderBy,
        skip: offset,
        take: limit,
      });

      const formattedComments = await Promise.all(
        comments.map(async (comment) => {
          const isLikedByMe = await prisma.commentLike.findFirst({
            where: {
              commentId: comment.id,
              userId,
            },
          });
  
          return {
            ...comment,
            isLikedByMe: !!isLikedByMe, 
          };
        })
      );
  
      res.status(200).json(formattedComments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const likeComment = async (req, res) => {
    try {
        let { commentId } = req.params;
        let userId = req.userId;

        commentId = parseInt(commentId);
        userId = parseInt(userId);

        const findPost = await prisma.comment.findUnique({
            where: { id: commentId }
          });
    
          if (!findPost) {
            return res.status(404).json({ error: 'Comment not found' });
          } 

        const checkLikeComment = await prisma.commentLike.findFirst({
            where: { userId, commentId },
        });

        // console.log(checkLikeComment.length);
        
        if (checkLikeComment) {
            await prisma.commentLike.deleteMany({
                where: { userId, commentId },
            });
            res.json({ message: 'Comment unliked successfully'});
        } else {
            await prisma.commentLike.create({
                data: {
                    commentId,
                    userId
                }
            });
            res.json({ message: 'Comment liked successfully'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
  };

module.exports = {createComment, editComment, deleteComment, getPostCommentsById, likeComment};
