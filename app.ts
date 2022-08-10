
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from './src/routes/routes';
import dbInit from './src/db/init';
import * as bodyParser from 'body-parser';
import fs from 'fs';
import swaggerUi = require('swagger-ui-express')

class App {
    public express: express.Application
    //SWAGGER
    private swaggerFile: any = (process.cwd()+"/docs/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd()+"/docs/swagger.css"), 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);
    
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

        //this.express.use('/api/docs', swaggerUi.serve,
           // swaggerUi.setup(this.swaggerDocument, undefined, undefined, this.customCss));
           this.express.use(
                "/docs",
                swaggerUi.serve,
                swaggerUi.setup(undefined, {
                  swaggerOptions: {
                    url: "docs/swagger.json",
                  },
                })
              );
    }
}


export default new App().express