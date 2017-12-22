var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
/* GET home page. */
router.get('/', function (req, res, next) {


  // 设置cookie名为user，值为对象，90000ms过期，无签名
  res.cookie('user', {
    id: 1,
    name: 'ruidoc'
  }, {
    maxAge: 900000
  });

//获取设置的cookie
var user = req.cookies.user


res.send('ok');
});
router.get('/hello', function (req, res,next) {
  // console.log('hello')
  res.clearCookie('user', {id: 1,name: 'ruidoc'}, {maxAge: 900000});
  res.send('ok');
  // res.render('index', {title: 'Express'});
});
router.post('/date', function (req, res,next) {
  // res.render('date', {title: 'Express'});
})

module.exports = router;
