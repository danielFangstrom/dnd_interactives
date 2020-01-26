var express = require('express');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var util = require('util');

// command line handling
const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .option('dev', {describe: 'Use development assets and widgets'})
    .help('h')
    .alias('h', 'help')
    .epilog('Ronny and Daniel - 2020')
    .argv;
console.log(argv);

// use development assets and widgets when `dev` flag was set
const path_append = argv.dev ? '_dev' : '';


var app = express();

app.use(express.static(path.join(__dirname, '/public')));

if (argv.dev) {
    console.log('Using development assets.')
    app.use('/images', express.static(path.join(__dirname, '/public/images' + path_append)));
    app.use('/widgets', express.static(path.join(__dirname, '/public/widgets' + path_append)));
} else {
    console.log('Using production assets.')
    app.use('/images', express.static(path.join(__dirname, '/production/images' + path_append)));
    app.use('/widgets', express.static(path.join(__dirname, '/production/widgets' + path_append)));
};

app.get('/', function(req, res) {
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

app.listen(8000);

//server.close();

