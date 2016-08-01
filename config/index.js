/**
 * All configuration parameters are queried using these exportable methods.
 * Created by Sunil
 */


var configuration = require('./config');

module.exports = {
    
    getDbConnectionString: function () {
        
        // mongodb://localhost:27017/pw-dev
        //return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@localhost:27017/pw-dev';
        return 'mongodb://localhost:27017/shrtn';
    },
    
    getSecrethash: function() {
        return configuration.secret;
    },

    getShortDomain: function() {
        return configuration.shortDomain;
    },

    uniqueShortUrls : function() {
        return configuration.uniqueShortUrls;
    }
};