/**
 * Controller for the login model.
 * Created by Sunil.
 * 
 */


// Dependencies
var handler = require('../handlers/admin-handler');


module.exports = function(app, route) {

    app.get(route, function(req, res) {

        var action = req.query.action;
        switch(action) {
            
            case 'newtoken': handler.generateToken(req, res);
                break;

            default: res.send({'status': "failed"})
                break;
        }
    });
    
    app.post(route, function(req, res) {

        //var username = req.body.username;
        //var password = req.body.password;
        handler.login(req, res);
    });

};