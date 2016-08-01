/**
 * Handler methods for updating the RedirectStat documents.
 * Created by Sunil
 */

var RedirectStat = require('../models/RedirectStats');

module.exports = {

    update: function(shorten/* refer models/Shorten */, req, res) {
        
        update(shorten, req, res);
    },

    getAll: function(req, res) {
        RedirectStat.find(function(err, data) {
            if (err)
                res.send(err);
            res.send(data);
        });
    }

};

/**
 * Updates the redirect stats for a shortUrl
 * since: v1.0
 */
var update = function(shorten, remoteIP) {

    RedirectStat.findOne({_id: shorten._id}, function(err, data) {

        if(err) {
            console.log(err);
        }

        if(data) {
            var count = data.hitCount + 1;
            console.log(JSON.stringify(data));

            RedirectStat.findByIdAndUpdate(
                shorten._id,
                {$set: {'hitCount': count}, $push: {"hits": {'remoteIP': remoteIP, 'timestamp': new Date().toISOString()}}},
                {safe: true, upsert: true},
                function(err, model) {

                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log('saved hitCounts entry for _id: ' + model._id);
                    }
                }
            );
        }
        else {
            create(shorten, remoteIP);
        }
    });
};

/**
 * Creates a new RedirectStat and updates Db.
 * since: v1.0
 */
var create = function(shorten, remoteIP) {

    var hit = {
        'remoteIP' : remoteIP,
        'timestamp': new Date().toISOString()
    };

    var redirectStatData = RedirectStat({
        _id: shorten._id,
        'shortUrl': shorten.shortUrl,
        'longUrl': shorten.longUrl,
        'hits': [
            hit
        ],
        'hitCount': 1 // initialization, the very first request to redirect this URL
    });


    redirectStatData.save(function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('saved redirectStat entry for _id: ' + doc._id);
        }
    });
};