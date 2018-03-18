var express = require('express');
//use router of express, just like mapping request to specific method
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index.html');
});

//export to access from other files
module.exports = router;
