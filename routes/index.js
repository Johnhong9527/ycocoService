var express = require('express');
var router = express.Router();
// mongodb
// var MongoClient = require('mongodb').MongoClient;
// var DB_BOOKS = 'mongodb://127.0.0.1:27017/ycoco'; // 数据库
// getting-started.js
var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
// Connection URL
const url = 'mongodb://127.0.0.1:27017/ycoco';
// Database Name
const dbName = 'ycoco';
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
  var thatRes = null;
  // MongoClient.connect(DB_BOOKS, function(err, db) {
  //   console.log("连接成功！");
  //   db.collection('ycoco').find().toArray(function(err, result) {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log("成功赋值！");
  //     thatRes = result;
  //   });
  // });

  var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db(dbName);
    insertDocuments(db, function() {
      findDocuments(db, function() {
        client.close();
      });
    });
  });

  setTimeout(function () {
    res.send('ok');
  }, 300);
});
router.post('/date', function (req, res) {
  res.set({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://ycoco.xyz',
  });
  res.send(data);
})

module.exports = router;
