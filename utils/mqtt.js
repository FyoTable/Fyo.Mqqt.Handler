// Use MQQT to tell Fyo devices to connect to web socket of portal
var mqtt = require('mqtt')

var client  = mqtt.connect(process.env.MQQT_URL, {
    username: process.env.MQQT_USERNAME,
    password: process.env.MQQT_PASSWORD
});

//const FYO_ID = 'AABBCCDDEEFF';
// client.on('connect', function () {
//     client.publish(FYO_ID, JSON.stringify({
//        command: 'update' 
//     }));
// });

module.exports = {
    command: function(device, cmd, arg) {
        client.publish(device, JSON.stringify({
           command: cmd,
           arg: arg
        }));
    },
    client: function() {
        return client;
    }
};