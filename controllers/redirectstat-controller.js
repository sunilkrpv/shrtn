/**
 * Controller for the RedirectStats model.
 * Created by Sunil on 01/Aug/201.
 */

// Dependencies
var restful = require('node-restful');
var bodyParser = require('body-parser');
var handler = require('../handlers/redirectstat-handler');

// builds up all the CRUD operations using the RedirectStats model
module.exports = function(app, route) {
    
    // setup controller for rest
    var rest = restful.model(
        'redirectstat',
        app.models.redirectstat
    ).methods(['get']);
    rest.register(app, route);
    
    return function(req, res, next) {
        next();
    };

    /*
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    //var path = route + '/redirectstat';
    app.get(route, function(req, res) {

       handler.getAll(req, res); 
    });
    */
};