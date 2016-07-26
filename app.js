
// Dependencies
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash'); // this is a variable name
var config = require('./config');

// create the express application instance
var app = express(); 

// mongoDb setup 
var db = mongoose.connection; // get mongoDb connection instance
mongoose.connect(config.getDbConnectionString()); // initiate connection to mongoDb

// setup express app routes for CORS
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
// CORS support - Cross Origin Resource Support for REST APIs
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// Auth Middleware - This will check if the access token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless 
// authentication is not needed
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
//app.use('/', require('./routes'));

// If no route is matched, it must be a 404
var setupInvalidRoute = function() {
    app.use(function(req, res, next) {
        var err = new Error('This is not a valid request; url: ' + req.url);
        err.status = 404;
        next(err);
    });
};

var bootstrap = function() {
    
    // Load the models
    app.models = require('./models/index');
    console.log('building routes...');
    // register all the routes
    var routes = require('./routes/index');
    _.each(routes, function(controller, route) {
        controller(app, route);
    });
    // the ping handler
    app.get('/ping', function(req, res) {
       res.send({'status': 'OK', 'ts': new Date().toISOString(), 'message': 'Hello from shrtn!'}); 
    });
    setupInvalidRoute();
    
    console.log('server starting...');
    var server = app.listen(app.get('port'), function() {
        console.log('shrtn server started at ' + new Date().toISOString() + ' and listening on port ' + server.address().port);
    });
};

// Set the server port
app.set('port', process.env.PORT || 3000);
db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', function() {
    
    console.log('connected to mongo...');
    bootstrap();
});
