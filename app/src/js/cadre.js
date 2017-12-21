var app = angular.module('app', []);

app.controller('ctrl', function($scope){
  $scope.socket = io.connect('http://localhost:8081');
  $scope.Ps = '';
  $scope.page = '/racine';
});
