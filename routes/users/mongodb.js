/*
说明
collectionName：集合名称
condition：mongodb操作条件。如果没有，必须填入`{}`
*/

// getting-started.js
// var MongoClient = require('mongodb').MongoClient,
//   assert = require('assert');
import { MongoClient } from 'mongodb';
import assert from 'assert';
// Connection URL
const URL = 'mongodb://127.0.0.1:27017/ycoco';
// Database Name
const DBNAME = 'ycoco';

var name = 'hello';
module.exports = {
  name: name,
  // 查询
  find: function(collectionName, condition, callback) {
    // Use connect method to connect to the server
    MongoClient.connect(
      URL,
      function(err, client) {
        // console.log("Connected successfully to server");
        var db = client.db(DBNAME);
        // console.log('18:'+condition)
        db.collection(collectionName).findOne(condition, function(err, result) {
          if (err) {
            // throw err;
            return callback(err);
          }
          callback(result);
        });
      },
    );
  },
  // 注册
  insert: function(collectionName, condition, callback) {
    // 先去重，再插入数据
    this.find(collectionName, { name: condition.name }, function(result) {
      // 去重
      if (result !== null) {
        return callback('请勿重复提交注册信息！');
        // return callback(result);
      } else {
        MongoClient.connect(
          URL,
          function(err, client) {
            var db = client.db(DBNAME);
            // 创建一个我们想稍后添加数据的集合
            var col = db.collection(collectionName);
            // 在集合中添加数据
            col.insert(condition, function(err, res) {
              callback(res.result);
            });
          },
        );
      }
    });
  },
  // 更新数据
  update: function(collectionName, condition, callback) {
    this.find(
      collectionName,
      { name: condition.name, password: condition.password },
      function(res) {
        if (
          res !== null &&
          res.name === condition.name &&
          res.password === condition.password
        ) {
          MongoClient.connect(
            URL,
            function(err, client) {
              var db = client.db(DBNAME);
              // 创建一个我们想稍后添加数据的集合
              var col = db.collection(collectionName);
              // 在集合中添加数据
              col.update(
                { name: condition.name, password: condition.password },
                { $set: { password: condition.newPassword } },
                function(err, result) {
                  if (err) {
                    return callback(err);
                  }
                  callback('1');
                },
              );
            },
          );
        } else {
          callback('您输入的用户名或密码有误，请重新输入！');
        }
        // callback(res);
      },
    );
  },
  // 删除已注册信息
  delete: function(collectionName, condition, callback) {
    MongoClient.connect(
      URL,
      function(err, client) {
        var db = client.db(DBNAME);
        // 创建一个我们想稍后添加数据的集合
        var col = db.collection(collectionName);
        // 在集合中添加数据
        col.remove(
          { name: condition.name, password: condition.password },
          1,
          function(err, result) {
            if (err) {
              return callback(err);
            }
            callback('1');
          },
        );
      },
    );
  },
};
