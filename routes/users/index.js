var db = require('./mongodb.js');
var express = require('express');
var URL = require('url');
var router = express.Router();
var signUp = false;

/* GET users listing. */
router.all('/', function(req, res, next) {
  // 检测本机cookie 存储的用户信息是否一致，若一致，则默认用户登录
  console.log(req.session.UID)
  if(req.session.UID !== undefined){
    db.find('user',{'name':req.session.UID.name,'password':req.session.UID.password}, result=> {
      if(result === null){
        res.send('error');
        console.log('error');
      } else {
        res.send('success');
        console.log('success');
      }
    })
  } else {
    res.send('no');
  }
  // res.send('hello!');
});
router.get('/hello',(req,res,next)=>{
  console.log(11);
  res.send('user hello!');
})
// 登录查询： 昵称和密码是否一致
router.post('/sign-in',function (req,res,next) {
  // var params = URL.parse(req.url, true).query;
  // console.log(req.body.name);
  console.log(req.session.UID);
  if(req.session.UID === undefined){
    console.log(req.body.name);
    db.find('user',{'name':req.body.name,'password':req.body.password},function(result){
      if(result === null){
        res.send('您填写的登录信息有误，请重新输入！');
      } else {
        // 这里应该是返回登录保存凭证，后期完善
        req.session.UID = {name:req.body.name,password:req.body.password}
        res.send('ok');
      }
    })
  } else {
    console.log(30);
    console.log(req.session.UID)
    res.send('该用户暂未登陆!');
  }
})
// 注册查询：昵称是否重复
router.post('/sign-up',function (req,res,next) {
  db.insert('user',{'name':req.body.name,'password':req.body.password},function(result){
    res.send(result);
  })
})
// 退出登录删除 cookie
router.post('/sign-out',(req,res,next)=>{
  req.session.destroy();
  res.send('success');
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
