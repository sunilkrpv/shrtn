/**
 * Controller for the ShortenUrl model.
 * Created by Sunil.
 * 
 */


// Dependencies
var ShortenUrl = require('../models/Shorten');
var bodyParser = require('body-parser');
var handler = require('../handlers/shortenurl-handler');


module.exports = function(app, route) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    // get all shortenUrl
    //var path = route + '/shorten';
    app.get(route, function(req, res) {

       handler.getAll(req, res); 
    });


    // redirects to destination longUrl by shortUrl id passed as token
    var path = route + '/:token';
    app.get(path, function(req, res) {
        
        handler.getOne(req.params.token, req, res);
    });

    app.post(route, function(req, res) {

        var shortDomain = req.body.shortDomain;
        var longUrl = req.body.longUrl;
        handler.create(shortDomain, longUrl, req, res);
    });

    app.put(route, function(req, res) {

        var shortUrl = req.body.shortUrl;
        var longUrl = req.body.longUrl;
        handler.update(shortUrl, longUrl, req, res);
    });

    /*
    app.delete('/api/v1/currency', function(req, res) {
        res.send({status: "fail", message: "Unsupported operation"});    
        Currency.findByIdAndRemove(req.body.id, function(err) {
            if (err) { 
                throw err;
            }
            res.send('Success');
        });
    });
    */
    
};

