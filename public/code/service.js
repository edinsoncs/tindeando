'use strict'

app.factory('Datausers', function($http){
	
    let user = [];
			
	return $http({
		method: 'GET',
		url: '/find'
	}).then(function(data){

		user.push(data.data);
		return user

	}, function(err){
		console.log(err);
	})

});

app.factory('Mujeres', function($http){

	let user = [];
			
	return $http({
		method: 'GET',
		url: '/find/mujeres'
	}).then(function(data){

		user.push(data.data);
		return user

	}, function(err){
		console.log(err);
	})

});

app.factory('Hombres', function($http){

	let user = [];
			
	return $http({
		method: 'GET',
		url: '/find/hombres'
	}).then(function(data){

		user.push(data.data);
		return user

	}, function(err){
		console.log(err);
	})

});