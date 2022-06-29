import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // http프로토콜에 관한 로거 

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(req.ip, req.method, req.originalUrl);
    
    // response가 완료 되었을때 사용하는 로거
    res.on('finish', () => {
      this.logger.log(`${req.ip} ${req.method} ${req.originalUrl}`, res.statusCode);
    });
    next();
  }
}
