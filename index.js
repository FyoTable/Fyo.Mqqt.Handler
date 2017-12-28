var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('./utils/helpers.js');
var cors = require('cors')

require('dotenv').config();
require('./utils/mqtt.js');

const PORT = process.env.PORT || process.env.port || 8090

// Setup the Express app that will run the server
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options('*', cors()) // include before other routes
app.all('/', function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

helpers.Require(__dirname + '/endpoints/api/', app);

// Start the server
var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port);
});
