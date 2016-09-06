import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import api from '../mocks';


const app = express();
app.set('port', config.service.port);
app.use(bodyParser.json());
app.use('/api', api());

export default app;