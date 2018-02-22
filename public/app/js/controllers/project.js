(function () {
	'use strict';
	var app = angular.module('app.project');
	app.service('RowEditorpro', ['$http', '$rootScope', '$uibModal', function ($http, $rootScope, $uibModal) {
		var service = {};
		service.editRow = editRow;
		service.addRow = addRow;
		service.viewRow = viewRow;

		function editRow(grid, row) {
			$uibModal.open({
				templateUrl: 'app/views/project-edit.html'
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
				templateUrl: 'app/views/project-view.html'
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
				templateUrl: 'app/views/project-add.html'
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
	app.controller('projectController', ['$scope', '$http', '$uibModal', 'RowEditorpro', 'uiGridConstants', '$route', function ($scope, $http, $uibModal, RowEditorpro, uiGridConstants, $route) {
		var vm = this;
		vm.applicationType = ["Web", "Mobile"];
		vm.view = function () {
			var temp = {
				'appType': vm.appType
			}
			$http.post('/viewProject', temp).then(function (response) {
				var temparray = []
				temparray = response.data.data;
				vm.serviceGrid.data = temparray;
				vm.serviceGrid.seltype = temp.appType
			});
		};
		vm.editRow = RowEditorpro.editRow;
		vm.addRow = RowEditorpro.addRow;
		vm.viewRow = RowEditorpro.viewRow;
		vm.serviceGrid = {
			enableColumnMenus: false
			, enableRowSelection: false
			, enableRowHeaderSelection: false
			, rowTemplate: "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
		};
		vm.serviceGrid.seltype = 'None';
		vm.serviceGrid.columnDefs = [{
				name: 'Project Name'
				, field: 'projectName'
				, enableSorting: true
				, enableCellEdit: false
	}, {
				name: 'Company Name'
				, field: 'companyName'
				, enableSorting: true
				, enableCellEdit: false
	}, {
				name: 'Application Type'
				, field: 'appType'
				, enableSorting: true
				, enableCellEdit: false
	}, {
				field: "Add_Vulnerability"
				, width: 170
				, displayName: "Add Vulnerability"
				, cellTemplate: '<center><button class="btn btn-oval btn-success"  ui-sref="app.vulnerability({id:row.entity.id, appType: row.entity.appType})"  style="height: 28px;padding: 2px 23px 3px 21px;">Add Vulnerability</button></center>'
    }
			, {
				field: "View"
				, width: 100
				, displayName: "View"
				, cellTemplate: '<center><button class="btn btn-oval btn-success" ng-click="grid.appScope.vm.viewRow(grid, row)" style="height: 28px;padding: 2px 23px 3px 21px;">View</button></center>'
    }
			, {
				field: "Edit"
				, width: 100
				, displayName: "Edit"
				, cellTemplate: '<center><button class="btn btn-oval btn-success" ng-click="grid.appScope.vm.editRow(grid, row)" style="height: 28px;padding: 2px 23px 3px 21px;">Edit</button></center>'
    }];
		vm.addOwasp = function () {
			var rowTmp = {};
			var newService = {
				"projectName": ""
				, "companyName": ""
				, "appType	": ""
				, "startDate": ""
				, "endDate": ""
				, "analystName": ""
			};
			rowTmp.entity = newService;
			vm.addRow(vm.serviceGrid, rowTmp);
		};
	}]);
	app.controller('RowEditCtrl', ['$http', '$uibModalInstance', 'grid', 'row', '$window', '$state', 'Notify', function ($http, $uibModalInstance, grid, row, $window, $state, Notify) {
		var seltype = grid.seltype;
		var vm = this;
		vm.entity = angular.copy(row.entity);
		vm.save = save;
		vm.update = update;
		vm.remove = remove;
		vm.entity.applicationType = ["Web", "Mobile"];

		function save() {
			$http.post('/addProject', vm.entity).then(function (response) {
				if(response.data.status == 'True'){
					Notify.alert('Project Added Successsfully', { status: 'success' });
				}
				if (seltype == vm.entity.appType) {
					vm.entity.id = response.data.id;
					grid.data.push(vm.entity);
				}
				$uibModalInstance.close(row.entity);
			});
			$uibModalInstance.close(row.entity);
		}

		function update() {
			$http.post('/editProject', vm.entity).then(function (response) {
				if(response.data.status == 'True'){
					Notify.alert('Project Updated Successsfully', { status: 'success' });
				}
				row.entity.projectName = vm.entity.projectName;
				row.entity.companyName = vm.entity.companyName;
				row.entity.appType = vm.entity.appType;
				row.entity.startDate = vm.entity.startDate;
				row.entity.endDate = vm.entity.endDate;
				row.entity.analystName = vm.entity.analystName;
				$uibModalInstance.close(row.entity);
			});
		}

		function remove() {
			$http.post('/deleteProject', vm.entity).then(function (response) {
				if(response.data.status == 'True'){
					Notify.alert('Project Deleted Successsfully', { status: 'success' });
				}
				row.entity = angular.extend(row.entity, vm.entity);
				var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
				grid.appScope.vm.serviceGrid.data.splice(index, 1);
				$uibModalInstance.close(row.entity);
			});
		}
	}]);
})();