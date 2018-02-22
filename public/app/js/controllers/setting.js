(function () {
	'use strict';
	var app = angular.module('app.setting');	
	app.controller('settingController', ['$scope', '$http', 'Upload', '$timeout', 'Notify', function ($scope, $http, Upload, $timeout, Notify) {

		$scope.uploadPic = function(file) {			
    file.upload = Upload.upload({
      url: '/setCon',
      data: {companyName: $scope.companyName, companyLogo: file},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;

          Notify.alert('Configuration Successful', { status: 'success' });
        
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }

    $http.get('/getCon').then(function (response) {      
      $scope.companyName1 = response.data.data[0].company_name;
      $scope.imgpath = response.data.data[0].company_logo;
      console.log($scope.imgpath);
    });

	}]);	
})();