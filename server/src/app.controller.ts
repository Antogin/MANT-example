import {Get, Controller, Res} from '@nestjs/common';
import * as path from 'path';
import {WebsocketService} from './websocket.service';

@Controller()
export class AppController {
  constructor (private ws: WebsocketService) {
  }

  @Get()
  app (@Res() res) {
    const dir = path.join(__dirname + '/front-end/index.html');
    res.sendFile(dir);
  }
}
