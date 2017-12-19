var db = require('./mongodb');
var express = require('express');
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
router.get('/insert',function (req,res,next) {
  db.insert('user',{'name':'seam','password':'rkns$3sx.q'},function(result){
    // console.log(result);
    res.send(result);
  })
})

module.exports = router;
