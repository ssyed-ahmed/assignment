(function() {
    'use strict';

    angular.module('Op_Central')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = this;

        service.fetchUsers = function() {
            var promise = $http.get('../js/data/user-list.json')
                .then(function(data) {
                    return data;
                });
            return promise;
        }
    }
})();