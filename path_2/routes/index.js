var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./layout/page', {
      title: 'Home page',
    });
});

module.exports = router;
