import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(
      @Req() req: Request,
      @Res() res: Response
  ) {
    console.log(
      2222222,
      '<<<<<<<<<<<<<< 2222222',
    );
    return res.status(201).send({
      status: 'ok'
    });
  }
}
