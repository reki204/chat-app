import express from 'express';
import * as http from 'http';
import * as socketio from "socket.io";
import createHttpError from 'http-errors';

export class AppServer {
  public app: express.Application;
  public server: http.Server;
  public PORT: number;
  public io: any;

  constructor() {
    this.app = express();
    this.PORT = 3000;
    this.server = http.createServer(this.app);
    this.io = new socketio.Server(this.server);
    this.routes();
  };

  public routes() {
    this.app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.sendFile(__dirname + '/index.html');
    });

    this.io.on('connection', (socket: socketio.Socket) => {
      console.log('ユーザーが接続しました');
  
      socket.on('chat message', (msg: string) => {
        console.log(msg);
        this.io.emit('chat message', msg);
      });
    });

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(new createHttpError.NotFound());
    });
    
    // errorHandler
    const errHandler: express.ErrorRequestHandler = (err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        status: err.status || 500,
        message: err.message
      });
    };

    this.app.use(errHandler);
  };


  public start() {
    this.app.listen(this.PORT, (err?: any) => {
      if (err) {
        return console.error(err);
      }
      return console.log(`listening on ${this.PORT}`);
    });
  };
};
