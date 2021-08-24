import * as Router from 'koa-router';
import home from './controllers/home';

const router = new Router();

router.get('/', home.helloWorld);

export default router;