/**
 * Controller for the ShortenUrl model.
 * Created by Sunil.
 * 
 */


// Dependencies
var handler = require('../handlers/shortenurl-handler');


module.exports = function(app, route) {
    
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

    app.delete(route, function(req, res) {
        
        var shortUrl = req.body.shortUrl;
        //var longUrl = req.body.longUrl;
        handler.delete(shortUrl, req, res);
    });
    
};

