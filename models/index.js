/**
 * Created by Sunil
 * All exportable models used by the express app are defined in this file.
*/

module.exports = {
    shorten: require('./ShortenUrl'),
    redirectstat: require('./RedirectStats'),
    token: require('./Token')
};