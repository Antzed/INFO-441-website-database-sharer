import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import models from './models.js'

import apiV1Router from './routes/apiv1.js';
import apiV2Router from './routes/v2/apiv2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.models = models;
    next();
});

app.use('/api/v1', apiV1Router);
app.use('/api/v2', apiV2Router);




export default app;
