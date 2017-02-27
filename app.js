var app = angular.module('readitSmacker', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello Hacker Smackers, lets ReadIt!';
  $scope.posts = [
    'post 1',
    'post 2',
    'post 3',
    'post 4',
    'post 5'
  ];
}]);