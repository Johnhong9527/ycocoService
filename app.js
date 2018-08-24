// var express = require('express');
import express from 'express';
// var path = require('path');
import path from 'path';
// var favicon = require('serve-favicon');
import favicon from 'serve-favicon';
// var logger = require('morgan');
import logger from 'morgan';
// var bodyParser = require('body-parser');
import bodyParser from 'body-parser';
// 首先引入 cookie-parser 这个模块
// var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
// var session = require('express-session');
import session from 'express-session';
// 引入路由
// var index = require('./routes/index');
import index from './routes/index';
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('sessiontest'));
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }, // cookie保存一个礼拜
    name: 'UID',
    secret: 'ycoco.xyz.', //session签名与cookieParser中的签名一致
    secret: 'sessiontest',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(cookieParser('ycoco.xyz.'));
/*
{
  cookie: {
    path: String, // 将会影响响应头 Set-Cookie 中的 Path 字段
    domain: String, // 将会影响响应头 Set-Cookie 中的 Domain字段
    httpOnly: Boolean, // 设置为 true 使得客户端没法用 js 来操作该 cookie
    expires: Date, // Date object 将会影响响应头 Set-cookie 中的 Expries 字段, 不推荐直接设置，一般设置 maxAge
    maxAge: Number // 毫秒，将会影响响应头 Set-cookie 中的 Expries 字段，通过计算 server 当前时间和 maxAge 的和来计算 expires，
    secure: Boolean // 将会影响响应头 Set-cookie 中的 Secure 字段，表示只有在请求使用SSL和HTTPS协议的时候才会被发送到服务器,
    sameSite: Boolean || String, // 将会影响响应头 Set-cookie 中的 SameSite 字段，会影响跨域请求是否附带 Cookie 的行为
  },
  name: String, // 默认是 'connect-sid'，用于设置 cookie 的 key,
  resave: Boolean, // 强制 session 每次都重新存储到 store 当中,
  rolling: Boolean, // 每次请求都重新设置 cookie，并重置 max-age，也就意味着重置过期时间
  saveUninitialized: Boolean, // 强制未初始化的 session 存储到 store 当中
  secret: String, // 用于对 cookie 进行签名加密,
  store: Object// 用来存储 session 的 store 实例，默认为 MemoryStore
}
*/
// 跨域
app.all('*', function(req, res, next) {
  // console.log(req.headers.origin)
  // 判断origin是否在域名白名单列表中
  function isOriginAllowed(origin) {
    const ALLOW_ORIGIN = [
      // 域名白名单
      'http://*.ycoco.xyz',
      'http://www.ycoco.xyz',
      'http://localhost:8080',
      'http://localhost:4200',
      'http://localhost:3000',
    ];
    let originS = ALLOW_ORIGIN[0]; // 设置默认域名白名单
    if (ALLOW_ORIGIN.indexOf(origin) !== -1) {
      originS = origin;
    }
    return originS;
  }
  console.log(req.session.UID === undefined);
  // 跨域设置头部
  res.header(
    'Access-Control-Allow-Origin',
    isOriginAllowed(req.headers.origin),
  );
  // res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
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
