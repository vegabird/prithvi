(function() {
    'use strict';
    angular.module('angle', [
        'app.core', 'app.routes', 'app.sidebar', 'app.preloader', 'app.loadingbar', 'app.translate', 'app.settings', 'app.bootstrapui', 'app.pages', 'app.tables', 'app.extras', 'app.mailbox', 'app.utils' , 'app.owasp', 'app.dashboard', 'app.project', 'app.setting', 'app.vulnerability'
    ]);
})();
(function() {
    'use strict';
    angular.module('app.bootstrapui', []);
})();

(function() {
    'use strict';
    angular.module('app.colors', []);
})();
(function() {
    'use strict';
    angular.module('app.core', [
        'ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'ngFileSaver', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize', 'ngResource', 'tmh.dynamicLocale', 'ui.utils'
    ]);
})();


(function() {
    'use strict';
    angular.module('app.extras', []);
})();



(function() {
    'use strict';
    angular.module('app.lazyload', []);
})();
(function() {
    'use strict';
    angular.module('app.loadingbar', []);
})();

(function() {
    'use strict';
    angular.module('app.mailbox', []);
})();



(function() {
    'use strict';
    angular.module('app.pages', []);
})();

(function() {
    'use strict';
    angular.module('app.preloader', []);
})();
(function() {
    'use strict';
    angular.module('app.routes', [
        'app.lazyload'
    ]);
})();
(function() {
    'use strict';
    angular.module('app.settings', []);
})();
(function() {
    'use strict';
    angular.module('app.sidebar', []);
})();
(function() {
    'use strict';
    angular.module('app.tables', []);
})();
(function() {
    'use strict';
    angular.module('app.translate', []);
})();
(function() {
    'use strict';
    angular.module('app.utils', [
        'app.colors'
    ]);
})();
(function() {
    'use strict';
    angular.module('app.owasp', []);
})();
(function() {
    'use strict';
    angular.module('app.vulnerability', []);
})();
(function() {
    'use strict';
    angular.module('app.project', []);
})();
(function() {
    'use strict';
    angular.module('app.dashboard', []);
})();
(function() {
    'use strict';
    angular.module('app.setting', []);
})();
/**=========================================================
 * Module: demo-alerts.js
 * Provides a simple demo for pagination
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('AlertDemoCtrl', AlertDemoCtrl);

    function AlertDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.alerts = [{
                type: 'danger',
                msg: 'Oh snap! Change a few things up and try submitting again.'
            }, {
                type: 'warning',
                msg: 'Well done! You successfully read this important alert message.'
            }];
            vm.addAlert = function() {
                vm.alerts.push({
                    msg: 'Another alert!'
                });
            };
            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };
        }
    }
})();
(function() {
    'use strict';
    angular.module('app.bootstrapui').config(bootstrapuiConfig);
    bootstrapuiConfig.$inject = ['$uibTooltipProvider'];

    function bootstrapuiConfig($uibTooltipProvider) {
        $uibTooltipProvider.options({
            appendToBody: true
        });
    }
})();
/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('ButtonsCtrl', ButtonsCtrl);

    function ButtonsCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.singleModel = 1;
            vm.radioModel = 'Middle';
            vm.checkModel = {
                left: false,
                middle: true,
                right: false
            };
        }
    }
})();
/**=========================================================
 * Module: demo-carousel.js
 * Provides a simple demo for bootstrap ui carousel
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('CarouselDemoCtrl', CarouselDemoCtrl);

    function CarouselDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.myInterval = 5000;
            vm.slides = [];
            vm.addSlide = function(id) {
                id = id || 8;
                vm.slides.push({
                    id: id,
                    image: 'app/img/bg' + id + '.jpg',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][vm.slides.length % 2] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][vm.slides.length % 2]
                });
            };
            vm.addSlide(4);
            vm.addSlide(7);
            vm.addSlide(8);
        }
    }
})();
/**=========================================================
 * Module: demo-datepicker.js
 * Provides a simple demo for bootstrap datepicker
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('DatepickerDemoCtrl', DatepickerDemoCtrl);

    function DatepickerDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();
            vm.clear = function() {
                vm.dt = null;
            };
            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            };
            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();
            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.opened = true;
            };
            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
        }
    }
})();
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('ModalController', ModalController);
    ModalController.$inject = ['$uibModal'];

    function ModalController($uibModal) {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.open = function(size) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/myModalContent.html',
                    controller: ModalInstanceCtrl,
                    size: size
                });
                var state = $('#modal-state');
                modalInstance.result.then(function() {
                    state.text('Modal dismissed with OK status');
                }, function() {
                    state.text('Modal dismissed with Cancel status');
                });
            };
            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.
            ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];

            function ModalInstanceCtrl($scope, $uibModalInstance) {
                $scope.ok = function() {
                    $uibModalInstance.close('closed');
                };
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        }
    }
})();
/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('PaginationDemoCtrl', PaginationDemoCtrl);

    function PaginationDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.totalItems = 64;
            vm.currentPage = 4;
            vm.setPage = function(pageNo) {
                vm.currentPage = pageNo;
            };
            vm.pageChanged = function() {
                console.log('Page changed to: ' + vm.currentPage);
            };
            vm.maxSize = 5;
            vm.bigTotalItems = 175;
            vm.bigCurrentPage = 1;
        }
    }
})();
/**=========================================================
 * Module: demo-popover.js
 * Provides a simple demo for popovers
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('PopoverDemoCtrl', PopoverDemoCtrl);

    function PopoverDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.dynamicPopover = 'Hello, World!';
            vm.dynamicPopoverTitle = 'Title';
        }
    }
})();
/**=========================================================
 * Module: demo-progress.js
 * Provides a simple demo to animate progress bar
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('ProgressDemoCtrl', ProgressDemoCtrl);

    function ProgressDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.max = 200;
            vm.random = function() {
                var value = Math.floor((Math.random() * 100) + 1);
                var type;
                if (value < 25) {
                    type = 'success';
                } else if (value < 50) {
                    type = 'info';
                } else if (value < 75) {
                    type = 'warning';
                } else {
                    type = 'danger';
                }
                vm.showWarning = (type === 'danger' || type === 'warning');
                vm.dynamic = value;
                vm.type = type;
            };
            vm.random();
            vm.randomStacked = function() {
                vm.stacked = [];
                var types = ['success', 'info', 'warning', 'danger'];
                for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
                    var index = Math.floor((Math.random() * 4));
                    vm.stacked.push({
                        value: Math.floor((Math.random() * 30) + 1),
                        type: types[index]
                    });
                }
            };
            vm.randomStacked();
        }
    }
})();
/**=========================================================
 * Module: demo-rating.js
 * Provides a demo for ratings UI
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('RatingDemoCtrl', RatingDemoCtrl);

    function RatingDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.rate = 7;
            vm.max = 10;
            vm.isReadonly = false;
            vm.hoveringOver = function(value) {
                vm.overStar = value;
                vm.percent = 100 * (value / vm.max);
            };
            vm.ratingStates = [{
                stateOn: 'fa fa-check',
                stateOff: 'fa fa-check-circle'
            }, {
                stateOn: 'fa fa-star',
                stateOff: 'fa fa-star-o'
            }, {
                stateOn: 'fa fa-heart',
                stateOff: 'fa fa-ban'
            }, {
                stateOn: 'fa fa-heart'
            }, {
                stateOff: 'fa fa-power-off'
            }];
        }
    }
})();
/**=========================================================
 * Module: demo-timepicker.js
 * Provides a simple demo for bootstrap ui timepicker
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('TimepickerDemoCtrl', TimepickerDemoCtrl);

    function TimepickerDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.mytime = new Date();
            vm.hstep = 1;
            vm.mstep = 15;
            vm.options = {
                hstep: [1, 2, 3],
                mstep: [1, 5, 10, 15, 25, 30]
            };
            vm.ismeridian = true;
            vm.toggleMode = function() {
                vm.ismeridian = !vm.ismeridian;
            };
            vm.update = function() {
                var d = new Date();
                d.setHours(14);
                d.setMinutes(0);
                vm.mytime = d;
            };
            vm.changed = function() {
                console.log('Time changed to: ' + vm.mytime);
            };
            vm.clear = function() {
                vm.mytime = null;
            };
        }
    }
})();
/**=========================================================
 * Module: demo-tooltip.js
 * Provides a simple demo for tooltip
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('TooltipDemoCtrl', TooltipDemoCtrl);

    function TooltipDemoCtrl() {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.dynamicTooltip = 'Hello, World!';
            vm.dynamicTooltipText = 'dynamic';
            vm.htmlTooltip = 'I\'ve been made <b>bold</b>!';
            vm.autoplace = function(context, source) {
                //return (predictTooltipTop(source) < 0) ?  "bottom": "top";
                var pos = 'top';
                if (predictTooltipTop(source) < 0) pos = 'bottom';
                if (predictTooltipLeft(source) < 0) pos = 'right';
                return pos;
            };
            // Predicts tooltip top position 
            // based on the trigger element
            function predictTooltipTop(el) {
                var top = el.offsetTop;
                var height = 40; // asumes ~40px tooltip height
                while (el.offsetParent) {
                    el = el.offsetParent;
                    top += el.offsetTop;
                }
                return (top - height) - (window.pageYOffset);
            }
            // Predicts tooltip top position 
            // based on the trigger element
            function predictTooltipLeft(el) {
                var left = el.offsetLeft;
                var width = el.offsetWidth;
                while (el.offsetParent) {
                    el = el.offsetParent;
                    left += el.offsetLeft;
                }
                return (left - width) - (window.pageXOffset);
            }
        }
    }
})();
/**=========================================================
 * Module: demo-typeahead.js
 * Provides a simple demo for typeahead
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.bootstrapui').controller('TypeaheadCtrl', TypeaheadCtrl);
    TypeaheadCtrl.$inject = ['$http'];

    function TypeaheadCtrl($http) {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            vm.selected = undefined;
            vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
            // Any function returning a promise object can be used to load values asynchronously
            vm.getLocation = function(val) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: val,
                        sensor: false
                    }
                }).then(function(res) {
                    var addresses = [];
                    angular.forEach(res.data.results, function(item) {
                        /*jshint -W106*/
                        addresses.push(item.formatted_address);
                    });
                    return addresses;
                });
            };
            vm.statesWithFlags = [{
                'name': 'Alabama',
                'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
            }, {
                'name': 'Alaska',
                'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'
            }, {
                'name': 'Arizona',
                'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'
            }, {
                'name': 'Arkansas',
                'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'
            }, {
                'name': 'California',
                'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'
            }, {
                'name': 'Colorado',
                'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'
            }, {
                'name': 'Connecticut',
                'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'
            }, {
                'name': 'Delaware',
                'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'
            }, {
                'name': 'Florida',
                'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'
            }, {
                'name': 'Georgia',
                'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
            }, {
                'name': 'Hawaii',
                'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'
            }, {
                'name': 'Idaho',
                'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'
            }, {
                'name': 'Illinois',
                'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'
            }, {
                'name': 'Indiana',
                'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'
            }, {
                'name': 'Iowa',
                'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'
            }, {
                'name': 'Kansas',
                'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'
            }, {
                'name': 'Kentucky',
                'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'
            }, {
                'name': 'Louisiana',
                'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'
            }, {
                'name': 'Maine',
                'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'
            }, {
                'name': 'Maryland',
                'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'
            }, {
                'name': 'Massachusetts',
                'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'
            }, {
                'name': 'Michigan',
                'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'
            }, {
                'name': 'Minnesota',
                'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'
            }, {
                'name': 'Mississippi',
                'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'
            }, {
                'name': 'Missouri',
                'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'
            }, {
                'name': 'Montana',
                'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'
            }, {
                'name': 'Nebraska',
                'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'
            }, {
                'name': 'Nevada',
                'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'
            }, {
                'name': 'New Hampshire',
                'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'
            }, {
                'name': 'New Jersey',
                'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'
            }, {
                'name': 'New Mexico',
                'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'
            }, {
                'name': 'New York',
                'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'
            }, {
                'name': 'North Carolina',
                'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'
            }, {
                'name': 'North Dakota',
                'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'
            }, {
                'name': 'Ohio',
                'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'
            }, {
                'name': 'Oklahoma',
                'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'
            }, {
                'name': 'Oregon',
                'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'
            }, {
                'name': 'Pennsylvania',
                'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'
            }, {
                'name': 'Rhode Island',
                'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'
            }, {
                'name': 'South Carolina',
                'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'
            }, {
                'name': 'South Dakota',
                'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'
            }, {
                'name': 'Tennessee',
                'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'
            }, {
                'name': 'Texas',
                'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'
            }, {
                'name': 'Utah',
                'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'
            }, {
                'name': 'Vermont',
                'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'
            }, {
                'name': 'Virginia',
                'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'
            }, {
                'name': 'Washington',
                'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'
            }, {
                'name': 'West Virginia',
                'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'
            }, {
                'name': 'Wisconsin',
                'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'
            }, {
                'name': 'Wyoming',
                'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'
            }];
        }
    }
})();

(function() {
    'use strict';
    angular.module('app.colors').constant('APP_COLORS', {
        'primary': '#5d9cec',
        'success': '#27c24c',
        'info': '#23b7e5',
        'warning': '#ff902b',
        'danger': '#f05050',
        'inverse': '#131e26',
        'green': '#37bc9b',
        'pink': '#f532e5',
        'purple': '#7266ba',
        'dark': '#3a3f51',
        'yellow': '#fad732',
        'gray-darker': '#232735',
        'gray-dark': '#3a3f51',
        'gray': '#dde6e9',
        'gray-light': '#e4eaec',
        'gray-lighter': '#edf1f2'
    });
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.colors').service('Colors', Colors);
    Colors.$inject = ['APP_COLORS'];

    function Colors(APP_COLORS) {
        this.byName = byName;
        ////////////////
        function byName(name) {
            return (APP_COLORS[name] || '#fff');
        }
    }
})();
(function() {
    'use strict';
    angular.module('app.core').config(coreConfig);
    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];

    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider) {
        var core = angular.module('app.core');
        // registering components after bootstrap
        core.controller = $controllerProvider.register;
        core.directive = $compileProvider.directive;
        core.filter = $filterProvider.register;
        core.factory = $provide.factory;
        core.service = $provide.service;
        core.constant = $provide.constant;
        core.value = $provide.value;
        // Disables animation on items with class .ng-no-animation
        $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);
        // Improve performance disabling debugging features
        // $compileProvider.debugInfoEnabled(false);
    }
})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.core').constant('APP_MEDIAQUERY', {
        'desktopLG': 1200,
        'desktop': 992,
        'tablet': 768,
        'mobile': 480
    });
})();
(function() {
    'use strict';
    angular.module('app.core').run(appRun);
    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors'];

    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
        // Hook into ocLazyLoad to setup AngularGrid before inject into the app
        // See "Creating the AngularJS Module" at
        // https://www.ag-grid.com/best-angularjs-data-grid/index.php
        var offevent = $rootScope.$on('ocLazyLoad.fileLoaded', function(e, file) {
            if (file.indexOf('ag-grid.js') > -1) {
                agGrid.initialiseAgGridWithAngular1(angular);
                offevent();
            }
        });
        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
        // Uncomment this to disable template cache
        /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
              $templateCache.remove(toState.templateUrl);
            }
        });*/
        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;
        // cancel click event easily
        $rootScope.cancel = function($event) {
            $event.stopPropagation();
        };
        // Hooks Example
        // -----------------------------------
        // Hook not found
        $rootScope.$on('$stateNotFound', function(event, unfoundState /*, fromState, fromParams*/ ) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
        // Hook error
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.log(error);
        });
        // Hook success
        $rootScope.$on('$stateChangeSuccess', function( /*event, toState, toParams, fromState, fromParams*/ ) {
            // display new view from top
            $window.scrollTo(0, 0);
            // Save the route title
            $rootScope.currTitle = $state.current.title;
        });
        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function() {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };
    }
})();






(function() {
    'use strict';
    angular.module('app.lazyload').config(lazyloadConfig);
    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];

    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES) {
        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });
    }
})();
(function() {
    'use strict';
    angular.module('app.lazyload').constant('APP_REQUIRES', {
        // jQuery based and standalone scripts
        scripts: {
            'whirl': ['vendor/whirl/dist/whirl.css'],
            'animo': ['vendor/animo.js/animo.js'],
            'fastclick': ['vendor/fastclick/lib/fastclick.js'],
            'modernizr': ['vendor/modernizr/modernizr.custom.js'],
            'animate': ['vendor/animate.css/animate.min.css'],
            'skycons': ['vendor/skycons/skycons.js'],
            'icons': ['vendor/fontawesome/css/font-awesome.min.css', 'vendor/simple-line-icons/css/simple-line-icons.css'],
            'weather-icons': ['vendor/weather-icons/css/weather-icons.min.css', 'vendor/weather-icons/css/weather-icons-wind.min.css'],
            'sparklines': ['vendor/sparkline/index.js'],
            'wysiwyg': ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js', 'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
            'slimscroll': ['vendor/slimScroll/jquery.slimscroll.min.js'],
            'screenfull': ['vendor/screenfull/dist/screenfull.js'],
            'vector-map': ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js', 'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
            'vector-map-maps': ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js', 'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
            'loadGoogleMapsJS': ['vendor/load-google-maps/load-google-maps.js'],
            'flot-chart': ['vendor/flot/jquery.flot.js'],
            'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js', 'vendor/flot/jquery.flot.resize.js', 'vendor/flot/jquery.flot.pie.js', 'vendor/flot/jquery.flot.time.js', 'vendor/flot/jquery.flot.categories.js', 'vendor/flot-spline/js/jquery.flot.spline.min.js'],
            'moment': ['vendor/moment/min/moment-with-locales.min.js'],
            'inputmask': ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
            'flatdoc': ['vendor/flatdoc/flatdoc.js'],
            'codemirror': ['vendor/codemirror/lib/codemirror.js', 'vendor/codemirror/lib/codemirror.css'], // modes for common web files
            'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js', 'vendor/codemirror/mode/xml/xml.js', 'vendor/codemirror/mode/htmlmixed/htmlmixed.js', 'vendor/codemirror/mode/css/css.js'],
            'taginput': ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css', 'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
            'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
            'morris': ['vendor/raphael/raphael.js', 'vendor/morris.js/morris.js', 'vendor/morris.js/morris.css'],
            'loaders.css': ['vendor/loaders.css/loaders.css'],
            'spinkit': ['vendor/spinkit/css/spinkit.css']
        }, // Angular based script (use the right module name)
        modules: [{
            name: 'toaster',
            files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']
        }, {
            name: 'localytics.directives',
            files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js', 'vendor/chosen_v1.2.0/chosen.min.css', 'vendor/angular-chosen-localytics/dist/angular-chosen.js'],
            serie: true
        }, {
            name: 'ngDialog',
            files: ['vendor/ngDialog/js/ngDialog.min.js', 'vendor/ngDialog/css/ngDialog.min.css', 'vendor/ngDialog/css/ngDialog-theme-default.min.css']
        }, {
            name: 'ngWig',
            files: ['vendor/ngWig/dist/ng-wig.min.js']
        }, {
            name: 'ngTable',
            files: ['vendor/ng-table/dist/ng-table.min.js', 'vendor/ng-table/dist/ng-table.min.css']
        }, {
            name: 'ngTableExport',
            files: ['vendor/ng-table-export/ng-table-export.js']
        }, {
            name: 'angularBootstrapNavTree',
            files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', 'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']
        }, {
            name: 'xeditable',
            files: ['vendor/angular-xeditable/dist/js/xeditable.js', 'vendor/angular-xeditable/dist/css/xeditable.css']
        }, {
            name: 'ng-file-upload',
            files: ['vendor/uploader/ng-file-upload-shim.min.js', 'vendor/uploader/ng-file-upload.min.js']
        }, {
            name: 'ngImgCrop',
            files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js', 'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']
        }, {
            name: 'ui.select',
            files: ['vendor/angular-ui-select/dist/select.js', 'vendor/angular-ui-select/dist/select.css']
        }, {
            name: 'ui.codemirror',
            files: ['vendor/angular-ui-codemirror/ui-codemirror.js']
        }, {
            name: 'angular-carousel',
            files: ['vendor/angular-carousel/dist/angular-carousel.css', 'vendor/angular-carousel/dist/angular-carousel.js']
        }, {
            name: 'infinite-scroll',
            files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']
        }, {
            name: 'ui.bootstrap-slider',
            files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js', 'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css', 'vendor/angular-bootstrap-slider/slider.js'],
            serie: true
        }, {
            name: 'ui.grid',
            files: ['vendor/angular-ui-grid/ui-grid.min.css', 'vendor/angular-ui-grid/ui-grid.min.js']
        }, {
            name: 'summernote',
            files: ['vendor/bootstrap/js/modal.js', 'vendor/bootstrap/js/dropdown.js', 'vendor/bootstrap/js/tooltip.js', 'vendor/summernote/dist/summernote.css', 'vendor/summernote/dist/summernote.js', 'vendor/angular-summernote/dist/angular-summernote.js'],
            serie: true
        }, {
            name: 'angular-rickshaw',
            files: ['vendor/d3/d3.min.js', 'vendor/rickshaw/rickshaw.js', 'vendor/rickshaw/rickshaw.min.css', 'vendor/angular-rickshaw/rickshaw.js'],
            serie: true
        }, {
            name: 'angular-chartist',
            files: ['vendor/chartist/dist/chartist.min.css', 'vendor/chartist/dist/chartist.js', 'vendor/angular-chartist.js/dist/angular-chartist.js'],
            serie: true
        }, {
            name: 'ui.map',
            files: ['vendor/angular-ui-map/ui-map.js']
        }, {
            name: 'datatables',
            files: ['vendor/datatables/media/css/jquery.dataTables.css', 'vendor/datatables/media/js/jquery.dataTables.js', 'vendor/datatables-buttons/js/dataTables.buttons.js', //'vendor/datatables-buttons/css/buttons.bootstrap.css',
                'vendor/datatables-buttons/js/buttons.bootstrap.js', 'vendor/datatables-buttons/js/buttons.colVis.js', 'vendor/datatables-buttons/js/buttons.flash.js', 'vendor/datatables-buttons/js/buttons.html5.js', 'vendor/datatables-buttons/js/buttons.print.js', 'vendor/angular-datatables/dist/angular-datatables.js', 'vendor/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js'
            ],
            serie: true
        }, {
            name: 'angular-jqcloud',
            files: ['vendor/jqcloud2/dist/jqcloud.css', 'vendor/jqcloud2/dist/jqcloud.js', 'vendor/angular-jqcloud/angular-jqcloud.js']
        }, {
            name: 'angularGrid',
            files: ['vendor/ag-grid/dist/styles/ag-grid.css', 'vendor/ag-grid/dist/ag-grid.js', 'vendor/ag-grid/dist/styles/theme-dark.css', 'vendor/ag-grid/dist/styles/theme-fresh.css']
        }, {
            name: 'ng-nestable',
            files: ['vendor/ng-nestable/src/angular-nestable.js', 'vendor/nestable/jquery.nestable.js']
        }, {
            name: 'akoenig.deckgrid',
            files: ['vendor/angular-deckgrid/angular-deckgrid.js']
        }, {
            name: 'oitozero.ngSweetAlert',
            files: ['vendor/sweetalert/dist/sweetalert.css', 'vendor/sweetalert/dist/sweetalert.min.js', 'vendor/angular-sweetalert/SweetAlert.js'],
            serie: true
        }, {
            name: 'bm.bsTour',
            files: ['vendor/bootstrap-tour/build/css/bootstrap-tour.css', 'vendor/bootstrap-tour/build/js/bootstrap-tour-standalone.js', 'vendor/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'],
            serie: true
        }, {
            name: 'ui.knob',
            files: ['vendor/angular-knob/src/angular-knob.js', 'vendor/jquery-knob/dist/jquery.knob.min.js']
        }, {
            name: 'easypiechart',
            files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']
        }, {
            name: 'colorpicker.module',
            files: ['vendor/angular-bootstrap-colorpicker/css/colorpicker.css', 'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']
        }, {
            name: 'ui.sortable',
            files: ['vendor/jquery-ui/jquery-ui.min.js', 'vendor/angular-ui-sortable/sortable.js'],
            serie: true
        }, {
            name: 'ui.calendar',
            files: ['vendor/jquery-ui/jquery-ui.min.js', 'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js', 'vendor/fullcalendar/dist/fullcalendar.min.js', 'vendor/fullcalendar/dist/gcal.js', 'vendor/fullcalendar/dist/fullcalendar.css', 'vendor/angular-ui-calendar/src/calendar.js'],
            serie: true
        }, {
            name: 'chart.js',
            files: ['vendor/chart.js/dist/Chart.js', 'vendor/angular-chart.js/dist/angular-chart.js'],
            serie: true
        }, ]
    });
})();
(function() {
    'use strict';
    angular.module('app.loadingbar').config(loadingbarConfig);
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];

    function loadingbarConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 500;
        cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';
    angular.module('app.loadingbar').run(loadingbarRun);
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];

    function loadingbarRun($rootScope, $timeout, cfpLoadingBar) {
        // Loading bar transition
        // ----------------------------------- 
        var thBar;
        $rootScope.$on('$stateChangeStart', function() {
            if ($('.wrapper > section').length) // check if bar container exists
                thBar = $timeout(function() {
                    cfpLoadingBar.start();
                }, 0); // sets a latency Threshold
        });
        $rootScope.$on('$stateChangeSuccess', function(event) {
            event.targetScope.$watch('$viewContentLoaded', function() {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
        });
    }
})();




/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.pages').controller('LoginFormController', LoginFormController);
    LoginFormController.$inject = ['$http', '$state'];

    function LoginFormController($http, $state) {
        var vm = this;
        activate();
        ////////////////
        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.login = function() {
                vm.authMsg = '';
                if (vm.loginForm.$valid) {
                    $http.post('api/account/login', {
                        email: vm.account.email,
                        password: vm.account.password
                    }).then(function(response) {
                        // assumes if ok, response is an object with some data, if not, a string with error
                        // customize according to your api
                        if (!response.account) {
                            vm.authMsg = 'Incorrect credentials.';
                        } else {
                            $state.go('app.dashboard');
                        }
                    }, function() {
                        vm.authMsg = 'Server Request Error';
                    });
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();


(function() {
    'use strict';
    angular.module('app.preloader').directive('preloader', preloader);
    preloader.$inject = ['$animate', '$timeout', '$q'];

    function preloader($animate, $timeout, $q) {
        var directive = {
            restrict: 'EAC',
            template: '<div class="preloader-progress">' + '<div class="preloader-progress-bar" ' + 'ng-style="{width: loadCounter + \'%\'}"></div>' + '</div>',
            link: link
        };
        return directive;
        ///////
        function link(scope, el) {
            scope.loadCounter = 0;
            var counter = 0,
                timeout;
            // disables scrollbar
            angular.element('body').css('overflow', 'hidden');
            // ensure class is present for styling
            el.addClass('preloader');
            appReady().then(endCounter);
            timeout = $timeout(startCounter);
            ///////
            function startCounter() {
                var remaining = 100 - counter;
                counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));
                scope.loadCounter = parseInt(counter, 10);
                timeout = $timeout(startCounter, 20);
            }

            function endCounter() {
                $timeout.cancel(timeout);
                scope.loadCounter = 100;
                $timeout(function() {
                    // animate preloader hiding
                    $animate.addClass(el, 'preloader-hidden');
                    // retore scrollbar
                    angular.element('body').css('overflow', '');
                }, 300);
            }

            function appReady() {
                var deferred = $q.defer();
                var viewsLoaded = 0;
                // if this doesn't sync with the real app ready
                // a custom event must be used instead
                var off = scope.$on('$viewContentLoaded', function() {
                    viewsLoaded++;
                    // we know there are at least two views to be loaded 
                    // before the app is ready (1-index.html 2-app*.html)
                    if (viewsLoaded === 2) {
                        // with resolve this fires only once
                        $timeout(function() {
                            deferred.resolve();
                        }, 3000);
                        off();
                    }
                });
                return deferred.promise;
            }
        } //link
    }
})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.routes').provider('RouteHelpers', RouteHelpersProvider);
    RouteHelpersProvider.$inject = ['APP_REQUIRES'];

    function RouteHelpersProvider(APP_REQUIRES) {
        /* jshint validthis:true */
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor, // controller access level
            $get: function() {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor
                };
            }
        };
        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return 'app/views/' + uri;
        }
        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;
                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function') return promise.then(_arg);
                        else return promise.then(function() {
                            // if is a module, pass the name. If not, pass the array
                            var whatToLoad = getRequired(_arg);
                            // simple error check
                            if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                            // finally, return a promise
                            return $ocLL.load(whatToLoad);
                        });
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules)
                            for (var m in APP_REQUIRES.modules)
                                if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name) return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }
                }]
            };
        } // resolveFor
    }
})();
/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

(function() {
    'use strict';
    angular.module('app.settings').run(settingsRun);
    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage) {
        // User Settings
        // -----------------------------------
        $rootScope.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'app/img/user/02.jpg'
        };
        // Hides/show user avatar on sidebar from any element
        $rootScope.toggleUserBlock = function() {
            $rootScope.$broadcast('toggleUserBlock');
        };
        // Global Settings
        // -----------------------------------
        $rootScope.app = {
            name: 'VegaBird',
            description: 'A Vulnerabilty Report Generation Tool',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: null,
                asideScrollbar: false,
                isCollapsedText: false
            },
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };
        // Setup the layout mode
        $rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout === 'app-h');
        // Restore layout settings
        if (angular.isDefined($localStorage.layout)) $rootScope.app.layout = $localStorage.layout;
        else $localStorage.layout = $rootScope.app.layout;
        $rootScope.$watch('app.layout', function() {
            $localStorage.layout = $rootScope.app.layout;
        }, true);
        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
            if (newValue === false) $rootScope.$broadcast('closeSidebarMenu');
        });
    }
})();
/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.sidebar').controller('SidebarController', SidebarController);
    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];

    function SidebarController($rootScope, $scope, $state, SidebarLoader, Utils) {
        activate();
        ////////////////
        function activate() {
            var collapseList = [];
            // demo: when switch from collapse to hover, close all items
            var watchOff1 = $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal) {
                if (newVal === false && oldVal === true) {
                    closeAllBut(-1);
                }
            });
            // Load menu from json file
            // -----------------------------------
            SidebarLoader.getMenu(sidebarReady);

            function sidebarReady(items) {
                $scope.menuItems = items.data;
            }
            // Handle sidebar and collapse items
            // ----------------------------------
            $scope.getMenuItemPropClasses = function(item) {
                return (item.heading ? 'nav-heading' : '') + (isActive(item) ? ' active' : '');
            };
            $scope.addCollapse = function($index, item) {
                collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
            };
            $scope.isCollapse = function($index) {
                return (collapseList[$index]);
            };
            $scope.toggleCollapse = function($index, isParentItem) {
                // collapsed sidebar doesn't toggle drodopwn
                if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;
                // make sure the item index exists
                if (angular.isDefined(collapseList[$index])) {
                    if (!$scope.lastEventFromChild) {
                        collapseList[$index] = !collapseList[$index];
                        closeAllBut($index);
                    }
                } else if (isParentItem) {
                    closeAllBut(-1);
                }
                $scope.lastEventFromChild = isChild($index);
                return true;
            };
            // Controller helpers
            // -----------------------------------
            // Check item and children active state
            function isActive(item) {
                if (!item) return;
                if (!item.sref || item.sref === '#') {
                    var foundActive = false;
                    angular.forEach(item.submenu, function(value) {
                        if (isActive(value)) foundActive = true;
                    });
                    return foundActive;
                } else return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
                index += '';
                for (var i in collapseList) {
                    if (index < 0 || index.indexOf(i) < 0) collapseList[i] = true;
                }
            }

            function isChild($index) {
                /*jshint -W018*/
                return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
            $scope.$on('$destroy', function() {
                watchOff1();
            });
        } // activate
    }
})();
/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.sidebar').directive('sidebar', sidebar);
    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];

    function sidebar($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            var currentState = $rootScope.$state.current.name;
            var $sidebar = element;
            var eventName = Utils.isTouch() ? 'click' : 'mouseenter';
            var subNav = $();
            $sidebar.on(eventName, '.nav > li', function() {
                if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {
                    subNav.trigger('mouseleave');
                    subNav = toggleMenuItem($(this), $sidebar);
                    // Used to detect click and touch events outside the sidebar
                    sidebarAddBackdrop();
                }
            });
            var eventOff1 = scope.$on('closeSidebarMenu', function() {
                removeFloatingNav();
            });
            // Normalize state when resize to mobile
            $win.on('resize.sidebar', function() {
                if (!Utils.isMobile()) asideToggleOff();
            });
            // Adjustment on route changes
            var eventOff2 = $rootScope.$on('$stateChangeStart', function(event, toState) {
                currentState = toState.name;
                // Hide sidebar automatically on mobile
                asideToggleOff();
                $rootScope.$broadcast('closeSidebarMenu');
            });
            // Autoclose when click outside the sidebar
            if (angular.isDefined(attrs.sidebarAnyclickClose)) {
                var wrapper = $('.wrapper');
                var sbclickEvent = 'click.sidebar';
                var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);
            }
            //////
            function watchExternalClicks(newVal) {
                // if sidebar becomes visible
                if (newVal === true) {
                    $timeout(function() { // render after current digest cycle
                        wrapper.on(sbclickEvent, function(e) {
                            // if not child of sidebar
                            if (!$(e.target).parents('.aside').length) {
                                asideToggleOff();
                            }
                        });
                    });
                } else {
                    // dettach event
                    wrapper.off(sbclickEvent);
                }
            }

            function asideToggleOff() {
                $rootScope.app.asideToggled = false;
                if (!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
            }
            scope.$on('$destroy', function() {
                // detach scope events
                eventOff1();
                eventOff2();
                watchOff1();
                // detach dom events
                $sidebar.off(eventName);
                $win.off('resize.sidebar');
                wrapper.off(sbclickEvent);
            });
        }
        ///////
        function sidebarAddBackdrop() {
            var $backdrop = $('<div/>', {
                'class': 'dropdown-backdrop'
            });
            $backdrop.insertAfter('.aside-inner').on('click mouseenter', function() {
                removeFloatingNav();
            });
        }
        // Open the collapse sidebar submenu items when on touch devices
        // - desktop only opens on hover
        function toggleTouchItem($element) {
            $element.siblings('li').removeClass('open').end().toggleClass('open');
        }
        // Handles hover to open items under collapsed menu
        // -----------------------------------
        function toggleMenuItem($listItem, $sidebar) {
            removeFloatingNav();
            var ul = $listItem.children('ul');
            if (!ul.length) return $();
            if ($listItem.hasClass('open')) {
                toggleTouchItem($listItem);
                return $();
            }
            var $aside = $('.aside');
            var $asideInner = $('.aside-inner'); // for top offset calculation
            // float aside uses extra padding on aside
            var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
            var subNav = ul.clone().appendTo($aside);
            toggleTouchItem($listItem);
            var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
            var vwHeight = $win.height();
            subNav.addClass('nav-floating').css({
                position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
                top: itemTop,
                bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });
            subNav.on('mouseleave', function() {
                toggleTouchItem($listItem);
                subNav.remove();
            });
            return subNav;
        }

        function removeFloatingNav() {
            $('.dropdown-backdrop').remove();
            $('.sidebar-subnav.nav-floating').remove();
            $('.sidebar li.open').removeClass('open');
        }
    }
})();
(function() {
    'use strict';
    angular.module('app.sidebar').service('SidebarLoader', SidebarLoader);
    SidebarLoader.$inject = ['$http'];

    function SidebarLoader($http) {
        this.getMenu = getMenu;
        ////////////////
        function getMenu(onReady, onError) {
            var menuJson = 'app/json/sidebar-menu.json',
                menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            onError = onError || function() {
                alert('Failure loading menu');
            };
            $http.get(menuURL).then(onReady, onError);
        }
    }
})();
(function() {
    'use strict';
    angular.module('app.sidebar').controller('UserBlockController', UserBlockController);
    UserBlockController.$inject = ['$scope'];

    function UserBlockController($scope) {
        activate();
        ////////////////
        function activate() {
            $scope.userBlockVisible = true;
            var detach = $scope.$on('toggleUserBlock', function( /*event, args*/ ) {
                $scope.userBlockVisible = !$scope.userBlockVisible;
            });
            $scope.$on('$destroy', detach);
        }
    }
})();






/**=========================================================
 * Module: UIGridController
  =========================================================*/

(function() {
    'use strict';
    angular.module('app.translate').config(translateConfig);
    translateConfig.$inject = ['$translateProvider'];

    function translateConfig($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'app/json/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useLocalStorage();
        $translateProvider.usePostCompiling(true);
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    }
})();
(function() {
    'use strict';
    angular.module('app.translate').run(translateRun);
    translateRun.$inject = ['$rootScope', '$translate'];

    function translateRun($rootScope, $translate) {
        // Internationalization
        // ----------------------
        $rootScope.language = {
            // Handles language dropdown
            listIsOpen: false, // list of available languages
            available: {
                'en': 'English',
                'es_AR': 'Español'
            }, // display always the current ui language
            init: function() {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
                $rootScope.language.selected = $rootScope.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function(localeId) {
                // Set the new idiom
                $translate.use(localeId);
                // save a reference for the current language
                $rootScope.language.selected = $rootScope.language.available[localeId];
                // finally toggle dropdown
                $rootScope.language.listIsOpen = !$rootScope.language.listIsOpen;
            }
        };
        $rootScope.language.init();
    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').directive('animateEnabled', animateEnabled);
    animateEnabled.$inject = ['$animate'];

    function animateEnabled($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(function() {
                return scope.$eval(attrs.animateEnabled, scope);
            }, function(newValue) {
                $animate.enabled(!!newValue, element);
            });
        }
    }
})();
/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').service('Browser', Browser);
    Browser.$inject = ['$window'];

    function Browser($window) {
        return $window.jQBrowser;
    }
})();
/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').directive('resetKey', resetKey);
    resetKey.$inject = ['$state', '$localStorage'];

    function resetKey($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
            element.on('click', function(e) {
                e.preventDefault();
                if (scope.resetKey) {
                    delete $localStorage[scope.resetKey];
                    $state.go($state.current, {}, {
                        reload: true
                    });
                } else {
                    $.error('No storage key specified for reset.');
                }
            });
        }
    }
})();
/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').directive('toggleFullscreen', toggleFullscreen);
    toggleFullscreen.$inject = ['Browser'];

    function toggleFullscreen(Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            // Not supported under IE
            if (Browser.msie) {
                element.addClass('hide');
            } else {
                element.on('click', function(e) {
                    e.preventDefault();
                    if (screenfull.enabled) {
                        screenfull.toggle();
                        // Switch icon indicator
                        if (screenfull.isFullscreen) $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                        else $(this).children('em').removeClass('fa-compress').addClass('fa-expand');
                    } else {
                        $.error('Fullscreen not enabled');
                    }
                });
            }
        }
    }
})();
/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').directive('loadCss', loadCss);

    function loadCss() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function(e) {
                if (element.is('a')) e.preventDefault();
                var uri = attrs.loadCss,
                    link;
                if (uri) {
                    link = createLink(uri);
                    if (!link) {
                        $.error('Error creating stylesheet link element.');
                    }
                } else {
                    $.error('No stylesheet location defined.');
                }
            });
        }

        function createLink(uri) {
            var linkId = 'autoloaded-stylesheet',
                oldLink = $('#' + linkId).attr('id', linkId + '-old');
            $('head').append($('<link/>').attr({
                'id': linkId,
                'rel': 'stylesheet',
                'href': uri
            }));
            if (oldLink.length) {
                oldLink.remove();
            }
            return $('#' + linkId);
        }
    }
})();
/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').directive('now', now);
    now.$inject = ['dateFilter', '$interval'];

    function now(dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var format = attrs.format;

            function updateTime() {
                var dt = dateFilter(new Date(), format);
                element.text(dt);
            }
            updateTime();
            var intervalPromise = $interval(updateTime, 1000);
            scope.$on('$destroy', function() {
                $interval.cancel(intervalPromise);
            });
        }
    }
})();
/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').directive('checkAll', checkAll);

    function checkAll() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            element.on('change', function() {
                var $this = $(this),
                    index = $this.index() + 1,
                    checkbox = $this.find('input[type="checkbox"]'),
                    table = $this.parents('table');
                // Make sure to affect only the correct checkbox column
                table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]').prop('checked', checkbox[0].checked);
            });
        }
    }
})();
/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').directive('triggerResize', triggerResize);
    triggerResize.$inject = ['$window', '$timeout'];

    function triggerResize($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
            element.on('click', function() {
                $timeout(function() {
                    // all IE friendly dispatchEvent
                    var evt = document.createEvent('UIEvents');
                    evt.initUIEvent('resize', true, false, $window, 0);
                    $window.dispatchEvent(evt);
                    // modern dispatchEvent way
                    // $window.dispatchEvent(new Event('resize'));
                }, attributes.triggerResize || 300);
            });
        }
    }
})();
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/
(function() {
    'use strict';
    angular.module('app.utils').service('Utils', Utils);
    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];

    function Utils($window, APP_MEDIAQUERY) {
        var $html = angular.element('html'),
            $win = angular.element($window),
            $body = angular.element('body');
        return {
            // DETECTION
            support: {
                transition: (function() {
                    var transitionEnd = (function() {
                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            },
                            name;
                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());
                    return transitionEnd && {
                        end: transitionEnd
                    };
                })(),
                animation: (function() {
                    var animationEnd = (function() {
                        var element = document.body || document.documentElement,
                            animEndEventNames = {
                                WebkitAnimation: 'webkitAnimationEnd',
                                MozAnimation: 'animationend',
                                OAnimation: 'oAnimationEnd oanimationend',
                                animation: 'animationend'
                            },
                            name;
                        for (name in animEndEventNames) {
                            if (element.style[name] !== undefined) return animEndEventNames[name];
                        }
                    }());
                    return animationEnd && {
                        end: animationEnd
                    };
                })(),
                requestAnimationFrame: window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                },
                /*jshint -W069*/
                touch: (
                    ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) || (window.DocumentTouch && document instanceof window.DocumentTouch) || (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                    (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                    false),
                mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
            }, // UTILITIES
            isInView: function(element, options) {
                /*jshint -W106*/
                var $element = $(element);
                if (!$element.is(':visible')) {
                    return false;
                }
                var window_left = $win.scrollLeft(),
                    window_top = $win.scrollTop(),
                    offset = $element.offset(),
                    left = offset.left,
                    top = offset.top;
                options = $.extend({
                    topoffset: 0,
                    leftoffset: 0
                }, options);
                if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() && left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                    return true;
                } else {
                    return false;
                }
            },
            langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',
            isTouch: function() {
                return $html.hasClass('touch');
            },
            isSidebarCollapsed: function() {
                return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
            },
            isSidebarToggled: function() {
                return $body.hasClass('aside-toggled');
            },
            isMobile: function() {
                return $win.width() < APP_MEDIAQUERY.tablet;
            }
        };
    }
})();