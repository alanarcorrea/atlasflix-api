const express = require('express');

const Video = require('../models/video');
const Category = require('../models/category');
const { db } = require('../models/category');


const router = express.Router();

router.get(('/'), async (req, res) => {
    try {
        const videos = await Video.find().populate('category');

        return res.send({ videos });
    }catch(err){
        return res.status(400).send({ error: 'Erro ao listar videos'});
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
    }catch(err){
        return res.status(400).send({ error: 'Register failed'});
    }
})

router.get(('/categories'), async (req, res) => {
    try {
        const videos = await db.videos.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'videos_com_categoria'
                }
            },
            {
                $unwind: '$categoryId'
            },
            {
                $videos: {
                    title: '$categoryId.title',
                }
            }
        ]).toArray();
       

        return res.send({ video });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao listar categorias'});
    }
})
module.exports = app => app.use('/videos', router);


// db.getCollection('videos').aggregate([
//     {
//         $lookup: {
//             from: "categories",
//             localField: "category",
//             foreignField: "_id",
//             as: "comum"
//         }
//     }
//     ]);