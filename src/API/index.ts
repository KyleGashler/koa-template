import Koa from 'koa';
import logger = require('koa-pino-logger');
import json from 'koa-json';
import { createConnection, ConnectionOptions } from 'typeorm';
import bodyParser from 'koa-bodyparser';

import { Config } from '../config';
import router from './router';
export default class App {
    private config: Config;
    private connectionOptions: ConnectionOptions;

    constructor(config: Config) {
        this.config = config;
        this.connectionOptions = {
            type: 'postgres',
            url: config.databaseUrl,
            synchronize: true,
            logging: false,
            entities: config.dbEntitiesPath,
            ssl: config.dbsslconn, // if not development, will use SSL
        };
    }

    start = (): void => {
        const app = new Koa();

        try {
            createConnection(this.connectionOptions).then(async () => {
                // Middlewares
                app.use(json());
                app.use(logger());
                app.use(bodyParser());

                // Routes
                app.use(router.routes()).use(router.allowedMethods());
            });
        } catch (e) {
            throw new Error('Fatal app start error: ' + e.message);
        }
        app.listen(this.config.port, () => {
            console.log('Koa started');
        });
    };
}
