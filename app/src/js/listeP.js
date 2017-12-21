var app = angular.module('app', []);

app.controller('ctrl', function($scope, $interval){
  $scope.people = [];
  $scope.showconf = false;
  var socket = io.connect('http://localhost:8081');
  $scope.NC = function() {
    socket.emit('DemListePeople');
  }
  socket.on('peoples', function(res) {
    $scope.people = res;
    console.log($scope.people);
    $scope.$apply();
  })
  $scope.deleteAll = function () {
    socket.emit('deleteAll');
    location.reload();
  }
  $scope.deleteP = function (index) {
    socket.emit('deleteOne', $scope.people[index].email);
    location.reload();
  }

});
