var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.body);
  res.send('respond with a resource');
});
router.all('/admin', function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
res.send('ok');
});

module.exports = router;
