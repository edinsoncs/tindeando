'use strict'

const app = angular.module("website", ["ngRoute", "angularCSS", "ngMaterial", "ngStorage"]);

app.config(function($routeProvider){

	$routeProvider

	.when('/', {
		templateUrl: 'components/home.html',
		css: 'components/css/home.css',
		controller: 'homeCtrl'
	})

	.when('/dashboard', {
		templateUrl: 'components/dashboard.html',
		css: 'components/css/dashboard.css',
		controller: 'dashboardCtrl'
	})

	.when('/dashboard/messages', {
		templateUrl: 'components/messages.html',
		css: 'components/css/messages.css',
		controller: 'messagesCtrl'
	})

	.when('/dashboard/messages/:id', {
		templateUrl: 'components/viewmessage.html',
		css: 'components/css/viewmessage.css',
		controller: 'viewmessageCtrl'

	})

	.otherwise({
		template: '<h1 class="text-center">Error - <a href="#" class="btn btn-info">Inicio</a></h1>'
	})

});

