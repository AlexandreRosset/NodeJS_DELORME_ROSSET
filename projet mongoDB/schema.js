let mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:27017/DelormeRosset');
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
    description: Schema.Types.String
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


let toto = new User({
    nom: 'toto',
    prenom: 'toto',
    naissance: Date.now(),
    login: 'toto@toto.com',
    password: 'fradaliberbiche',
    client: false,
    groupe: []
});

let pouf = new Groupe({
    libelle: 'pif',
    description: 'paf'
});

toto.save(function (err) {
    if (err) return handleError(err);
    // saved!
});
pouf.save(function (err) {
    if (err) return handleError(err);
    // saved!
});