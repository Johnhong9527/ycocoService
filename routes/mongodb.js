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
      assert.equal(null, err);
      // console.log("Connected successfully to server");
      var db = client.db(dbName);
      db.collection(collectionName).find(condition).toArray(function (err, result){
        if(err) {
          throw err;
        }
        callback(result);
      })
    });
  },
  // 添加数据
  insert:function (collectionName,document,callback) {
    // 先去重，再插入数据
    console.log(JSON.stringify({"name":document.name}));
    this.find(collectionName,JSON.stringify({"name":document.name}),function(result){
      // 去重
      for(let i in result){
        if(result[i].name === document.name){
          return callback('您已提交过信息！');
        }
      }
      MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);
        // 创建一个我们想稍后添加数据的集合
        var col = db.collection(collectionName);
        // 在集合中添加数据
        col.insert(document,function(err, result) {
          callback(result.result);
        });
      });
    })
  },
  // 更新数据
  Update:function () {
  }
}
