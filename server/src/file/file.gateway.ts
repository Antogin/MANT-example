import {
  WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException,
  NestGateway,
} from '@nestjs/websockets';
import * as SocketIO from 'socket.io';
import Server = SocketIO.Server;
import Socket = SocketIO.Socket;
import {WebsocketService} from '../websocket.service';

@WebSocketGateway(4201)
export class FileGateway implements NestGateway {
  @WebSocketServer() server: Server;

  constructor (private ws: WebsocketService) {
  }

  afterInit (server) {
  }

  handleConnection (socket: Socket) {
  }

  handleDisconnect (socket: Socket) {
    this.ws.disconnectUser(socket);
  }

  @SubscribeMessage({value: 'new user'})
  handleNewUser (sender: Socket, data: { userId: string }) {
    this.ws.newUser(data.userId, sender);
  }

  @SubscribeMessage({value: 'change user'})
  handleChangeUser (sender: Socket, data: { userId: string, oldUserId: string }) {
    this.ws.changeUser(data.userId, data.oldUserId, sender);
  }
}
