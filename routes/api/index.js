var express = require('express');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var router = express.Router();
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(cookieParser('ycoco.xyz.'));
/* GET home page. */
router.get('/', function (req, res, next) {

  // 2.创建
  // res.cookie(
  //   'UID',
  //   {id:'ssid',pw:'ssdsasw'},
  //   {
  //     'maxAge': 90000, // 有效时长(毫秒)
  //     'signed': true // 默认为false，表示是否签名(Boolean)
  //   });
  // req.session.UID = {name:'ssid',password:'ssdsasw'}
  res.send('cookie已设置成功！');
});
router.get('/hello', function (req, res,next) {
  // console.log(20);
  // console.log(req.signedCookies.UID);
  // console.log(req.session.UID);
  req.session.UID.destroy();
  // res.clearCookie('user', {id: 1,name: 'ruidoc'}, {maxAge: 900000});
  res.send('ok');
  // res.render('index', {title: 'Express'});
});
router.post('/date', function (req, res,next) {
  // res.render('date', {title: 'Express'});
})

module.exports = router;
