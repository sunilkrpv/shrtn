
// Dependencies
var jwt = require('jwt-simple');
var config = require('../config');
var Token = require('../models/Token');

module.exports = function(req, res, next) {

    if(!config.authorizeAPIRequests()) {
        next();
    }
    else {
        // When performing a cross domain request, you will recieve
        // a preflighted request first. This is to check if our the app
        // is safe. 
        // We skip the token outh for [OPTIONS] requests.
        //if(req.method == 'OPTIONS') next();
        var token = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
        if (token) {
            try {
                isTokenValid(token, req, res, next);
            }
            catch (err) {
                res.status(500);
                res.json({
                    'status': 500,
                    'message': "Oops something went wrong"
                });
            }
        } else {
            res.status(403);
            res.json({
                'status': 403,
                'message': "Unauthorized request"
            });
            return;
        }
    }
};

/**
 * Checks if a token is valid and can be used for authorization.
 * This will be called by middleware so if the method succeeds call next().
 * since: v1.0
 */
var isTokenValid = function(token, req, res, next) {

    Token.findOne({_id: token}, function(err, tokenDoc) {
        if(err) {
            console.log(err);
            throw err;
        }

        if(tokenDoc) {

            if(tokenDoc.deleted) {
                res.status(400);
                res.json({
                    'status': 400,
                    'message': "Token expired"
                });
            }
            else {
                // success and authorized
                next();
            }
        }
        else {
            // No such token exisits
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid request"
            });
        }

    });
};