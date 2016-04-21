// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");

    // define model =======================
    var Project = mongoose.model('Project', {
	project : String
    });

    // routes ====================================================

	// api
	// get all projects
	app.get('/api/Projects', function(req, res) {

	    // use mongoose to get all projects in the database
	    Project.find(function(err, Projects) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
		    res.send(err)

	        res.json(Project); // return all todos in JSON format
            });
        });

	// Create project and send back all projects after creation
	app.post('/api/Projects', function(req, res) {

            // Create a project, information comes from AJAX request from Angular
	    Project.create({
		text : req.body.text,
		done : false
	    }, function(err, Projects) {
		if (err)
		    res.send(err);

		// get and return all projects after another is created
		Project.find(function(err, Projects) {
		    if (err)
			res.send(err)
		    res.json(Projects);
		});
	    });
	});

	// Delete a Projects
	app.delete('/api/Projects/:Project_id', function(req, res) {
	    Project.remove({
		_id : req.params.Project_id
	    }, function(err, Project) {
		if (err)
		    res.send(err);
		
		// Get and return all projects after one is deleted
		Project.find(function(err, Projects) {
		    if (err)
			res.send(err)
		    res.json(Projects);
                });
            });
        });

	// application -------------------------------------------------------------
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        });
