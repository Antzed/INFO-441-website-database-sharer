import express from 'express';
var router = express.Router();

import postsRouter from './controllers/post.js';
import urlsRouter from './controllers/urls.js';

router.use('/posts', postsRouter);
router.use('/urls', urlsRouter);

export default router;