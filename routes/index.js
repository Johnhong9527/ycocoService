var express = require('express');
var router = express.Router();
// mongodb
var MongoClient = require('mongodb').MongoClient;

// 全局变量
var data = [
  {name: '123', num: 12},
  {name: '123', num: 12},
  {name: '123', num: 12},
  {name: '123', num: 12}
];
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});
router.get('/form', function (req, res) {
  MongoClient.connect('mongodb://127.0.0.1:27017/ycoco', function(err, db) {
    if (err) {
      throw err;
    }
    db.collection('ycoco').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      // console.log(result);
      res.send(result);
    });
  });
  // res.send(data);
});
router.post('/date', function (req, res) {
  res.set({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://ycoco.xyz',
  });
  res.send(data);
})

module.exports = router;
