import { Controller, Get, HttpStatus } from '@nestjs/common';
import * as process from 'process';

@Controller()
export class AppController {
  @Get(['', 'ping'])
  healthCheck(): any {
    const {
      DATABASE_HOST,
      DATABASE_PORT,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      DATABASE_NAME,
    } = process.env;
    return {
      statusCode: HttpStatus.OK,
      body: {
        DATABASE_HOST,
        DATABASE_PORT,
        DATABASE_USERNAME,
        DATABASE_PASSWORD,
        DATABASE_NAME,
      },
    };
  }
}
