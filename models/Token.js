/**
 * Created by Sunil
 * model type: Token
 */

// Dependencies
var mongoose = require('mongoose');

var TokenSchema = mongoose.Schema({
    
    _id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('token', TokenSchema);