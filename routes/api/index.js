var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('ok');
});
router.get('/form', function (req, res) {
  // res.render('form', {title: 'Express'});
res.clearCookie('user_token');
});
router.post('/date', function (req, res) {
  res.render('date', {title: 'Express'});
})

module.exports = router;
