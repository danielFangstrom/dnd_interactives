var http = require('http');
var url = require('url');
var querystring = require('querystring');

var RequestHander = function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    console.log(params);

    if (page.toLowerCase() == '/gm') {
        if (!('key' in params) || params['key'] != 'omnomnom') {
            res.writeHead(300, {"Content-Type": "text/html"});
            res.end('The gods have not chosen ye!');
            return;
        } else {
            console.log('Admitting GM')
        }
    }
    
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<!DOCTYPE html>'+
    '<html>'+
    ' <head>'+
    ' <meta charset="utf-8" />'+
    ' <title>My Node.js page!</title>'+
    ' </head>'+ 
    ' <body>'+
    ' <p>Hello <strong>' + page.slice(1) + '</strong>!</p>'+
    ' </body>'+
    '</html>');
    res.end();
};

var server = http.createServer(RequestHander);

server.on('close', function() {
    console.log('Server shutting down.');
})

server.listen(8000);
//server.close();

