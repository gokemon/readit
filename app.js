var app = angular.module('readitSmacker', []);

app.controller('MainCtrl', [
'$scope',
function($scope){
	//testing scope out
	$scope.test = 'Hello Hacker Smackers, lets ReadIt!';

	//Array list of posts
	$scope.posts = [
		{title: 'post 1', upvotes: 5},
		{title: 'post 2', upvotes: 2},
		{title: 'post 3', upvotes: 15},
		{title: 'post 4', upvotes: 9},
		{title: 'post 5', upvotes: 4}
	];

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


