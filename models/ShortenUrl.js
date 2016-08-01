/**
 * Created by Sunil
 * model type: Shorten - shortened URLs information
 * 
 */

// Dependencies - mongoose for Db schema
var mongoose = require('mongoose');

var ShortenUrlSchema = new mongoose.Schema({
    _id: {
       type: String,
       required: true
   },
   longUrl: {
       type: String,
       required: true
   },
   shortDomain: {
       type: String,
       required: true
   },
   shortUrl: {
       type: String
   },
   createdAt:{
       type: Date,
       default: Date.now,
       required: true
   },
   updatedAt: {
       type: Date,
       default: Date.now,
   },
   requestCount: {
       type: Number,
       default:0,
   }/*
   hitCount: {
       type: Number,
       default: 0
   }*/
   
});

// export this model
module.exports = mongoose.model('ShortenUrl', ShortenUrlSchema);