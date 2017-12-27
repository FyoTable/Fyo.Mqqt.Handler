const mqtt = require('../../../../utils/mqtt.js');

module.exports = function(app) {
    app.get('/api/v1/:id/update', function(req, res) {
        // TODO: (garrett) make sure the signed in user owns this device before publishing the command
        mqtt.command('AABBCCDDEEFF', 'update', null);
        res.send({});
    });
}