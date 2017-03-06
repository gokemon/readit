var app = angular.module('readitSmacker', []);

app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', [
'$scope',
 'posts',
function($scope, posts){
  $scope.test = 'Hello Hacker Smackers, lets ReadIt!';
  
  //Binds my $scope.posts variable in our controller to the posts array in my factory service above
  $scope.posts = posts.posts;
  
  
  
  //Adding a post
$scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0
  });
  $scope.title = '';
  $scope.link = '';
};
  
//Enable Upvoting
$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};
  
  
}]);

  
 