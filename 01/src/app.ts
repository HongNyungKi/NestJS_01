import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
    public app: express.Application;

    constructor() {
        const app: express.Application = express();
        this.app = app;
    }

    private setRoute() {
        this.app.use(catsRouter);
    }

    private setMiddleware() {
        // 전체 라우터 적용 미들웨어
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(req.rawHeaders[1]);
            next();
        });

        // json 미들웨어(express에서 req.body값 가져오기)
        this.app.use(express.json());

        // 특정 라우터 적용 미들웨어
        this.app.post('/cat', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log('post method router excute');
            next();
        });

        this.setRoute();

        // 에러(찾을 수 없는 라우터)처리 미들웨어
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log('404 Not Found Error');
            next();
        });
    }

    public listen() {
        this.setMiddleware();

        this.app.listen(8000, () => {
            console.log('Server is running on http://localhost:8000');
        });
    }
}

function init() {
    const server = new Server();
    server.listen();
}

init();