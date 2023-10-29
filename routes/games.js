const express = require('express');
const router = express.Router();

router.get('/add', function (_, res) {
  res.render('add-game');
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
