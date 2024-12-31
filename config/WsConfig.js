const {WebSocketServer} = require('ws');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const EventEmitter = require('stream');

const websocketEmitter = new EventEmitter();

class WsConfig {
  constructor(server) {
    this.server = server;
  }

  start(){
    try {
      const wss = new WebSocketServer({noServer: true});
      const wsconnection = new Map();

      this.server.on('upgrade', (req, socket, head) => {
        this.authenticate(req, (err, client) => {
          if(err) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\n');
            socket.destroy();
            console.log(err);
            return;
          }
          
          wss.handleUpgrade(req, socket, head, (ws) => {
            wsconnection.set(client.id, ws);
            wss.emit('connection', ws, req, client);
          })
        })
      });
      
      websocketEmitter.on('message', (data) => {
        const {receipientId, text} = data;
        const wsReceipient = wsconnection.get(receipientId);
          if(wsReceipient) {
            wsReceipient.send(JSON.stringify({text}));
          }
          else{
            console.log('User is not connected');
          }
      });
    } catch (error) {
        console.error(error);
    }
  }

  authenticate(request, callback){
    try {
      const authHeader = request.headers.authorization;
      
      if(!authHeader){
        callback('Unauthorized', null);
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      console.log(decoded);
        
      callback(null, decoded);
    } catch (e) {
      callback(e, null);
    }
  }

}

exports.WsConfig = WsConfig;
module.exports.websocketEmitter = websocketEmitter;