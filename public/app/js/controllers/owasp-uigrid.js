(function () {
	'use strict';
	var app = angular.module('app.owasp');
	app.service('RowEditor', ['$http', '$rootScope', '$uibModal', function ($http, $rootScope, $uibModal) {
		var service = {};
		service.editRow = editRow;
		service.addRow = addRow;
		service.viewRow = viewRow;

		function editRow(grid, row) {
			$uibModal.open({
				templateUrl: 'app/views/owasp-edit.html'
				, controller: 'RowEditCtrl'
				, controllerAs: 'vm'
				, resolve: {
					grid: function () {
						return grid;
					}
					, row: function () {
						return row;
					}
				}
			});
		}

		function viewRow(grid, row) {
			$uibModal.open({
				templateUrl: 'app/views/owasp-view.html'
				, controller: 'RowEditCtrl'
				, controllerAs: 'vm'
				, resolve: {
					grid: function () {
						return grid;
					}
					, row: function () {
						return row;
					}
				}
			});
		}

		function addRow(grid, row) {
			$uibModal.open({
				templateUrl: 'app/views/owasp-add.html'
				, controller: 'RowEditCtrl'
				, controllerAs: 'vm'
				, resolve: {
					grid: function () {
						return grid;
					}
					, row: function () {
						return row;
					}
				}
			});
		}
		return service;
	}]);
	app.controller('OwaspController', ['$scope', '$http', '$uibModal', 'RowEditor', 'uiGridConstants', '$route', function ($scope, $http, $uibModal, RowEditor, uiGridConstants, $route) {
		var vm = this;
		vm.applicationType = ["Web", "Mobile"];
		vm.view = function () {
			var temp = {
				'appType': vm.appType
			}
			$http.post('/viewOwasp', temp).then(function (response) {
				var temparray = []
				temparray = response.data.data;
				vm.serviceGrid.data = temparray;
				vm.serviceGrid.seltype = temp.appType
			});
		};
		vm.editRow = RowEditor.editRow;
		vm.addRow = RowEditor.addRow;
		vm.viewRow = RowEditor.viewRow;
		vm.serviceGrid = {
			enableColumnMenus: false,
			enableRowSelection: false
			, enableRowHeaderSelection: false			
			, rowTemplate: "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
		};
		vm.serviceGrid.seltype = 'None';
		vm.serviceGrid.columnDefs = [{
			name: 'Vulnerability Name'
			, field: 'vulName'
			, enableSorting: false
			, enableCellEdit: false
	}, {
			name: 'Application Name'
			, field: 'appType'
			, enableSorting: false
			, enableCellEdit: false
	}, {
			name: 'Owasp Name'
			, field: 'owaspName'
			, enableSorting: false
			, enableCellEdit: false
	}, 
	{
            field: "View",
            width: 100,
            displayName: "View",
            cellTemplate: '<center><button class="btn btn-oval btn-success" ng-click="grid.appScope.vm.viewRow(grid, row)" style="height: 28px;padding: 2px 23px 3px 21px;">View</button></center>'
    },
    {
            field: "Edit",
            width: 100,            
            displayName: "Edit",
            cellTemplate: '<center><button class="btn btn-oval btn-success" ng-click="grid.appScope.vm.editRow(grid, row)" style="height: 28px;padding: 2px 23px 3px 21px;">Edit</button></center>'
    }];
		vm.addOwasp = function () {
			var rowTmp = {};
			var newService = {
				"vulName": ""
				, "appType": ""
				, "owaspName": ""
				, "vulDetail": ""
				, "vulRecommend": ""
			};
			rowTmp.entity = newService;
			vm.addRow(vm.serviceGrid, rowTmp);
		};
	}]);
	app.controller('RowEditCtrl', ['$http', '$uibModalInstance', 'grid', 'row', '$window', '$state','Notify', function ($http, $uibModalInstance, grid, row, $window, $state, Notify) {
		var seltype = grid.seltype;
		var vm = this;
		vm.entity = angular.copy(row.entity);
		vm.save = save;
		vm.update = update;
		vm.remove = remove;
		vm.entity.applicationType = ["Web", "Mobile"];

		function save() {
			$http.post('/addOwasp', vm.entity).then(function (response) {
				if(response.data.status == 'True'){
					Notify.alert('Owasp Data Added Successful', { status: 'success' });
				}


				if(seltype == vm.entity.appType){
					vm.entity.id = response.data.id;
				grid.data.push(vm.entity);
			}			
				$uibModalInstance.close(row.entity);				
			});
			$uibModalInstance.close(row.entity);
		}

		function update() {			
			$http.post('/editOwasp', vm.entity).then(function (response) {
				if(response.data.status == 'True'){
					Notify.alert('Owasp Data Updated Successful', { status: 'success' });
				}
				row.entity.appType = vm.entity.appType;
				row.entity.owaspName = vm.entity.owaspName;
				row.entity.vulDetail = vm.entity.vulDetail;
				row.entity.vulName = vm.entity.vulName;
				row.entity.vulRecommend = vm.entity.vulRecommend;
				$uibModalInstance.close(row.entity);
			});			
		}
		
		function remove() {			
			$http.post('/deleteOwasp', vm.entity).then(function (response) {
				if(response.data.status == 'True'){
					Notify.alert('Owasp Data Deleted Successful', { status: 'success' });
				}
				row.entity = angular.extend(row.entity, vm.entity);
				var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
				grid.appScope.vm.serviceGrid.data.splice(index, 1);		
				$uibModalInstance.close(row.entity);		
			});			
		}
	}]);
})();