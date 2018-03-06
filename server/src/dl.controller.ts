import {Get, Controller, Res, Param, Headers} from '@nestjs/common';
import {FirebaseService} from './firebase.service';

@Controller('dl')
export class DlController {

  constructor (private fireBaseService: FirebaseService) {
  }

  @Get(':id')
  redirect (@Res() res, @Param('id') id: string) {
    const url = `https://file.io/${id}`;
    res.redirect(url);
    this.fireBaseService.markFileAsUsed(id);
  }
}
