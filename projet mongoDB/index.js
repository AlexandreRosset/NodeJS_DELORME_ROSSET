var http = require("http");
var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/DelormeRosset');

var Schema = require('./schema');

httpserver = http.createServer(app);
app.use(bodyParser.json());

app.post('/autentificate', function (req, res) {
   Schema.User.findOne({ 'login': req.body.login, 'isActive': true}, function (err, usr) {
       if (usr.password == req.body.password){
           res.status(200).send();
       } else {
           res.status(401).send();
       }
   })
});

app.get('/', function (req, res) {
    Schema.User.find({ 'isActive': true }, function (err, usrs) {
        res.json(usrs);
    }).limit(10).exec();
});
app.get('/search/user/:offset/:limit', function (req, res) {
    Schema.User.find({ 'isActive': true }, function (err, usrs) {
        res.json(usrs);
    }).skip(req.params.offset).limit(req.body.limit).exec();
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
        groupe: [],
        isActive: true
    });
    usr.save();
    res.status(200).send();
});
app.get('/user/delete/:user_id', function (req, res) {
    Schema.User.findByIdAndUpdate(req.params.user_id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/user/update/:id', function (req, res) {
    Schema.User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});

app.get('/link/user/:user_id/group/:group_id', function (req, res) {
     Schema.Groupe.findByIdAndUpdate(req.params.group_id, {
         $push: {
             user: req.params.user_id
         }
     }).exec();
     Schema.User.findByIdAndUpdate(req.params.user_id, {
         $push: {
             groupe: req.params.group_id
         }
     }).exec();
     res.status(200).send();
});

//Groupe

app.get('/search/group/:offset/:limit', function (req, res) {
    Schema.Groupe.find({ 'isActive': true } , function (err, usrs) {
        res.json(usrs);
    }).skip(req.params.offset).limit(req.body.limit).exec();
});

app.get('/group/:id', function (req, res) {
    Schema.Groupe.findById(req.params.id , function (err, usrs) {
        res.json(usrs);
    }).exec();
});
app.post('/group', function (req, res) {
    var grp = new Schema.Groupe({
        libelle: req.body.libelle,
        description: req.body.description,
        user: [],
        isActive: true
    });
    grp.save();
    res.status(200).send();
});
app.get('/group/delete/:group_id', function (req, res) {
    Schema.Groupe.findByIdAndUpdate(req.params.group_id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/group/update/:id', function (req, res) {
    Schema.Groupe.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});

//Adresse

app.get('/search/adress/:offset/:limit', function (req, res) {
    Schema.Adresse.find({ 'isActive': true }, function (err, adr) {
        res.json(adr);
    }).skip(req.params.offset).limit(req.body.limit).exec();
});

app.get('/adress/:id', function (req, res) {
    Schema.Adresse.findById(req.params.id , function (err, usrs) {
        res.json(usrs);
    }).exec();
});
app.post('/adress', function (req, res) {
    var adr = new Schema.Adresse({
        pays: req.body.pays,
        code_postal: req.body.code_postal,
        ville: req.body.ville,
        rue: req.body.rue,
        num_rue: req.body.num_rue,
        num_tel: req.body.num_tel,
        email: req.body.email,
        isActive: true
    });
    adr.save();
    res.status(200).send();
});
app.get('/adress/delete/:adress_id', function (req, res) {
    Schema.Adresse.findByIdAndUpdate(req.params.adress_id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/adress/update/:id', function (req, res) {
    Schema.Adresse.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});

//type Adresse

app.get('/search/typeadress/:offset/:limit', function (req, res) {
    Schema.TypeAdresse.find({ 'isActive': true }, function (err, adr) {
        res.json(adr);
    }).skip(req.params.offset).limit(req.body.limit).exec();
});

app.get('/typeadress/:id', function (req, res) {
    Schema.TypeAdresse.findById(req.params.id , function (err, usrs) {
        res.json(usrs);
    }).exec();
});
app.post('/typeadress', function (req, res) {
    var TyAdr = new Schema.TypeAdresse({
        libelle: req.body.libelle,
        isActive: true
    });
    TyAdr.save();
    res.status(200).send();
});
app.get('/typeadress/delete/:typeadress_id', function (req, res) {
    Schema.TypeAdresse.findByIdAndUpdate(req.params.adress_id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/typeadress/update/:id', function (req, res) {
    Schema.TypeAdresse.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});

//lien adresse / typeAdresse / User

app.get('/link/adress/:adress/typeAdresse/:type/user/:user', function (req, res) {
    var lien = new Schema.AdresseTypeAdresseUser({
        user: req.params.user,
        adresse: req.params.adresse,
        typeAdresse: req.params.type
    });
    lien.save();
    res.status(200).send();
});

app.get('/search/link/:offset/:limit', function (req, res) {
    Schema.AdresseTypeAdresseUser.find({ 'isActive': true }, function (err, adr) {
        res.json(adr);
    }).skip(req.params.offset).limit(req.body.limit).exec();
});

httpserver.listen(8081);


console.log('Server running at http://127.0.0.1:8081/');
