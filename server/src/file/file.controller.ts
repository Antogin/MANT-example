import {Get, Controller, Res, Post, Req, Body, Param, Headers, Delete} from '@nestjs/common';
import {FileService} from './file.service';
import {AddFileDTO} from './file.models';
import {WebsocketService} from '../websocket.service';
import moment = require('moment');

@Controller('file')
export class FileController {

  constructor (private fileService: FileService, private ws: WebsocketService) {
  }

  @Get()
  getFiles (@Res() res, @Headers() headers) {
    const userId = headers.userid;

    this.fileService.findUserFiles(userId).then(data => {
      res.json(data);
    });
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
      console.log(doc);
      this.ws.fileUsed(doc);
    });
  }

  @Post()
  addFile (@Res() res, @Body() addFileDTO: AddFileDTO) {
    this.fileService.create(addFileDTO).then((item) => {
      res.json(item);
      this.ws.fileAdded(item);
    });
  }

  @Delete()
  deleteFiles (@Res() res, @Body() fileIds: string[], @Headers() headers) {
    const userId = headers.userid;

    console.log(fileIds);

    this.fileService.deleteFiles(fileIds).then(() => {
      this.ws.filesDeleted(fileIds, userId);
      res.json({});
    });
  }
}
