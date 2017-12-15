var express = require('express');
var router = express.Router();
// getting-started.js
var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
// Connection URL
var url = 'mongodb://127.0.0.1:27017/ycoco';
// Database Name
var dbName = 'ycoco';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});
router.get('/form', function (req, res) {
  var thatRes = null;
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db(dbName);
    db.collection('ycoco').find().toArray(function (err, result){
      if(err) {
        throw err;
      }
      console.log("成功取值！");
      thatRes = result;
    })
  });
  setTimeout(function () {
    res.send(thatRes);
  }, 200);
});
router.post('/date', function (req, res) {
  res.set({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://ycoco.xyz',
  });
  res.send(data);
})

module.exports = router;
