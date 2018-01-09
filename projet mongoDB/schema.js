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


var gr1 = new Groupe({
    libelle: 'gr1',
    description: 'groupe par defaut',
    user: []
});

gr1.save(function (err) {
    Groupe.findOne({'libelle': 'gr1'}, function(err,obj) {
        var grp = obj;

        console.log("grp" + grp._id);

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