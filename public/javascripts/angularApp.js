var app = angular.module('readitSmacker', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function (posts) {
            return posts.getAll();
          }]
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function ($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      });
  $urlRouterProvider.otherwise('home');
}]); // app.config





/* factory service for posts */
app.factory('posts', ['$http', function ($http) {
  var o = { posts: [] };

  /* GET method to retrieve posts */
  o.getAll = function () {
    return $http.get('/posts').success(function (data) {
      angular.copy(data, o.posts);
    });
  };// getAll method

  /* GET method to get a single particular post */
  o.get = function (id) {
    return $http.get('/posts/' + id).then(function (res) {
      return res.data;
    });
  };// get method

  /* POST create new posts method */
  o.create = function (post) {
    return $http.post('/posts', post).success(function (data) {
      o.posts.push(data);
    });
  };

 /*PUT UpVote posts method */
  o.upvote = function (post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .success(function (data) {
        post.upvotes += 1;
      });
  // }; UpVote method

  /*POST addComment method */
  o.addComment = function (id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };//addComment method

  /*PUT UpVote Comments method  */
  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
      .success(function(data){
        comment.upvotes += 1;
      });
  };//UpVote Comments method 

  return o;
}]); // app.factory service




app.controller('PostsCtrl', [
  '$scope',
  //'$stateParams',
  'posts',
  'post',
  function($scope, posts, post){
    /* get and load data */
    //$scope.post = posts.posts[$stateParams.id];
     $scope.post = post;
    
    /* Adding a Comment method */
    $scope.addComment = function () {
       if ($scope.body === '') { return; }
       posts.addComment(post._id, {
         body: $scope.body,
         author: 'user',
       }).success(function (comment) {
         $scope.post.comments.push(comment);
       });
       $scope.body = '';
    };//method scope.addComment

    /* Enable Upvoting on Comments method */
    $scope.incrementUpvotes = function (comment) {
      posts.upvoteComment(post, comment);
    };// Enable comment Upvoting
    
}]);//app.controller ~ PostsCtrl



app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.test = 'Hello Hacker Smackers, lets ReadIt!';
    
    /* Binds my $scope.posts variable in our controller 
    to the posts array in my factory service above */
    $scope.posts = posts.posts;

    /* Adding a post method  */
    // $scope.addPost = function () {
    //   if (!$scope.title || $scope.title === '') { return; }

    //    /* Sample fake COMMENTS Data  */
    //   // $scope.posts.push({
    //   //   title: $scope.title,
    //   //   link: $scope.link,
    //   //   upvotes: 0,
    //   //   comments: [
    //   //     { author: 'Joe', body: 'Cool post!', upvotes: 6 },
    //   //     { author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 7 }
    //   //   ]
    //   // });

    //   $scope.title = '';
    //   $scope.link = '';
    // };// method scope.addPost

    /* Adding a post method  */
    $scope.addPost = function () {
      if (!$scope.title || $scope.title === '') { return; }
      posts.create({
        title: $scope.title,
        link: $scope.link,
      });
      $scope.title = '';
      $scope.link = '';
    };
  
    /* Enable Upvoting on posts method */
    $scope.incrementUpvotes = function (post) {
      //post.upvotes += 1;
      posts.upvote(post);
    };// Enable posts Upvoting

}]); 

  
 