import {Get, Controller, Res, Param} from '@nestjs/common';
import * as moment from 'moment';
import {FileService} from '../file/file.service';
import {WebsocketService} from '../websocket.service';

@Controller('dl')
export class DlController {

  constructor (private fileService: FileService, private ws: WebsocketService) {
  }

  @Get(':id')
  redirect(@Res() res, @Param('id') id: string) {
    const url = `https://file.io/${id}`;
    const update = {
      used: true,
      dlTime: moment().format('X')
    };

    res.redirect(url);
    this.fileService.markFileAsUsed(id, update).then((doc) => {
      this.ws.fileUsed(doc);
    });
  }
}
