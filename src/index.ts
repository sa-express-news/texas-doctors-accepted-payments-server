#!/usr/bin/env node
require('dotenv').config();

import * as express from 'express';
import { Express } from 'express';
import * as cors from 'cors';

import routes from './routes';

const app: Express = express();
app.use(cors());

routes(app);

const port = process.env.PORT || 3000;
app.listen(port);

console.log('RESTful API server running on: ' + port);
