import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';

import router from './router';

const app = new Koa();

// Middlewares
app.use(json());
app.use(logger());

// Routes
app.use(router.routes()).use(router.allowedMethods());

export default app;
