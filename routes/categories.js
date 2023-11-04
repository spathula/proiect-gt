const express = require('express');
const router = express.Router();
const { Category, Game } = require('./../models/game');

router.get('/add', function (_, res) {
    res.render('categories/add-category', {
        game: null,
        category: new Category(),
    });
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category == null) res.redirect('/');

        const games = await Game.find({ category: category });

        res.render('categories/view-category', {
            category: category,
            games: games,
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category == null) res.redirect('/');

        res.render('categories/edit-category', {
            game: null,
            category: category,
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    let category = new Category({
        title: req.body.title,
    });

    try {
        category = await category.save();
        res.redirect(`/categories/${category.id}`);
    } catch (e) {
        console.error(e);
        res.render('categories/add-category', {
            game: null,
            category: category,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Category.findOneAndUpdate(
            { _id: req.params.id },
            { title: req.body.title },
        );
        res.redirect(`/categories/${req.params.id}`);
    } catch (e) {
        console.error(e);
        res.render('categories/edit-category', {
            game: null,
            category: category,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        await Game.deleteMany({ category: category.id });
        await Category.deleteOne(category);
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect(`/categories/${category.id}`);
    }
});

module.exports = router;
