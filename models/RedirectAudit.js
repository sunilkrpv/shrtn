/**
 * Created by Sunil
 * model type: RedirectAuditSchema - contains audit information for 
 * the redirect requests from shortUrl.
 * 
 */

// Dependencies - mongoose for Db schema
var mongoose = require('mongoose');

var RedirectAuditSchema = new mongoose.Schema({
   shortUrl: {
       type: String,
       required: true
   },
   longUrl: {
       type: String,
       required: true
   },
   ip: {
       type: String,
       required: true
   },
   
});

// export this model
module.exports = mongoose.model('RedirectAudit', RedirectAuditSchema);