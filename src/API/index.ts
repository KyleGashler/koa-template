import * as Koa from 'koa';
import logger = require('koa-pino-logger');
import * as json from 'koa-json';

import router from './router';

const app = new Koa();

// Middlewares
app.use(json());
app.use(logger());

// Routes
app.use(router.routes()).use(router.allowedMethods());

export default app;
