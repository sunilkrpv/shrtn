/**
 * Index of all the supported routes for this application.
 */

module.exports = {

    // v1 //
    '/api/v1/shorten': require('../controllers/shortenurl-controller'),
    '/api/v1/redirectstat' : require('../controllers/redirectstat-controller')
};