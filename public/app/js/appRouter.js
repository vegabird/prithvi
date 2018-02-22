(function () {
	'use strict';
	angular.module('app.routes').config(routesConfig);
	routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];

	function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {		
		
		$locationProvider.html5Mode(false);
		
		$urlRouterProvider.otherwise('/app/dashboard');
		
		
		$stateProvider.state('app', {
			url: '/app'
			, abstract: true
			, templateUrl: helper.basepath('app.html')
			, resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'easypiechart', 'toaster', 'whirl')
		}).state('app.dashboard', {
			url: '/dashboard'
			, title: 'Dashboard'
			, templateUrl: helper.basepath('dashboard.html')
			, resolve: {
				deps: ['$ocLazyLoad', '$$animateJs'					
					, function ($ocLazyLoad) {
						return $ocLazyLoad.load('ui.grid').then(function () {
							return $ocLazyLoad.load('app/js/controllers/dashboard.js');
						})
                        }
                    ]
			}
			
		}).state('app.owasp', {
			url: '/owasp'
			, templateUrl: helper.basepath('owasp-uigrid.html')
			, resolve: {
				deps: ['$ocLazyLoad', '$$animateJs'					
					, function ($ocLazyLoad) {
						return $ocLazyLoad.load('ui.grid').then(function () {
							return $ocLazyLoad.load('app/js/controllers/owasp-uigrid.js');
						})
                        }
                    ]
			}
		})

        .state('app.vulnerability', {
			url: '/vulnerability/:id/:appType'
			, templateUrl: helper.basepath('vulnerability.html')
			, resolve: {
				deps: ['$ocLazyLoad', '$$animateJs'					
					, function ($ocLazyLoad) {
						return $ocLazyLoad.load(['ui.grid', 'ng-file-upload']).then(function () {
							return $ocLazyLoad.load('app/js/controllers/vulnerability.js');
						})
                        }
                    ]
			}
		})

		.state('app.project', {
			url: '/project'
			, templateUrl: helper.basepath('project.html')
			, resolve: {
				deps: ['$ocLazyLoad', '$$animateJs'					
					, function ($ocLazyLoad) {
						return $ocLazyLoad.load('ui.grid').then(function () {
							return $ocLazyLoad.load('app/js/controllers/project.js');
						})
                        }
                    ]
			}
		})

		.state('app.setting', {
			url: '/setting'
			, templateUrl: helper.basepath('setting.html')
			, resolve: {
				deps: ['$ocLazyLoad', '$$animateJs'					
					, function ($ocLazyLoad) {
						return $ocLazyLoad.load('ng-file-upload').then(function () {
							return $ocLazyLoad.load('app/js/controllers/setting.js');
						})
                        }
                    ]
			}
		})

	} // routesConfig
})();