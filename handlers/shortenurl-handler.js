/**
 * HTTP handler methods for the shortenurl-controller.
 * Created by Sunil
 */

var ShortenUrl = require('../models/Shorten');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var config = require('../config/index');

module.exports = {

    /** 
     * Fetches all the shortUrl documents.
     * since: v1.0
    */
    getAll : function(req, res) {
        ShortenUrl.find(function(err, data) {
            if (err)
                res.send(err);
            res.send(data);
        });
    },

    /**
     * Fetches one shortUrl document depending on the shortId passed as 
     * parameter.
     * since: v1.0
     */
    getOne : function(shortId, req, res) {

        ShortenUrl.findOne({ _id: shortId }, function(err, data) {

            if (err) { 
                console.log(err);
                throw err;
            }

            //var doc = data !== null ? data._doc : null;
            if(data) {
                console.log("curr hitCount: " + data.hitCount);
                var count = data.hitCount + 1;
                data.hitCount = count;
                data.save(function(err) {
                    if(err) {
                        console.log('error while saving hitCount for id: ' + data._id);
                    }
                });
                redirectRequest(data.longUrl, req, res);
            }
            else {
                var retValue = {
                    'status': '404',
                    'message': 'NOT_FOUND'
                };
                res.send(retValue);
            }
        });
    },

    /**
     * handles the POST request to shorten a longUrl.
     * since: v1.0
     */
    create : function(shortDomain, longUrl, req, res) {

        var retValue = sanitizePostParameters(shortDomain, longUrl);
        if(!retValue.status) {
            res.send(retValue.response);
            next();
        }

        ShortenUrl.findOne({'shortDomain': retValue.response.shortDomainParam,'longUrl': retValue.response.longUrlParam}, 
                function(err, data) {

            if (err) {
                console.log(err);
                throw err;
            }

            var doc = data !== null ? data._doc : null;
            if(doc) {
                console.log("curr requestCount: " + doc.requestCount);
                var count = doc.requestCount + 1;

                data.requestCount = count;
                data.save(function(err) {
                    if(err) {
                        console.log('error while saving requestCount for id: ' + doc._id);
                    }
                });

                var retValue = {
                    'shortUrl': doc.shortUrl,
                    'requestCount': count,
                    'status': 'OK',
                    'message': 'ALREADY_EXISTS'
                };
                res.send(retValue);
            }
            else {
                create(shortDomain, longUrl, req, res);
            }
        });
        
    },

    /**
     * handles the UPDATE request to update the longUrl for a corresponding
     * shortUrl.
     * since: v1.0
     */
    update : function(shortUrl, longUrl, req, res) {

        var retValue = sanitizeUpdateParameters(shortUrl, longUrl);
        if(!retValue.status) {
            res.send(retValue.response);
            next();
        }

        ShortenUrl.findOne({'shortUrl': retValue.response.shortUrlParam}, 
                function(err, data) {

            if (err) {
                console.log(err);
                res.send({'status': 'ERROR', 'message': 'INVALID_PARAMETERS'});
            }

            if(data) {
                data.longUrl = longUrl;
                data.updatedAt = new Date().toISOString();
                data.save(function(err) {
                    if(err) {
                        console.log(err);
                        res.send({'status': 'ERROR', 'message': 'SERVER_ERROR'});
                    }
                    else {
                        res.send({'status': 'OK', 'message': 'UPDATED'});
                    }
                });
            }
            else {
                res.send({'status': 'ERROR', 'message': 'INVALID_PARAMETERS'});
            }
        });

    },

    /**
     * Deletes (soft delete) a shortUrl entry from the database
     * since: v1.0
     */
    delete : function(shortUrl, req, res) {

        var retValue = sanitizeURL(shortUrl);
        if(!retValue.status) {
            res.send(retValue.response);
            next();
        }

        ShortenUrl.findOneAndRemove({"shortUrl": retValue.response.url}, function(err) {
            if (err) {
                console.log(err);
                res.send({'status': 'FAILED', 'message': 'UNKNOWN_SERVER_ERROR'});
            }
            else {
                res.send({'status': 'OK', 'message': 'DELETED'});
            }
        });

    },

};


/**
 * Creates a new shortUrl and updates the DB entry.
 * since: v1.0
 */
var create = function(shortDomain, longUrl, req, res) {

    var now = new Date().toISOString();
    var token = shortid.generate();
    var shortUrl = shortDomain + '/' + token;
    var shrtUrlData = ShortenUrl({
        _id: token,
        'shortDomain': shortDomain,
        'shortUrl': shortUrl,
        'longUrl': longUrl,
        'token': token,
        'createdAt': now,
        'updatedAt': now,
        'hitCount': 0,
        'requestCount': 1 // initialization, the very first request to shorten this URL
    });


    shrtUrlData.save(function(err, doc) {
        if (err) {
            console.log(err);
            var retValue1 = {
                'message': 'APPLICATION_ERROR',
                'status': 'ERROR'
            };
            res.send(retValue1);
        }
        else {
            var retValue2 = {
                'shortUrl': shortUrl,
                'status': 'OK'
            };
            res.send(retValue2);
        }
    });
};


/**
 * Handles the core redirection logic to the actual destination (longUrl).
 * since: v1.0
 */
var redirectRequest = function(destinationUrl, req, res) {

    res.writeHead(301, {'Location': destinationUrl});
    res.end();
};


/**
 * Sanitizes & polishes the POST request parameters 
 */
var sanitizePostParameters = function(shortDomain, longUrl) {

    var longUrlParam = '';
    var retValue = sanitizeURL(longUrl);
    if(!retValue.status) {
        return retValue.response;
    }
    else {
        longUrlParam = retValue.response.url;
    }

    var domainParam = '';
    retValue = sanitizeURL(shortDomain);
    if(!retValue.status) {
         domainParam = config.getShortDomain();
         retValue = sanitizeURL(domainParam);
         if(!retValue.status) {
             return retValue.response;
         }
    }
    else {
        domainParam = retValue.response.url;
    }

    retValue = {
        'status': true,
        'response': {
            'shortDomainParam': domainParam,
            'longUrlParam': longUrlParam
        }
    };
    return retValue;
};


/**
 * Sanitizes & polishes the UPDATE request parameters 
 */
var sanitizeUpdateParameters = function(shortUrl, longUrl) {

    var shortUrlParam = '';
    var retValue = sanitizeURL(shortUrl);
    if(!retValue.status) {
        return retValue;
    }
    else {
        shortUrlParam = retValue.response.url;
    }

    var longUrlParam = '';
    retValue = sanitizeURL(longUrl);
    if(!retValue.status) {
        return retValue;
    }
    else {
        longUrlParam = retValue.response.url;
    }

    retValue = {
        'status': true,
        'response': {
            'shortUrlParam': shortUrlParam,
            'longUrlParam': longUrlParam
        }
    };
    return retValue;
};


/**
 * Sanitizes a URL and checks if it is well formed.
 * Only well formed URLs should be added to the database. 
 */
var sanitizeURL = function(url) {

    var retValue = '';
    if(url === null || url === undefined) {
        retValue = {
            status: false, 
            response: {
                'status': 'ERROR',
                'message': 'INVALID_URL_PARAMETER'
            }
        };
        return retValue;
    }
    var urlParam = String(url);
    if(urlParam.indexOf('http:/') === 0 || urlParam.indexOf('https:/') === 0) {
        urlParam = urlParam.toString().trim();
    }
    else {
        retValue = {
            'status': false, 
            'response': {
                'status': 'ERROR',
                'message': 'INVALID_PARAMETERS'
            }
        };
        return retValue;
    }

    retValue = {
        'status': true,
        'response': {
            'url': urlParam
        }
    };
    return retValue;
};