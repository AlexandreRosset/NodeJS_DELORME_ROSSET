var app = angular.module('app', []);

app.controller('ctrl', function($scope, $interval){
  $scope.Ps = '';
  $scope.people = {
    'pseudo': '',
    'nom': '',
    'prenom': '',
    'adresse': '',
    'email': ''
  }
  var socket = io.connect('http://localhost:8081');
  $scope.NC = function() {
    socket.emit('nouveau_client', $scope.people);
    console.log($scope.people);
  }
  socket.on('pseudo', function(pseudo) {
    $scope.Ps = pseudo;
    $scope.$apply();
  })

});
