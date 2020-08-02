const express = require('express');

const Category = require('../models/category');

const router = express.Router();

router.get(('/'), async (req, res) => {
    try {
        const categories = await Category.find().populate('video');

        return res.send({ categories });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar categorias'});
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        if(await Category.findOne({ name })) {
            return res.status(400).send({error: 'Category already exists'});
        }

        const category = await Category.create(req.body);

        return res.send({ category });
    } catch (err) {
        return res.status(400).send({ error: 'Register failed'});
    }
})

router.get('/withVideos', async (req, res) => {
    try {
        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: "videos",
                    localField: "_id",
                    foreignField: "category",
                    as: "videos"
                }
            }
        ]);

        return res.send({ categories });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar categorias'});
    }
});



module.exports = app => app.use('/categories', router);
