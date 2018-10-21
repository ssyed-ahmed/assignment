(function() {
    'use strict';
    angular.module('Op_Central')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$uibModal', 'UserService', '$filter'];
    function HomeCtrl($scope, $uibModal, UserService, $filter) {
        var homeCtrl = this;
        homeCtrl.data = [];
        homeCtrl.users = [];
        homeCtrl.selectedUsers = [];

        homeCtrl.openUsersModal = function() {
            let userAvatar = null;
            let data = [];
            let userAvatars = [];
            UserService.fetchUsers().then(function(response) {
                var users = response.data;
                for (let i = 0; i < users.length; i++) {
                    let userObj = users[i];
                    UserService.fetchUserAvatar(userObj.id)
                        .then(function(response) {
                            var avatar = response;
                            if (avatar) {
                                userAvatar = new User(userObj.id, userObj.full_name, avatar.avatar)
                                userAvatars.push(userAvatar);
                            }
                        })
                }

                homeCtrl.data = userAvatars;
                homeCtrl.users = userAvatars;

                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'views/users.html',
                    backdrop: 'static',
                    windowClass: 'modal-fit',
                    scope: $scope,
                    controller: function($scope, $uibModalInstance) {
                        $scope.users = homeCtrl.users;
                        $scope.selection = [];
                        $scope.searchTerm = '';
                        $scope.ok = function() {      
                            console.log(homeCtrl.selectedUsers);
                            $uibModalInstance.close();                        
                        };      
                        $scope.cancel = function() {
                            homeCtrl.selectedUsers = [];
                            $uibModalInstance.close();
                        };
                        $scope.toggle = function(user) {
                            user.selected = !user.selected;
                            if (user.selected) {
                                homeCtrl.selectedUsers.push(user);
                            }
                        };
                        $scope.filterUsers = function() {
                            $scope.users = $filter('filter')(homeCtrl.data, $scope.searchTerm);
                        };
                    }
                  });
            });            
        };

        function User(id, name, avatar) {
            this.id = id;
            this.name = name;
            this.avatar = avatar;
        }
    }
})();