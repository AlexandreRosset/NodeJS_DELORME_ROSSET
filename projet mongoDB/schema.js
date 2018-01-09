var mongoose = require('mongoose');
var async = require('async');
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
    groupe: [{ type: Schema.Types.ObjectId, ref: 'Groupe'}]
});

var groupeSchema = new Schema({
    id: Schema.Types.ObjectId,
    libelle: Schema.Types.String,
    description: Schema.Types.String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}]
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
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    adresse: { type: Schema.Types.ObjectId, ref: 'Adresse'},
    typeAdresse: { type: Schema.Types.ObjectId, ref: 'TypeAdresse'}
});

var User = mongoose.model('User', userSchema);
var Groupe = mongoose.model('Groupe', groupeSchema);
var Adresse = mongoose.model('Adresse', adresseSchema);
var TypeAdresse = mongoose.model('TypeAdresse', type_adresseSchema);
var AdresseTypeAdresseUser = mongoose.model('AdresseTypeAdresseUser', adresseTypeadresseUserSchema);

var init = function () {
    var gr1 = new Groupe({
        libelle: 'gr1',
        description: 'groupe par defaut',
        user: []
    });

    gr1.save(function (err) {
        Groupe.findOne({'libelle': 'gr1'}, function(err,obj) {
            var grp = obj;


            var usr1 = new User({
                nom: 'usr1',
                prenom: 'usr1',
                naissance: Date.now(),
                login: 'usr@usr.com',
                password: 'fradlaliberbiche',
                client: false,
                groupe: []
            });

            usr1.groupe.push(grp);
            usr1.save(function (err) {
                User.find({}, function(err, obj) {
                    obj.forEach(function (usr) {
                        console.log(usr._id + ":" + usr.groupe);
                    });
                });
                User.findOne({ 'nom': usr1.nom}, function (err, obj) {
                    var usrRecup = obj;
                    Groupe.findOneAndUpdate({ '_id': grp._id}, {
                        $push: {
                            user: usrRecup
                        }
                    }).exec();
                })
            });

        }).exec();
    });
}

//init();

var findUser = function (id) {
    User.findById(id, function (err, user) {
        return user;
    })
};

var findAllUser = function (res) {
    User.find({}, function (err, usrs) {
        res.json(JSON.parse(usrs));
    }).exec();
};

var createUser = function (nom, prenom, dateNaissance, login, password) {
    var usr = new User({
        nom: nom,
        prenom: prenom,
        naissance: dateNaissance,
        login: login,
        password: password,
        client: false,
        groupe: []
    });
    usr.save();
};

var addGroupeUser = function (idUser, idGroupe) {
    Groupe.findById(idGroupe, function (err, groupe) {
        User.findOneAndUpdate({ '_id': idUser}, {
            $push: {
                groupe: groupe
            }
        }).exec();
    })
    User.findById(idUser, function (err, user) {
        Groupe.findOneAndUpdate({ '_id': idGroupe}, {
            $push: {
                user: user
            }
        }).exec();
    })
};

var deleteUser = function (idUser) {
    User.findByIdAndRemove(idUser).exec();
};

var updateUser = function (idUser, nom, prenom, dateNaissance, login, password) {
    User.findByIdAndUpdate(idUser, {
        $set: {
            nom: nom,
            prenom: prenom,
            naissance: dateNaissance,
            login: login,
            password: password
        }
    })
};

var createGroupe = function (libelle, description) {
    var grp = new Groupe({
        libelle: libelle,
        description: description
    });
    grp.save();
};

var findGroupe = function (idGroupe) {
    Groupe.findById(idGroupe, function (err, groupe) {
        return groupe;
    })
};

var findAllGroupe = function () {
    Groupe.find({}, function (err, groupe) {
        return groupe;
    })
};



module.exports.User = {};
module.exports.User.find = findUser;
module.exports.User.findAll = findAllUser;
module.exports.User.create = createUser;
module.exports.User.addGroupe = addGroupeUser;
module.exports.User.delete = deleteUser;
module.exports.User.update = updateUser;

module.exports.Groupe = {};
module.exports.Groupe.create = createGroupe;
module.exports.Groupe.find = findGroupe;
module.exports.Groupe.findAll = findAllGroupe;
