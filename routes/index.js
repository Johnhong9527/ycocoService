var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

//
router.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});


router.get('/form', function (req, res) {
  var data = [
    {name: '123', num: 12},
    {name: '123', num: 12},
    {name: '123', num: 12},
    {name: '123', num: 12}
  ];
  //   res.set({
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Access-Control-Allow-Origin': 'http://ycoco.xyz',
  // });
  // console.log(JSON.stringify(req.query))
  res.json(data);
  return;
});
router.post('/date', function (req, res) {
  res.set({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://ycoco.xyz',
  });
  res.jsonp('ok');
})

module.exports = router;
