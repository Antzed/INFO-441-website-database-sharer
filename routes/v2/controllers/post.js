import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

//TODO: Add handlers here

router.post('/', async function(req, res, next) {
    try {
        let post = new req.models.Post({
            name: req.body.name,
            url: req.body.url,
            description: req.body.description,
            date: new Date().getDate()
        });
        await post.save();
        res.json({"status": "success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"status": "error", "error": error});
    }
});


router.get('/', async function(req, res, next) {
    try {
        let posts = await req.models.Post.find({});
        let postData = await Promise.all(
            posts.map(async (post) => {
                try {
                    let htmlPreview = await getURLPreview(post.url);
                    return {
                        name: post.name,
                        description: post.description,
                        htmlPreview: htmlPreview
                    };
                } catch (error) {
                    console.log(error);
                    return {
                        name: error.toString(),
                        description: post.description,
                        htmlPreview: error.toString()
                    };
                }
            })
        );
        res.json(postData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status": "error", 
            "error": error.toString()
        });
    }
});




export default router;