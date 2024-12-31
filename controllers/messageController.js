const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


// GET /messages?receipentId=1&limit=10&offset=0
const getMessages = async (req, res) => {

    const userId = (req.userId); 
    const receipentId = parseInt(req.query.receipentId);
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);

    console.log(userId, receipentId, limit, offset);

    if(!receipentId){
        return res.status(400).json({
            error: "receipentId required"
        })
    }

    try {
        const message = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            {senderId: userId},
                            {receipientId: receipentId}
                        ]
                    },
                    {
                        AND: [
                            {senderId: receipentId},
                            {receipientId: userId}
                        ]
                    }
                ]
            },
            take: limit,
            skip: offset
        });

        return res.status(200).json({
            message: "success get message",
            data: message

        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            error: "internal server error"
        })
    }
}

// POST /messages


module.exports ={getMessages}