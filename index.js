require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const gamesRouter = require('./routes/games');
const categoriesRouter = require('./routes/categories');
const { Category } = require('./models/game');
const app = express();

mongoose.connect(process.env.MONGO_URI);

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use('/categories', categoriesRouter);

app.use('/games', gamesRouter);

app.set('view engine', 'ejs');

app.get('/', async function (_, res) {
    const categories = await Category.find().sort({ title: 'asc' });
    res.render('index', { categories: categories });
});

var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
