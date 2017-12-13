var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});
router.get('/form', function (req, res) {
  var data = [
    {name: '123', num: 12},
    {name: '123', num: 12},
    {name: '123', num: 12},
    {name: '123', num: 12}
  ];
  // console.log(JSON.stringify(req.query))
  res.json(data);
  return;
});
router.post('/date', function (req, res) {
  res.jsonp('ok');
})

module.exports = router;
