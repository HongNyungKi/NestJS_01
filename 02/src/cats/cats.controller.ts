import { Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http.exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.intercepter';
import { positiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { CatsService } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter) // controller 레벨 필터 적용(에러 필터)
export class CatsController {
    constructor (private readonly catsService: CatsService) {}

    @Get('/get')
    getAllCat() {
        // throw new Error(''); express에서 에러 처리

        // throw new HttpException('api is broken', 401); nestjs 에러

        // throw new HttpException('forbidden', HttpStatus.FORBIDDEN);

        // throw new HttpException({
        //     status: HttpStatus.FORBIDDEN,
        //     error: 'this is a custoam error'
        // }, HttpStatus.FORBIDDEN);

        // throw new HttpException({ 
        //     success: false, 
        //     messgae: ''
        //  }, 401)
        throw new HttpException('고양이를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);

        return 'all cats';
    }

    @Get('/:id')
    getOne(@Param('id', ParseIntPipe, positiveIntPipe) param) {
        console.log('hello constroller')
        return { cat: '야용이' };
    }

    @Patch()
    updateCat() {
        return 'update cat';
    }

    @Delete()
    deleteCat() {
        return 'delete cat';
    }
}
