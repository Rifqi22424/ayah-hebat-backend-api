const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const createCommentBook = async (req, res) => {
    try {
        const idBook = parseInt(req.params.bookId);
        const userId = parseInt(req.userId);
        const { description } = req.body;

        const commentBook = await prisma.commentBook.create({
            data: {
                userId: userId,
                bookId: idBook,
                description
            }


        });

        return res.status(200).json({
            message: "succses create comment",
            data: {
                commentBook
            }
        });

    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
}

const showComment = async (req, res) => {
    try {
        const bookId = parseInt(req.params.id);

        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            },
            select: {
                name: true,
                description: true,
                imageurl: true,
                comment_book: {
                    select: {
                        description: true,
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
                        }
                    }
                },
            }
        });

        return res.status(200).json({
            message: "succses show comment",
            data: book
        })
    } catch (e){
        return res.status(500).json({
            message: e.message
        })
    }
}

const editComment = async (req, res) => {
    try {
        const bookId = parseInt(req.params.bookId);
        const userId = parseInt(req.userId);
        const commentId = parseInt(req.params.commentId);
        const { description } = req.body;

        const comment = await prisma.commentBook.findUnique({
            where: {
                id: commentId
            }
        });

        if(!comment || comment.bookId !== bookId) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if(comment.userId !== userId) {
            return res.status(401).json({
                message: "You are not authorized to edit this comment"
            });
        }

        await prisma.commentBook.update({
            where: {
                id: commentId
            },
            data: {
                description
            }
        });

        return res.status(200).json({
            message: "success update comment",
            data: {
                description
            }
        });

    } catch (e) {
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

const deleteComment = async (req, res) => {
    try {
        const bookId = parseInt(req.params.bookId);
        const userId = parseInt(req.userId);
        const commentId = parseInt(req.params.commentId);

        const comment = await prisma.commentBook.findUnique({
            where: {
                id: commentId
            }
        });

        if(!comment || comment.bookId !== bookId) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if(comment.userId !== userId) {
            return res.status(401).json({
                message: "You are not authorized to delete this comment"
            });
        }

        await prisma.commentBook.delete({
            where: {
                id: commentId
            }
        });

        return res.status(200).json({
            message: "success delete comment"
        });

    } catch (e) {
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

module.exports = { showComment, createCommentBook, editComment, deleteComment }