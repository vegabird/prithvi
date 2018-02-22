(function () {
	'use strict';
	var app = angular.module('app.dashboard');	
	app.controller('dashController', ['$scope', '$http', function ($scope, $http) {
		$scope.owasp = 0;
		$scope.vuln = 0;
		$scope.project = 0;		
		$http.get('/count').then(function (response) {
			console.log(response);
			$scope.owasp = response.data.data.owasp;
			$scope.vuln = response.data.data.vuln;
			$scope.project = response.data.data.project;			
		});
	}]);
})();