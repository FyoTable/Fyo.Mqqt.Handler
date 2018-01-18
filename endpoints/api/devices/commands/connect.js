const mqtt = require('../../../../utils/mqtt.js');

var client = mqtt.client();

module.exports = function(app) {
    app.get('/api/v1/:id/connect/:player', function(req, res) {
        // TODO: (garrett) make sure the signed in user owns this device before publishing the command
        mqtt.command(req.params.id, 'connecting', req.params.player);
        res.send('success');
    });
}