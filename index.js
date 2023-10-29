require('dotenv').config();
const express = require('express');
const gamesRouter = require('./routes/games');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.use('/games', gamesRouter);

app.set('view engine', 'ejs');

app.get('/', function (_, res) {
  const games = [
    {
      id: '1',
      title: 'Game 1',
      category: 'Category',
      description: 'Description',
      price: 60,
    },
    {
      id: '2',
      title: 'Game 2',
      category: 'Category',
      description: 'Description',
      price: 40,
    },
    {
      id: '2',
      title: 'Game 2',
      category: 'Category',
      description: 'Description',
      price: 80,
    },
  ];
  res.render('index', { games: games });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
