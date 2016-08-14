//clientApp Application
var app = angular.module('clientApp', ['ngAnimate', 'ui.bootstrap']);

app.controller('clientAppController', ['$scope', '$uibModal', function($scope, $uibModal){

	//Get client list, if not initialize
	if (localStorage.getItem('ClientList')!==null) {
		$scope.clients = JSON.parse(localStorage.getItem('ClientList'));
	} else {
		$scope.clients = [];
	}
	
	//Open the Client form Modal
	$scope.open = function(){
		var modalInstance = $uibModal.open({
			templateUrl: 'modal/clientform.html',
			controller: 'ModalController',
			scope: $scope
		});
    
		modalInstance.result.then(function(response){
			$scope.clients = response;
		});
	};

}]);

app.controller('ModalController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
	
	//Form Submit handler
	$scope.submit = function(){
		//Addiing new Client
		$scope.date = new Date();
		$scope.clients.push({Date:$scope.date, Name:$scope.name, Email:$scope.email});
		
		//Local storage setup 
		localStorage.setItem('ClientList', JSON.stringify($scope.clients));
		
		//Close modal after submit
		$uibModalInstance.close($scope.clients);
	};
  
	//Form cancel Handler
	$scope.cancel = function() {
		$uibModalInstance.dismiss('Cancel');
	};
  
}]);
 