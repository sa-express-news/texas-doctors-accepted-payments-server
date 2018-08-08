#!/usr/bin/env node
require('dotenv').config();

import * as express from 'express';
import { Express } from 'express';

import routes from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

routes(app);

app.listen(port);

console.log('RESTful API server running on: ' + port);
