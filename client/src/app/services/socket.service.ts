import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {AuthService} from './auth.service';
import {UserModel} from '../models/user.model';
import {FileService} from './file.service';

@Injectable()
export class SocketService {

  socket;
  user: UserModel;

  constructor (private authService: AuthService, private fileService: FileService) {
    authService.user.subscribe((user) => {
      if (user) {
        this.updateConnection(user);
      }
    });

    this.socket = io('http://localhost:81/');

    this.socket.once('connect', () => {
      console.log('connected');
    });

    this.socket.on('file added', (data) => {
      this.fileService.fileAdded(data);
    });

    this.socket.on('file changed', (data) => {
      this.fileService.fileChanged(data);
    });

    this.socket.on('files deleted', data => {
      this.fileService.filesDeleted(data);
    });
  }

  updateConnection (user) {
    if (this.user) {
      this.socket.emit('change user', {userId: user.uid, oldUserId: this.user.uid});
    } else {
      this.socket.emit('new user', {userId: user.uid});
    }
    this.user = user;
  }
}
