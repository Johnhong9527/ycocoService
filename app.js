var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// cookie
app.get('/', function (req, res) {
  // 如果请求中的 cookie 存在 isVisit, 则输出 cookie
  // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
  console.log(req.cookies)
  if (req.cookies.isVisit) {
    console.log(req.cookies);
    res.send('“再次欢迎访问”');
  } else {
    res.cookie('name', 'loginname', {maxAge:600000, httpOnly:true, path:'/', secure:true});
    res.send('“欢迎第一次访问”');
  }
});


// app.all('/cookie',function (req,res,next) {
//
//   res.cookie('isLogin', 1, { expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7) });
//   res.send({success: true, msg: '登录成功'});
//   return;
//   console.log(JSON.stringify(req.header));
//   // cookie
//   // 如果请求中的 cookie 存在 isVisit, 则输出 cookie
//   // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
//   if (req.cookies.isVisit) {
//     console.log(req.cookies);
//     res.send("再次欢迎访问");
//   } else {
//     res.cookie('isVisit', 1, {maxAge: 60 * 1000});
//     res.send("欢迎第一次访问");
//   }
//   // Cookies that have not been signed
//   console.log('Cookies: ', req.cookies)
//   // Cookies that have been signed
//   console.log('Signed Cookies: ', req.signedCookies)
// })



// 跨域
app.all('*',function (req, res, next) {
  // console.log(req.headers.origin)
  // 判断origin是否在域名白名单列表中
  function isOriginAllowed(origin) {
    const ALLOW_ORIGIN = [  // 域名白名单
      'http://*.ycoco.xyz',
      'http://www.ycoco.xyz',
      'http://localhost:8080',
      'http://localhost:4200',
      'http://localhost:3000'
    ];
    let originS = ALLOW_ORIGIN[0]; // 设置默认域名白名单
    if(ALLOW_ORIGIN.indexOf(origin) !== -1){
      originS = origin
    }
    return originS;
  }
  // res.header('Access-Control-Allow-Origin', isOriginAllowed(req.headers.origin));
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
    // res.send({ code: -2, msg: '非法请求' });
  }
});

app.use('/', index);
app.use('/users', users);
app.use('/api', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
