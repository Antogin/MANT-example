import * as SocketIO from 'socket.io';
import Socket = SocketIO.Socket;
import {FileModel} from './file/file.models';

export class WebsocketService {

  users: { [userId: string]: Array<Socket> } = {};
  connections: { [socketId: string]: string } = {};

  constructor () {
  }

  newUser (userId, sender) {
    let currentSockets = this.users[userId];
    currentSockets = currentSockets ? currentSockets : [];
    currentSockets.push(sender);

    this.users[userId] = currentSockets;
    this.connections[sender.id] = userId;
  }

  changeUser (userId, oldUserId, sender) {
    let currentSockets = this.users[oldUserId];

    if (currentSockets) {
      this.users[oldUserId] = currentSockets.filter((connection: Socket) => {
        return connection.id !== sender.id;
      });
    }
    this.newUser(userId, sender);
  }

  disconnectUser (socket) {
    const userId = this.connections[socket.id];
    const currentSockets = this.users[userId];

    if (currentSockets) {
      this.users[userId] = currentSockets.filter((connection: Socket) => {
        return connection.id !== socket.id;
      });
    }
  }

  fileAdded (file: FileModel) {
    const userConnections = this.users[file.userId];

    if (userConnections) {
      userConnections.forEach((connection) => {
        connection.emit('file added', file);
      });
    }
  }

  fileUsed (file: FileModel) {
    const userConnections = this.users[file.userId];

    if (userConnections) {
      userConnections.forEach((connection) => {
        connection.emit('file changed', file);
      });
    }
  }

  filesDeleted (ids: string[], userId: string) {
    console.log(userId);
    const userConnections = this.users[userId];

    if (userConnections) {
      userConnections.forEach((connection) => {
        connection.emit('files deleted', ids);
      });
    }
  }
}
