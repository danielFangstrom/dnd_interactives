var express = require('express');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var util = require('util');
const WebSocket = require('ws');
//const Matrix = require ( 'public/widgets_dev/classes/matrix.js' );

// command line handling
const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .option('dev', {describe: 'Use development assets and widgets'})
    .default('port', 8000)
    .default('wsport', 8080)
    .help('h')
    .alias('h', 'help')
    .epilog('Ronny and Daniel - 2020')
    .argv;
console.log(argv);

const http_port = argv.port;

// use development assets and widgets when `dev` flag was set
const path_append = argv.dev ? '_dev' : '';


var app = express();

app.use(express.static(path.join(__dirname, '/public')));

if (argv.dev) {
    console.log('Using development assets.')
    app.use('/images', express.static(path.join(__dirname, '/public/images' + path_append)));
    // app.use('/widgets', express.static(path.join(__dirname, '/public/widgets_dev/classes')));
    // app.use('/widgets', path.join(__dirname, '/public/widgets_dev/classes'));
    app.use('/widgets', express.static(path.join(__dirname, '/public/widgets' + path_append)));
} else {
    console.log('Using production assets.')
    app.use('/images', express.static(path.join(__dirname, '/production/images' + path_append)));
    app.use('/widgets', express.static(path.join(__dirname, '/production/widgets' + path_append)));
};

app.get('/', function(req, res) {
	console.log( "Get with no path called!" );
    res.setHeader('Content-Type', 'text/plain');
    res.end('Fill your name');
});

app.get('/gm', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hi GM! Make them suffer for killing off your Chuul!');
});

app.get('/player/:playername', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Suffer for killing off the poor Chuul, ' + req.params.playername);
});

// app.use(function(req, res, next){
//     res.setHeader('Content-Type', 'text/plain');
//     res.send(404, 'You fail your perception check. There doesn\'t seem to be anything here.');
// });

app.on('get', function(req, res) {console.log(req)});

console.log('Starting HTTP Server on port ' + argv.port.toString());
app.listen(http_port);

// Websocket Server
console.log('Starting Websocket server on port ' + argv.wsport.toString());
const wss = new WebSocket.Server({ port: argv.wsport });

function heartbeat() {
    this.isAlive = true;
}

function noop() {}

wss.on('connection', function connection(ws, request) {
    // note this does not work behind a proxy, see documentation on how to use the X-Forwarded-For header
    const ip = request.connection.remoteAddress;
    console.log('Websocket connection from %s', ip);
    
    // preparation for heartbeat detection
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    
    ws.on('message', function incoming(data) {
        console.log('received %s', data);
        if (typeof data === 'string') {
            // TODO: try/except block for parser
            var packet = JSON.parse(data);
            console.log(packet);
            if (packet.widgetID == 0) {
                console.log('Spreading news');
                broadcast(`{ "widgetID": 0, "data": "${packet.data}"}`);
            }
        }
    });

    ws.on('close', function close(code, reason) {
        console.log('Client with IP %s terminated with code %d because: %s', ip, code, reason)
    });

});

function broadcast(message, origin, notself) {
    wss.clients.forEach(function each(ws) {
        ws.send(message);
    });
}

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false){
            console.log('Connection timeout, terminating.')
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping(noop);
    });
}, 3000);


//server.close();

