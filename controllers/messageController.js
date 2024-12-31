const {PrismaClient} = require('@prisma/client');
const { websocketEmitter } = require('../config/WsConfig');
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

// POST /messages/:userId
const sendMessages = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const currentUser = parseInt(req.userId);

  const imageUrl = req.file ? req.file.path : null;
  
  const textType = req.file ? 'IMAGE' : 'TEXT';
  const text = req.file ? imageUrl : req.body.text;

  if(!text){
    return res.status(400).json({
        error: "text required"
    })
  }

  if(currentUser === userId){
    return res.status(400).json({
        error: "you can't send message to yourself"
    })
  }

  const recipientUser = await prisma.user.findUnique({
    where: {
        id: userId
    }
  });

  if(!recipientUser){
    return res.status(404).json({
        error: "user not found"
    })
  }

  const data = {
    senderId: currentUser,
    recipientId: userId,
    text: text,
    type: textType
  }

  try {
    websocketEmitter.emit('message', data);

    const message = await prisma.message.create({
      data: data
    });

    return res.status(200).json({
      message: "success send message",
      data: message
    })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "internal server error"
    })  
  }
}

const getMessagesWithUserId = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const currentUserId = parseInt(req.userId);

  if(currentUserId === userId){
    return res.status(400).json({
        error: "you can't get message with yourself"
    })
  }

  const recipientUser = await prisma.user.findUnique({
    where: {
        id: userId
    }
  });

  if(!recipientUser){
    return res.status(404).json({
        error: "user not found"
    })
  }

  const message = await prisma.message.findMany({
    where: {
        OR: [
            {
                AND: [
                    {senderId: currentUserId},
                    {recipientId: userId}
                ]
            },
            {
                AND: [
                    {senderId: userId},
                    {recipientId: currentUserId}
                ]
            }
        ]
    },
    orderBy: {
      id: 'desc'
    }
  });

  return res.status(200).json({
    message: "success get message",
    data: message
  })
}


module.exports = { getMessages, sendMessages, getMessagesWithUserId }