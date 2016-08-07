/**
 * Index of all the supported routes for this application.
 */

module.exports = {

    '/admin': require('../controllers/admin-controller'),

    // v1 //
    '/api/v1/shorten': require('../controllers/shortenurl-controller'),
    '/api/v1/redirectstat' : require('../controllers/redirectstat-controller'),
};