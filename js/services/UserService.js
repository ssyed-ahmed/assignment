(function() {
    'use strict';

    angular.module('Op_Central')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = this;

        service.selectedUsers = [];

        service.fetchUsers = function() {
            var promise = $http.get('../js/data/user-list.json')
                .then(function(data) {
                    return data;
                });
            return promise;
        };

        service.fetchUserAvatar = function(userId) {
            var promise = $http.get('../js/data/user-avatar.json')
                .then(function(data) {
                    let UserAvatars = data.data;
                    for (let i = 0; i < UserAvatars.length; i++) {
                        let userAvatar = UserAvatars[i];
                        if (userAvatar.id === userId) {
                            return userAvatar;
                        }
                    }
                });
            return promise;
        };

        service.getSelectedUsers = function() {
            return service.selectedUsers;
        };

        service.setSelectedUsers = function(users) {
            service.selectedUsers = users;
        };
    }
})();