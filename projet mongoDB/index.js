var http = require("http");
var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DelormeRosset');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: Schema.Types.ObjectId,
    nom: Schema.Types.String,
    prenom: Schema.Types.String,
    naissance: Schema.Types.Date,
    login: Schema.Types.String,
    password: Schema.Types.String,
    client: Schema.Types.Boolean,
    groupe: [{type: Schema.Types.ObjectId, ref: 'Groupe'}]
});

var groupeSchema = new Schema({
    id: Schema.Types.ObjectId,
    libelle: Schema.Types.String,
    description: Schema.Types.String,
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

var adresseSchema = new Schema({
    id: Schema.Types.ObjectId,
    pays: Schema.Types.String,
    code_postal: Schema.Types.Number,
    ville: Schema.Types.String,
    rue: Schema.Types.String,
    num_rue: Schema.Types.String,
    num_tel: Schema.Types.Number,
    email: Schema.Types.String
});

var type_adresseSchema = new Schema({
    id: Schema.Types.ObjectId,
    libelle: Schema.Types.String
});

var adresseTypeadresseUserSchema = new Schema({
    id: Schema.Types.ObjectId,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    adresse: {type: Schema.Types.ObjectId, ref: 'Adresse'},
    typeAdresse: {type: Schema.Types.ObjectId, ref: 'TypeAdresse'}
});

var User = mongoose.model('User', userSchema);
var Groupe = mongoose.model('Groupe', groupeSchema);
var Adresse = mongoose.model('Adresse', adresseSchema);
var TypeAdresse = mongoose.model('TypeAdresse', type_adresseSchema);
var AdresseTypeAdresseUser = mongoose.model('AdresseTypeAdresseUser', adresseTypeadresseUserSchema);

httpserver = http.createServer(app);


app.get('/', function (req, res) {
    User.find({}, function (err, usrs) {
        res.json(usrs);
    }).exec();
});


httpserver.listen(8081);


console.log('Server running at http://127.0.0.1:8081/');
