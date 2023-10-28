require('dotenv').config();
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function (_, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/category', function (_, res) {
  res.sendFile(__dirname + '/views/category.html');
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
