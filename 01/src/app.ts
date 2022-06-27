import * as express from "express";
import catsRouter from "./cats/cats.route";

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

app.use(catsRouter);

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