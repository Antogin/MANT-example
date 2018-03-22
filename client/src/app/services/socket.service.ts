import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {AuthService} from './auth.service';
import {UserModel} from '../models/user.model';
import {FileService} from './file.service';
import {FileModel} from '../models/file.model';

@Injectable()
export class SocketService {

  socket;
  user: UserModel;

  constructor (private authService: AuthService, private fileService: FileService) {
    this.socket = io('http://localhost:4201/');

    authService.user.subscribe((user) => {
      console.log('updateConnection', user);
      if (user) {
        this.updateConnection(user);
      }
    });


    this.socket.once('connect', () => {
      console.log('connected');
    });

    this.socket.on('file added', (data: FileModel) => {
      this.fileService.fileAdded(data);
    });

    this.socket.on('file changed', (data: FileModel) => {
      this.fileService.fileChanged(data);
    });

    this.socket.on('files deleted', data => {
      this.fileService.filesDeleted(data);
    });
  }

  updateConnection (user: UserModel) {
    if (this.user) {
      this.socket.emit('change user', {userId: user._id, oldUserId: this.user._id});
    } else {
      this.socket.emit('new user', {userId: user._id});
    }
    this.user = user;
  }
}
