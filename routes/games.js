const express = require('express');
const router = express.Router();
const { Category, Game } = require('./../models/game');

router.get('/add?:category', async function (req, res) {
    try {
        const category = await Category.findOne({ title: req.query.category });

        res.render('games/add-game', {
            game: new Game(),
            category: category,
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        const category = await Category.findById(game.category);
        if (game == null) res.redirect('/');
        res.render('games/view-game', { game: game, category: category });
    } catch {
        res.redirect('/');
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game == null) res.redirect('/');

        const category = await Category.findById(game.category);

        res.render('games/edit-game', {
            game: game,
            category: category,
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    let game = new Game({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    });

    try {
        const category = await Category.findById(req.body.category);
        game.category = category;
        game = await game.save();
        res.redirect(`/categories/${req.body.category}`);
    } catch (e) {
        console.error(e);
        res.render('games/add-game', {
            game: game,
            category: req.body.category,
        });
    }
});

router.put('/:id', async (req, res) => {
    const game = Game.findById(req.params.id);

    try {
        await Game.updateOne(
            { _id: req.params.id },
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            },
        );
        res.redirect(`/games/${req.params.id}`);
    } catch (e) {
        console.error(e);
        res.render('games/edit-category', {
            game: game,
            category: game.category,
        });
    }
});

router.delete('/:id', async (req, res) => {
    await Game.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
