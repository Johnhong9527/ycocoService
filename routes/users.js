var db = require('./mongodb');
var express = require('express');
var URL = require('url');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(mongodb.name);
  db.find('ycoco',{'name':'admin'},function(result){
    // console.log(e)
    res.send(result);
  })
});
/*insert*/
router.post('/insert',function (req,res,next) {
    // var params = URL.parse(req.url, true).query;
    // console.log(req.body.name);
  db.insert('user',{'name':req.body.name,'password':req.body.password},function(result){
    // console.log(result);
    res.send(result);
    // res.send(req1);
  })
})

module.exports = router;
