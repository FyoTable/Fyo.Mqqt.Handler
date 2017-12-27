const mqtt = require('../../../../utils/mqtt.js');

let client = mqtt.client();
client.subscribe('device-state');

module.exports = function(app) {
    app.get('/api/v1/:id/live', function(req, res) {
        // TODO: (garrett) make sure the signed in user owns this device before publishing the command
        mqtt.command(req.params.id, 'live', null);
        
        var timer = setTimeout(function() {
            client.removeListener('message', listener);
            res.send({ state: false });
        }, 5000); // 5 seconds to reply


        function listener(topic, message) {
            client.removeListener('message', listener);
            console.log(topic, message.toString());
            
            if(topic == 'device-state' && message && message.toString() === req.params.id) {
                clearTimeout(timer);
                res.send({ state: true });
            }
        }

        client.on('message', listener);

    });
}