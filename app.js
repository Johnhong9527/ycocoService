var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
// 首先引入 cookie-parser 这个模块
var cookieParser = require('cookie-parser');
var session = require('express-session');
// 引入路由
var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();
// app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('sessiontest'));
app.use(session({
  name:'UID',
  secret:'ycoco.xyz.',//session签名与cookieParser中的签名一致
  cookie:{'maxAge':1000*60*60*24*7}, // cookie保存一个礼拜
  secret: 'sessiontest',
  resave: true,
  saveUninitialized:true
}));
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
  console.log(req.session.UID === undefined);
  // 跨域设置头部
  res.header('Access-Control-Allow-Origin', isOriginAllowed(req.headers.origin));
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
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
