let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DelormeRosset');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    id: Schema.Types.ObjectId,
    nom: Schema.Types.String,
    prenom: Schema.Types.String,
    naissance: Schema.Types.Date,
    login: Schema.Types.String,
    password: Schema.Types.String,
    client: Schema.Types.Boolean,
    groupe: [{ type: Schema.Types.ObjectId, ref: 'Groupe'}]
});

let groupeSchema = new Schema({
    id: Schema.Types.ObjectId,
    libelle: Schema.Types.String,
    description: Schema.Types.String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

let adresseSchema = new Schema({
    id: Schema.Types.ObjectId,
    pays: Schema.Types.String,
    code_postal: Schema.Types.Number,
    ville: Schema.Types.String,
    rue: Schema.Types.String,
    num_rue: Schema.Types.String,
    num_tel: Schema.Types.Number,
    email: Schema.Types.String
});

let type_adresseSchema = new Schema({
    id: Schema.Types.ObjectId,
    libelle: Schema.Types.String
});

let adresseTypeadresseUserSchema = new Schema({
    id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    adresse: { type: Schema.Types.ObjectId, ref: 'Adresse'},
    typeAdresse: { type: Schema.Types.ObjectId, ref: 'TypeAdresse'}
});

let User = mongoose.model('User', userSchema);
let Groupe = mongoose.model('Groupe', groupeSchema);
let Adresse = mongoose.model('Adresse', adresseSchema);
let TypeAdresse = mongoose.model('TypeAdresse', type_adresseSchema);
let AdresseTypeAdresseUser = mongoose.model('AdresseTypeAdresseUser', adresseTypeadresseUserSchema);


let gr1 = new Groupe({
    libelle: 'gr1',
    description: 'groupe par defaut',
    user: []
});

gr1.save(function (err) {
    Groupe.findOne({'libelle': 'gr1'}, function(err,obj) {
        let grp = obj;

        console.log("grp" + grp._id);

        let usr1 = new User({
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
                let usrRecup = obj;
                grp.user.push(usrRecup);
                grp.save(function (err) {
                    console.log(err);
                });
            })
        });

    }).exec();
});