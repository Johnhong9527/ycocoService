// var express = require('express');
import express from 'express';
import mDB from './util/mongodb';
const mongo = new mDB();
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/form', function(req, res) {
  var thatRes = null;

  // Use connect method to connect to the server
  mongo
    .find()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
  // setTimeout(function() {
  //   res.send('thatRes');
  // }, 200);
});
router.post('/date', function(req, res) {
  res.set({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://ycoco.xyz',
  });
  res.send(data);
});

// module.exports = router;
export default router;
