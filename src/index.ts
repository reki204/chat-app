import express from 'express';
import * as http from 'http';

const app: express.Express = express();
const PORT: Number = 3000;
const server: http.Server = http.createServer(app);
const io = require('socket.io')(server);

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

server.listen(PORT, (err?: any) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`listening on ${PORT}`);
});


