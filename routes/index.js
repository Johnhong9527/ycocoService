var express = require('express');
var router = express.Router();
// 全局变量
var data = [
  {name: '123', num: 12},
  {name: '123', num: 12},
  {name: '123', num: 12},
  {name: '123', num: 12}
];
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/form', function (req, res) {
  res.send(data);
  return;
});
router.post('/date', function (req, res) {
  res.set({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://ycoco.xyz',
  });
  res.send(data);
})

module.exports = router;
