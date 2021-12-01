
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from './routes/routes';
import dbInit from './db/init';
import * as bodyParser from 'body-parser';
class App {
    public express: express.Application

    public constructor () {
          this.express = express()
          dotenv.config();
          
          this.middlewares()
          this.database()
          this.routes()
          this.appInitialize()
    }
    private appInitialize(){
        const PORT: number = parseInt(process.env.PORT as string, 10);
        if (!process.env.PORT) {
            process.exit(1);
        }
        this.express.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    }
    private middlewares (): void {
        this.express.use(helmet());
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(express.json());
    }

    private database (): void {
        dbInit()
    }

    private routes (): void {
        this.express.use(routes)
    }
}


export default new App().express