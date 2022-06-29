import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 인터셉터는 컨트롤러 진입 전과 진입 후에 처리를 나눠서 해준다. 
    // 보통 컨트롤러 진입전에 수행하는 기능은 미들웨어로 많이 하고, 진입 후 처리를 인터셉터로 많이 한다.
    // console.log('Before...');

    return next
      .handle()
      .pipe(map((data) => ({ // 여기서 인자인 data는 컨트롤러가 return한 결과값이다.
        success: true,
        data,
      })))
  }
}