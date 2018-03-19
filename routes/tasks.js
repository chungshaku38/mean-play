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
router.get('/task/:id', function(req, res, next) {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if(err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

//Save task
router.post('/task', function(req, res, next) {
    var task = req.body;
    if(!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            "error" : "bad data"
        })
    } else {
        db.tasks.save(task, function(err, task) {
            if(err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    }
});

//Delete task
router.delete('/task/:id', function(req, res, next) {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if(err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

//Update task
router.put('/task/:id', function(req, res, next) {
    var task = req.body;
    var updTask = {};
    //some sample
    if(task.isDone) {
        updTask.isDone = task.isDone;
    }

    if(task.title) {
        updTask.title = task.title;
    }
    
    if(!updTask) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        //third params is option, specify custom behavior
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, function(err, task) {
            if(err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    }
});

//export to access from other files
module.exports = router;
