import Koa from 'koa';
import logger = require('koa-pino-logger');
import json from 'koa-json';
import { createConnection, ConnectionOptions } from 'typeorm';
import bodyParser from 'koa-bodyparser';

import { config } from '../config';
import router from './router';

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    url: config.databaseUrl,
    synchronize: true,
    logging: false,
    entities: config.dbEntitiesPath,
    ssl: config.dbsslconn, // if not development, will use SSL
};

const app = new Koa();

try {
    createConnection(connectionOptions).then(async () => {
        // Middlewares
        app.use(json());
        app.use(logger());
        app.use(bodyParser());

        // Routes
        app.use(router.routes()).use(router.allowedMethods());
    });
} catch (e) {
    throw new Error('Fatal DB Connection Error: ' + e.message);
}

export default app;
