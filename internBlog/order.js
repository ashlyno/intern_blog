'use script';

angular.module('BlogApp', ['ngSanitize', 'ui.router', 'ui.bootstrap']) //ngSanitize for HTML displaying

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
			url: '/', 
			templateUrl: 'partial/home.html',
			controller: 'HomeCtrl'
		})
		.state('orders', {
			url: '/orders',
			templateUrl: 'partial/order.html',
			controller: 'OrderCtrl'
		})	
		.state('detail', {
			url: '/orders/{id}',
			templateUrl: 'partial/bean-detail.html',
			controller: 'DetailCtrl'
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'partial/cart.html',
			controller: 'CartCtrl'
		})

		$urlRouterProvider.otherwise('/'); //other route

})

//home page settings
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {


}])

//find order page
.controller('OrderCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.products = [];
	$scope.sortingCriteria = 'name';

	$http.get('data/products.json').then(function(response) {
 		$scope.products = response.data;
 	});


}])

// gives beans detes
.controller('DetailCtrl', ['$scope', '$http', '$filter', '$stateParams', 'CartService', function($scope, $http, $filter, $stateParams, CartService) {
	$http.get('data/products.json').then(function(response) {
 		$scope.products = response.data;
 		$scope.product = $filter('filter')($scope.products, { 
      	id: $stateParams.id 
   		}, true)[0];

 	});

 	$scope.savePurchase = CartService.save; //add to cart

}])

.controller('CartCtrl', ['$scope', '$http', 'CartService', '$uibModal', function($scope, $http, CartService, $uibModal) {

	$scope.CartService = CartService; // go to my cart

	// order total
	$scope.cartTotal = function() {
		var orderTotal = 0;
		for (var i = 0; i < CartService.cart.length; i++) {
			orderTotal += (CartService.cart[i].quantity * CartService.cart[i].price);
		}
		return orderTotal;
	}
}])

// factory for cart
.factory('CartService', function(){

	var service = {};
	service.cart = [];

	var localStor = localStorage.getItem('cart');
		if (localStor) {
			service.cart = JSON.parse(localStorage.getItem('cart'));
	}

	// add
	service.save = function(item) {
		service.cart.push(item);
		save();
	};

	// mo beans
	service.add = function(item) {
		if (item.quantity < 10) {
			item.quantity += 1;
			save();
		}
	};

	// less beans
	service.minus = function(item) {
		if (item.quantity > 1) {
			item.quantity -= 1;
			save();
		}
	};

	// place order
	service.clearItem = function(item) {
		var index = service.cart.indexOf(item);
		service.cart.splice(index, 1);
		save();
	}

	// for saving func above
	function save() {
		localStorage.setItem('cart', JSON.stringify(service.cart));
	}

	return service;
});
