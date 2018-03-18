var express = require('express');
//use router of express, just like mapping request to specific method
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://chungshaku:admin123@ds215739.mlab.com:15739/tasklist', ['tasks']); //array of collection want to use

//Get All tasks
router.get('/tasks', function(req, res, next) {
    db.tasks.find(function(err, tasks) {
        if(err) {
            res.send(err);
        } else {
            res.json(tasks);
        }
    });
});

//Get single task
router.get('/tasks/:id', function(req, res, next) {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if(err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});


//export to access from other files
module.exports = router;
