(function() {
    'use strict';


    var app = angular.module('angle');


    app.directive('notify', ['$window', 'Notify', function($window, Notify) {
        // .directive('notify', notify);

        //     notify.$inject = ['$window', 'Notify'];
        //     function notify ($window, Notify) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                options: '=',
                message: '='
            }
        };
        return directive;

        function link(scope, element) {

            element.on('click', function(e) {
                e.preventDefault();
                Notify.alert(scope.message, scope.options);
            });
        }

    }]);
})();