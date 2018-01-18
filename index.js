var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('./utils/helpers.js');
var cors = require('cors');

var whitelist = ['http://localhost:5000', 'http://fyo.io']
var corsOptions = {
  origin: function (origin, callback) {
	  console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

require('dotenv').config();
require('./utils/mqtt.js');

const PORT = process.env.PORT || process.env.port || 8095

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

var io = require('socket.io')(server);


function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
  
      res.writeHead(200);
      res.end(data);
    });
  }
  
  io.on('connection', function (socket) {
	console.log('Connection!');
    socket.on('screenshot', function (data) {
        //console.log(data);

	console.log('screenshot received');

        io.to(data.device).emit('screenshotData', data.content);

        var buf = new Buffer(data.content, 'base64');
        require('fs').writeFile(__dirname + '/test.png', buf);
    });

	// Portal or Device
	// Join  Device Room
    socket.on('device', function(id) {
        socket.join(id);
        console.log('Socket joined: ', id);
    });

	// Portal => Device
	socket.on('capture', function(data) {
		console.log(data);
		if(data && data.device) {
			io.to(data.device).emit('capture', data.content);
		}
		//socket.broadcast.emit('capture');
	});

  });