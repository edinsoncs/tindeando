'use strict'







app.controller('homeCtrl', ['$scope', '$interval', function($scope, $interval){


	var self = this;

    self.activated = true;
    self.determinateValue = 30;

	
	$scope.continue = false;
	$scope.loading = true;     


	$interval(() => {

		$scope.continue = true;
		$scope.loading = false;     

	}, 1500);


    $interval(function() {

        self.determinateValue += 1;
        if (self.determinateValue > 100) {
          self.determinateValue = 30;
        }

      }, 100);

	
}]);



app.controller('dashboardCtrl', ['$scope', '$http', 'Datausers', '$mdDialog', '$window', '$localStorage', 'Mujeres', 'Hombres',

	 function($scope, $http, Datausers, $mdDialog, $window, $localStorage, Mujeres, Hombres){

	$http({
		method: 'GET',
		url: '/profile'
	}).then(function(data){
		$scope.image = data.data.photo;
		$scope.name = data.data.name;

		if(data.data.info) {
			$scope.continueUser = true;
			localStorage.setItem('my_id', data.data._id);
			localStorage.setItem('genero', data.data.info.sexo);
		} else {
			$scope.continueUser = false;
		}

		

	});




	


	 $scope.showAlert = function(ev) {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('body')))
	        .clickOutsideToClose(true)
	        .title('Tindeando')
	        .textContent('Somos una comunidad de personas para conocer a otras')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Cerrar')
	        .targetEvent(ev)
	    );
	  };


	$scope.continueInfo = function(e) {
		e.preventDefault();

		$http({
			method: 'POST',
			url: '/save/profile',
			data: {
				'pais': $scope.pais,
				'sexo': $scope.sexo,
				'edad': $scope.edad
			}
		}).then(function(data){
			$scope.continueUser = true;

		}, function(err){
			console.log(err);
		});

	}
	

}]);

app.controller('messagesCtrl', ['$scope', '$http', 'Datausers', function($scope, $http, Datausers){

	$scope.id = Math.random();

}]);

app.controller('viewmessageCtrl', ['$scope', '$http', 'Datausers', function($scope, $http, Datausers){

	

}]);

app.controller('usersDefaultCtrl', function($scope, $http, Datausers, Hombres, Mujeres){
	
	let sexo = localStorage.getItem('genero');
	
	if(sexo == 'Hombre') {
		Mujeres.then(function(user){
			var usersArray = user[0];
			showUser(usersArray);

		});

	} else if(sexo == 'Mujer') {
		Hombres.then(function(user){
			var usersArray = user[0];
			showUser(usersArray);
		})
		
	} else {
		Datausers.then(function(user){
			var usersArray = user[0];
			showUser(usersArray);

		});

	}


	$scope.like = function(){

		let sexo = localStorage.getItem('genero');
		
		if(sexo == 'Hombre') {
			Mujeres.then(function(user){
				var usersArray = user[0];
				showUserContinue(usersArray);
			});

		} else if(sexo == 'Mujer') {
			Hombres.then(function(user){
				var usersArray = user[0];
				showUserContinue(usersArray);
			});
		
		} else {
			var usersArray = Datausers.$$state.value[0];
			showUserContinue(usersArray);
		}



		function showUserContinue(usersArray) {
			
			let random = usersArray[Math.floor(Math.random()*usersArray.length)];
			console.log(random)
			if(localStorage.getItem('my_id') == random._id) {
		   
			} else{
				
				$scope.iduser = random._id;
				$scope.photouser = random.photo;
				$scope.nameuser = random.name.split(' ')[0] + ' ' +random.name.split(' ')[1][0];
				$scope.likeuser = random.likes;
				$scope.edad = random.info.edad;
				$scope.pais = getImagePais(random.info.pais);

				//Send Data Like
				$http({
					method: 'POST',
					url: '/save/like',
					data: {
						'id': random._id
					}
				}).then(function(data){


				}, function(err){
					console.log(err);
				})


			}

		}

		
	}

	$scope.close = function(){

		let sexo = localStorage.getItem('genero');
		
		if(sexo == 'Hombre') {
			Mujeres.then(function(user){
				var usersArray = user[0];
				showUserContinue(usersArray);
			});
			console.log('quiero mujercitas virgenes');

		} else if(sexo == 'Mujer') {
			Hombres.then(function(user){
				var usersArray = user[0];
				showUserContinue(usersArray);
			});
		
		} else {
			var usersArray = Datausers.$$state.value[0];
			showUserContinue(usersArray);
		}

		function showUserContinue(usersArray) {
			
			let random = usersArray[Math.floor(Math.random()*usersArray.length)];
			console.log(random)
			if(localStorage.getItem('my_id') == random._id) {
		   
			} else{
				
				$scope.iduser = random._id;
				$scope.photouser = random.photo;
				$scope.nameuser = random.name.split(' ')[0] + ' ' +random.name.split(' ')[1][0];
				$scope.likeuser = random.likes;
				$scope.edad = random.info.edad;
				$scope.pais = getImagePais(random.info.pais);


			}

		}

	}


	function showUser(usersArray){

		let random = usersArray[Math.floor(Math.random()*usersArray.length)];

		if(localStorage.getItem('my_id') == random._id) {

		} else{
				 $scope.iduser = random._id;
				 $scope.photouser = random.photo;
				 $scope.nameuser = random.name.split(' ')[0] + ' ' +random.name.split(' ')[1];
				 $scope.likeuser = random.likes;
				 $scope.edad = random.info.edad;
				 $scope.pais = getImagePais(random.info.pais);
		
		}

	}
    
})





function getImagePais(type) {
	switch(type) {

		case 'Argentina':
		  return ['ar.svg', type];
		case 'Bolivia':
		  return ['bo.svg', type];
		case 'Colombia':
		  return ['co.svg', type];
		case 'Chile':
		  return ['cl.svg', type];
		case 'Paraguay':
		  return ['py.svg', type];
		case 'Peru':
		  return ['pe.svg', type];
		case 'Uruguay':
		  return ['uy.svg', type];
	}
}