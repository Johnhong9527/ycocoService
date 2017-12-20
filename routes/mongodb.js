// getting-started.js
var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
// Connection URL
var url = 'mongodb://127.0.0.1:27017/ycoco';
// Database Name
var dbName = 'ycoco';

var name = 'hello';
module.exports = {
  name: name,
  // 查询
  find:function (collectionName,condition,callback) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
      // console.log("Connected successfully to server");
      var db = client.db(dbName);
      console.log('18:'+condition)
      db.collection(collectionName).findOne(condition,function (err, result){
        if(err) {
          throw err;
        }
        if(result === null){
          callback('登录信息填入错误');
        } else {
          callback(result);
        }

      })
    });
  },
  // 注册
  insert:function (collectionName,document,callback) {
    // 先去重，再插入数据
    this.find(collectionName,{"name":document.name},function(result){
      // 去重
      if(result !== null){
        return callback('请勿重复提交注册信息！');
      } else {
        MongoClient.connect(url, function(err, client) {
          var db = client.db(dbName);
          // 创建一个我们想稍后添加数据的集合
          var col = db.collection(collectionName);
          // 在集合中添加数据
          col.insert(document,function(err, res) {
            callback(res.result);
          });
        });
      }
    })
  },
  // 更新数据
  Update:function () {
  }
}
