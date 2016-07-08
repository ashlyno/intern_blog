'use script';

angular.module('BlogApp', ['ngSanitize', 'ui.router', 'ui.bootstrap']) //ngSanitize for HTML displaying

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
			url: '/', 
			templateUrl: 'partial/home.html',
			controller: 'HomeCtrl'
		})	
		.state('about', {
			url: '/about',
			templateUrl: 'partial/about.html',
			controller: 'AboutCtrl'
		})
		.state('blog', {
			url: '/blog',
			templateUrl: 'partial/blog.html',
			controller: 'BlogCtrl'
		})
		.state('detail', {
			url: '/blog/{id}',
			templateUrl: 'partial/post-detail.html',
			controller: 'DetailCtrl'
		})

		$urlRouterProvider.otherwise('/'); //other route

})

//home page settings
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {


}])

.controller('AboutCtrl', ['$scope', '$http', function($scope, $http) {


}])

.controller('BlogsCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.posts = [];
	$scope.sortingCriteria = 'name';

	$http.get('data/posts.json').then(function(response) {
 		$scope.posts = response.data;
 	});	

}])

.controller('DetailCtrl', ['$scope', '$http', '$filter', '$stateParams', function($scope, $http, $filter, $stateParams) {
	$http.get('data/posts.json').then(function(response) {
 		$scope.posts = response.data;
 		$scope.post = $filter('filter')($scope.posts, { 
      	id: $stateParams.id 
   		}, true)[0];

 	});

}])