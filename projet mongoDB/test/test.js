var http = require("http");
var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
var server = require('../index');
var request = require('request');
mongoose.connect('mongodb://localhost:27017/DelormeRosset');

var Schema = require('../schema');





describe('Select users', function(done){

    it('GET/search/user/:ofset/:limit should return 200', function(done){
        request.get('http://localhost:8081/search/user/1/1', function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    }, done);
});


