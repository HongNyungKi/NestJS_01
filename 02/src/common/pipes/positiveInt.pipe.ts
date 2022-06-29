import { HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class positiveIntPipe implements PipeTransform {
    transform(value: number) { // 이 함수의 결과값이 해당 파이프클래스의 결과값이다. 
        
        if (value < 0) throw new HttpException('음수값은 받지 않음', 400);

        return value;
    }
}