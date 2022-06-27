import { Cat } from "./app.model";
import * as express from "express";

// express 어플리케이션 인스턴스 생성
const app: express.Express = express();

// express에서 body값 가져오기 위함
app.use(express.json());

// 전체 라우터 적용 미들웨어
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.rawHeaders[1]);
    next();
});

// 특정 라우터 적용 미들웨어
app.post('/cat', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('post method router excute');
    next();
});

// READ 전체 조회
app.get('/cats', (req: express.Request, res: express.Response) => {
    try {
        const cats = Cat;

        res.status(200).send({
            success: true,
            data: { cats },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
});

// READ 단일 조회
app.get('/cat/:id', (req: express.Request, res: express.Response) => {
    try {
        const params = req.params

        const cat = Cat.find((cat) => {
            return cat.id === params.id;
        });

        res.status(200).send({
            success: true,
            data: { cat },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
});

// CREATE 정보 추가
app.post('/cat', (req: express.Request, res: express.Response) => {
    try {
        const newCat = req.body;

        Cat.push(newCat);

        res.status(200).send({
            success: true,
            data: { newCat },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
        });
    }
});

// 홈
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('hello world');
});

// 에러(찾을 수 없는 라우터)처리
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('404 Not Found Error');
    next();
});

const port: number = 8000;

// 어플리케이션 인스턴스 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});