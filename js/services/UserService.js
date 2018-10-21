(function() {
    'use strict';

    angular.module('Op_Central')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = this;

        service.fetchUsers = function() {
            
        }
    }
})();