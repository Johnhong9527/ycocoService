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
    if(result === null){
      res.send('您填写的登录信息有误，请重新输入！');
    } else {
      // 这里应该是返回登录保存凭证，后期完善
      res.send('ok');
    }
  })
})
// 注册查询：昵称是否重复
router.post('/sign-up',function (req,res,next) {
  db.insert('user',{'name':req.body.name,'password':req.body.password},function(result){
    res.send(result);
  })
})
// 替换密码
router.post('/update',function (req,res,next){
  db.update('user',{'name':req.body.name,'password':req.body.password,'newPassword':req.body.newPassword},function (result) {
    res.send(result)
  })
})
// 删除用户
router.post('/delete-user',function (req,res,next) {
  db.delete('user',{'name':req.body.name,'password':req.body.password},function (result) {
    res.send(result);
  })
})

module.exports = router;
