var http = require("http");
var app = require('express')();
var express = require('express');
var fs = require('fs');
var csv = require("fast-csv");

httpserver = http.createServer(app);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/app/src/templates/racine.html');
});
app.get('/list', function (req, res) {
  res.sendfile(__dirname + '/app/src/templates/listeP.html');
})

app.use('/js', express.static('app/src/js'));
app.use('/css', express.static('app/dist/css'));
app.use('/templates', express.static('app/src/templates'));
app.use('/app', express.static('app'));


app.get('*', function(req, res){
  res.status(404).sendfile(__dirname + '/app/src/templates/404.html');
});


httpserver.listen(8081);

var io = require('socket.io').listen(httpserver);

io.sockets.on('connection', function (socket) {
  var Usr;
  socket.on('deleteAll', function () {
    fs.unlink('message.csv');
  })
  socket.on('nouveau_client', function (people) {
    Usr = people;

    socket.emit('pseudo', Usr.pseudo);

    Usr.pseudo = Usr.pseudo + ';';
    Usr.nom = Usr.nom + ';';
    Usr.prenom = Usr.prenom + ';';
    Usr.adresse = Usr.adresse + ';';
    Usr.email = Usr.email + ';';

    var data;
    //read file to save it
    if (fs.existsSync('message.csv')) {
      data = fs.readFileSync('message.csv');
      console.log(data);
      data = data + ';\n';
    } else {
      data = '';
    }

    fs.writeFile('message.csv', data + Usr.pseudo + Usr.nom + Usr.prenom + Usr.adresse + Usr.email, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

  });
  var listLigne = [];
  if (fs.existsSync('message.csv')) {
  csv
    .fromPath("message.csv")
    .on("data", function(data){
      listLigne.push(data.toString().split(";"));
      console.log(listLigne);
    })
    .on("end", function(){
      console.log("done");
    });
  }
    socket.on('DemListePeople', function (req){
      var peoples = [];

      for (var i = 0; i < listLigne.length; i++){
        peoples.push({
          'pseudo': listLigne[i][0],
          'nom': listLigne[i][1],
          'prenom': listLigne[i][2],
          'adresse': listLigne[i][3],
          'email': listLigne[i][4]
        })
      }

      socket.emit('peoples', peoples);
    });
});


console.log('Server running at http://127.0.0.1:8081/');
