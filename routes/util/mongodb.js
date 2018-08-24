import { MongoClient } from 'mongodb';
import assert from 'assert';
const URL = 'mongodb://127.0.0.1:27017/ycoco';
const DBNAME = 'ycoco';
export default class mDB {
  constructor() {}
  find(params) {
    console.log(7);
    return new Promise((resolve, reject) => {
      MongoClient.connect(
        URL,
        (err, client) => {
          assert.equal(null, err);
          console.log('Connected successfully to server');
          const db = client.db(DBNAME);
          db.collection(DBNAME)
            .find()
            .toArray((err, result) => {
              if (err) {
                reject(err);
              }
              // console.log('成功取值！');
              // thatRes = result;
              resolve(result);
            });
        },
      );
    });
  }
}
