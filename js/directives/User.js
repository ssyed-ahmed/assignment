(function() {
    'use strict';

    angular.module('Op_Central')
        .directive('user', function() {
            var ddo = {
                restrict: 'E',
                templateUrl: 'views/user.html',
                replace: true
            }
            return ddo;
        });
})();
