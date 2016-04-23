// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost:27017/projects');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
    
// define model =================
var Project = mongoose.model('Project', {
    text: String,
    task: String,
});

// get all todos
app.get('/api/projects', function (req, res) {

    // use mongoose to get all todos in the database
    Project.find(function (err, projects) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(projects); // return all todos in JSON format
    });
});
// create todo and send back all todos after creation
app.post('/api/projects', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
    Project.create({
        text: req.body.text,
        task: req.body.task,
        done: false
    }, function (err, project) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Project.find(function (err, projects) {
            if (err)
                res.send(err)
            res.json(projects);
        });
    });

});
app.delete('/api/projects/:project_id', function (req, res) {
    Project.remove({
        _id: req.params.project_id
    }, function (err, project) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Project.find(function (err, projects) {
            if (err)
                res.send(err)
            res.json(projects);
        });
    });
});
// application ==============================================
app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");