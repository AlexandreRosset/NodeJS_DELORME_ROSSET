var http = require("http");
var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');

httpserver = http.createServer(app);


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/app/src/templates/racine.html');
});
app.get('/list', function (req, res) {
    res.sendfile(__dirname + '/app/src/templates/listeP.html');
})

app.use('/js', express.static('src/js'));
app.use('/css', express.static('dist/css'));
app.use('/templates', express.static('src/templates'));


app.get('*', function(req, res){
    res.status(404).sendfile(__dirname + '/app/src/templates/404.html');
});


httpserver.listen(8081);


var Schema = mongoose.Schema;








/*
var io = require('socket.io').listen(httpserver);

io.sockets.on('connection', function (socket) {
});*/


console.log('Server running at http://127.0.0.1:8081/');
