var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect('/shop');
});
router.get('/a', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res(new Error('Simulated error'));
  //res.redirect('/shop');
});

module.exports = router;
