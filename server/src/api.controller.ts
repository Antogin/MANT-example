import {Controller, Post, Res, Req} from '@nestjs/common';

@Controller('api')
export class ApiController {

  constructor () {
  }

  @Post()
  add (@Res() res, @Req() req): string {
    res.json({'gg': 'gg'});
    return 'API!';
  }
}
