import {Get, Controller, Res} from '@nestjs/common';
import * as path from 'path';
import {WebsocketService} from './websocket.service';

@Controller()
export class AppController {
  constructor (private ws: WebsocketService) {
    // setInterval(() => {
    //     console.log('interval');
    //     console.log(this.ws.users)
    // }, 2000)
  }

  @Get()
  app (@Res() res) {
    let dir = path.join(__dirname + '/front-end/index.html');
    res.sendFile(dir);
  }
}
