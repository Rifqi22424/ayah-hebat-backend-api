const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const createCommentBook = async (req, res) => {
    try {
        const idBook = parseInt(req.params.id);
        const userId = parseInt(req.userId);
        const { description } = req.body;

        await prisma.commentBook.create({
            data: {
                userId: userId,
                bookId: idBook,
                description
            }


        });

        return res.status(200).json({
            message: "succses create comment",
            data: {
                description
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

module.exports = { showComment, createCommentBook }