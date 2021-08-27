import App from './api/index';
import { config } from './config';

const app = new App(config);
app.start;
