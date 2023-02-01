import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

//TODO: Add handlers here
router.use('/preview', async function(req, res, next) {
    let url = req.query.url;
    let preview = await getURLPreview(url);
    res.send(preview);
});

export default router;