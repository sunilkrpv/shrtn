/**
 * Created by Sunil
 * model type: RedirectStatsSchema - contains stats information for 
 * the redirect requests from shortUrl.
 * 
 */

// Dependencies - mongoose for Db schema
var mongoose = require('mongoose');

var RedirectStatSchema = new mongoose.Schema({
    _id: {
       type: String,
       required: true
   },
   shortUrl: {
       type: String,
       required: true
   },
   longUrl: {
       type: String,
       required: true
   },
   hits: [{
       remoteIP: {
           type: String,
           required: true,
           default: '0.0.0.0'
       },
       timestamp: {
           type: Date,
           required: true,
           default: Date.now
       }
   }],
   hitCount: {
       type: Number,
       required: true,
       default: -1
   }
   
});

// export this model
module.exports = mongoose.model('redirectstat', RedirectStatSchema);