
require('dotenv').config();
var mqqt = require('./utils/mqtt.js');
var client = mqqt.client();

client.on('message', function(topic, message) {
    console.log('message', topic, message.toString());
    
});

client.subscribe('device-state');


client.subscribe('AABBCCDDEEFF');
client.subscribe('22e9f4a2-1394-40d1-a923-f0520f7b7d43');
