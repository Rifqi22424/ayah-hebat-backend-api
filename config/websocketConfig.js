const {WebSocketServer} = require('ws');
const WebSocket = require('ws');
const http = require('http');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


function setupWebSocket(server){
    try {
        const wss = new WebSocketServer({noServer: true});
        const wsconnection = new Map();

        server.on('upgrade', (request, socket, head) => {
            authenticate(request, (err, client) => {
                if(err && client == null){
                    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                    socket.destroy();
                    return;
                }
                
                wss.handleUpgrade(request, socket, head, (ws) => {
                    wsconnection.set(client.userId, ws);
                    wss.emit('connection', ws, request, client);
                })
            })
        })

        wss.on('connection', (ws, request, client) => {

            //store websocket connection
            ws.on('message', async (message, isBinary) => {
                const data = JSON.parse(message);
                if(isBinary){
                    // TODO: Next Feature
                    ws.send('Binary message currently not supported');
                    return;
                }

                const {content, senddate, receipentId} = data;
                const receipentWs = wsconnection.get(receipentId);
                if(!receipentWs || receipentWs.readyState !== WebSocket.OPEN){
                    ws.send(`user ${receipentId} is not online`);
                    // TODO: Notification to user
                    return;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        id: client.userId
                    }
                });

                const receipent = await prisma.user.findUnique({
                    where: {
                        id: receipentId
                    }
                });

                const a = await prisma.message.create({
                    data: {
                        content,
                        senderId: client.userId,
                        receipientId: receipentId
                    }
                });
                
                // Send to receipent 
                receipentWs.send(JSON.stringify({content, senddate, senderId: client.userId}));
                
            });

            ws.on('close', () => {
                wsconnection.delete(client.id);
            })
        })
    } catch (error) {
        console.error(error);
    }
}

function authenticate(request, callback){
    try {
        const authHeader = request.headers.authorization;
        if(!authHeader){
            callback('Unauthorized', null);
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        callback(null, decoded);
    } catch (e) {
        callback(e, null);
    }
}

module.exports = setupWebSocket;