const express = require('express');

const Video = require('../models/video');
const { db } = require('../models/category');
const router = express.Router();

router.get(('/'), async (req, res) => {
    try {
        const videos = await Video.find().populate('category');

        return res.send({ videos });
    } catch (err) {
        return res.status(400).send({ error: 'Error to get videos'});
    }
});

router.post('/', async (req, res) => {
    const { url } = req.body;
    try {
        if(await Video.findOne({ url })) {
            return res.status(400).send({error: 'Video already exists'});
        }

        const video = await Video.create({...req.body, category: req.body.categoryId});

        return res.send({ video });
    } catch (err) {
        return res.status(400).send({ error: 'Error to create video' });
    }
})

module.exports = app => app.use('/videos', router);
