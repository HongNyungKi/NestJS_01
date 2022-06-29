import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse(); // nest 자체적으로 response의 값이 string일 경우 그대로, 오브젝트의 경우 json형태로 취급 -> 이걸 직접 분기처리 해주자 

    if (typeof error === 'string') { // 직접 커스텀한 에러 핸들링
        response.status(status).json({
            success: false,
            timestamp: new Date().toISOString(),
            path: request.url,
            error,
        });
    } else { // nest 자체에서 발생시키는 에러 핸들링
        response.status(status).json({
            success: false,
            timestamp: new Date().toISOString(),
            ...error,
        });
    }

    // 아래 형태는 express에서 res.status(400).send({blabla}) 와 같은 형태이다.
    // response
    //   .status(status)
    //   .json({
    //     success: false,
    //     statusCode: status,
    //     timestamp: new Date().toISOString(),
    //     path: request.url,
    //     error,
    //   });
  }
}