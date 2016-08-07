/**
 * Auth module
 */


// Dependencies
var uuid = require('node-uuid');
var config = require('../config');
var Token = require('../models/Token');

module.exports = {

    generateToken: function(req, res) {

        create(req, res);
    },
};


/**
 * Creates a new token and updates the DB entry.
 * since: v1.0
 */
var create = function(req, res) {

    var now = new Date().toISOString();
    var token = uuid.v4();
    var tokenObj = Token({
        _id: token,
        'deleted': false
    });


    tokenObj.save(function(err, data) {
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
                'token' : token,
                'status': 'OK'
            };
            res.send(retValue2);
        }
    });
};

