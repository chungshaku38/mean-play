var express = require('express');
var path = require('path');
var bodyParse = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

//init app
var app = express();

var port = 3000;

//set view location to lookup
app.set('views', path.join(__dirname, 'views'));

//set view engine is EJS
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder to server angular or other files
//all anguler shoudl be in client folder
app.use(express.static(path.join(__dirname, 'client')));

//Boby parser MW
app.use(bodyParse.json()); //parse JSON
app.use(bodyParse.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function() {
    console.log('Server started on port ' + port);
});







