const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
});

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
});

const Category = mongoose.model('Category', categorySchema);
const Game = mongoose.model('Game', gameSchema);

module.exports = {
    Category: Category,
    Game: Game,
};
