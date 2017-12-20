var db = require('./mongodb');
var express = require('express');
var URL = require('url');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('hello!');
});
// 登录查询： 昵称和密码是否一致
router.post('/sign-in',function (req,res,next) {
  // var params = URL.parse(req.url, true).query;
  // console.log(req.body.name);
  db.find('user',{'name':req.body.name,'password':req.body.password},function(result){
    // console.log(result);
    res.send(result);
    // res.send(req1);
  })
})
// 注册查询：昵称是否重复
router.post('/sign-up',function (req,res,next) {
  db.insert('user',{'name':req.body.name,'password':req.body.password},function(result){
    res.send(result);
  })
})

module.exports = router;
