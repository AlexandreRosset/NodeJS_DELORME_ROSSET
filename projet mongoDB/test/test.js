var http = require("http");
var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
mongoose.connect('mongodb://localhost:27017/DelormeRosset');

var Schema = require('../schema');



before(function(done)
{
    httpserver = http.createServer(app);
    app.use(bodyParser.json());

    httpserver.listen(8081);

    console.log('Server running at http://127.0.0.1:8081/');
});


describe('Select users', function(done){
    it('GET/search/user/:ofset/:limit should return 200', function(done){
        request().get('/search/user/1/1').expect(200, done);
    });
});


