var http = require("http");
var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/DelormeRosset');

var Schema = require('./schema');

httpserver = http.createServer(app);
app.use(bodyParser.json());

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
app.post('/user', function (req, res) {
    var usr = new Schema.User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        naissance: req.body.dateNaissance,
        login: req.body.login,
        password: req.body.password,
        client: false,
        groupe: []
    });
    usr.save();
    res.status(200).send();
});
app.get('/user/delete/:id', function (req, res) {
    Schema.User.findByIdAndRemove(req.params.id).exec();
    res.status(200).send();
});


httpserver.listen(8081);


console.log('Server running at http://127.0.0.1:8081/');
