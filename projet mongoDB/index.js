var http = require("http");
var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DelormeRosset');

var Schema = require('./schema');

httpserver = http.createServer(app);


app.get('/', function (req, res) {
    Schema.User.find({}, function (err, usrs) {
        res.json(usrs);
    }).exec();
});
app.get('/user/:id', function (req, res) {
    Schema.User.findById(req.params.id , function (err, usrs) {
        res.json(usrs);
    }).exec();
});


httpserver.listen(8081);


console.log('Server running at http://127.0.0.1:8081/');
