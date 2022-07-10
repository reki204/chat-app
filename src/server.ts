import express from 'express';
import * as http from 'http';
import * as socketio from "socket.io";

const app: express.Express = express();
const PORT: Number = 3000;
const server: http.Server = http.createServer(app);
const io = new socketio.Server(server);

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: socketio.Socket) => {
  console.log('ユーザーが接続しました');

  socket.on('chat message', (msg: string) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
});

server.listen(PORT, (err?: any) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`listening on ${PORT}`);
});
