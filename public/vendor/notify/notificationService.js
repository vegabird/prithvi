(function(){
    'use strict';
    var app = angular.module('angle');
app.service('Notify', ['$timeout', function($timeout) {
        // .service('Notify', Notify);

        //     Notify.$inject = ['$timeout'];
        //     function Notify($timeout) {

        this.alert = notifyAlert;

        ////////////////

        function notifyAlert(msg, opts) {
            if (msg) {
                $timeout(function() {
                    $.notify(msg, opts || {});
                });
            }
        }
    }]);
})();