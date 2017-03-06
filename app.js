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
  
  //Sample Data
  // $scope.posts = [
  //   {title: 'post 1', upvotes: 5},
  //   {title: 'post 2', upvotes: 2},
  //   {title: 'post 3', upvotes: 15},
  //   {title: 'post 4', upvotes: 9},
  //   {title: 'post 5', upvotes: 4}
  // ];
  // Removed when I bound my posts array to my facorty service arraay
  
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

  
 