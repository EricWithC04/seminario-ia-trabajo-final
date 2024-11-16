import Express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import ChatRouter from "./routes/index.routes";
import { PORT } from "./environments";
import fileUpload from "express-fileupload";

export class Server {
    private app: Application;
    private port: number;
    private static instance: Server;

    private constructor() {
        this.app = Express();
        this.port = parseInt(PORT);
        this.middlewares();
        this.routes();
    }

    public static getInstance(): Server {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    }

    private middlewares() {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(Express.json());
        this.app.use(fileUpload({ createParentPath: true }));
    }

    private routes() {
        this.app.use("/chat", ChatRouter);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}