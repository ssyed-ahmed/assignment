(function() {
    'use strict';
    angular.module('Op_Central')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$uibModal', 'UserService', '$filter', '$state', '$stateParams', '$location'];
    function HomeCtrl($scope, $uibModal, UserService, $filter, $state) {
        var homeCtrl = this;
        homeCtrl.data = [];
        homeCtrl.users = [];
        homeCtrl.selectedUsers = [];
        homeCtrl.searchTerm = '';

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
                        }, errorHandler)
                }

                homeCtrl.data = userAvatars;
                homeCtrl.users = userAvatars;

                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'views/users-modal.html',
                    backdrop: 'static',
                    windowClass: 'modal-fit',
                    scope: $scope,
                    controller: function($scope, $uibModalInstance, UserService) {
                        $scope.users = homeCtrl.users;
                        $scope.selection = [];
                        $scope.searchTerm = '';
                        $scope.selectedusers = [];
                        $scope.ok = function() {      
                            // $uibModalInstance.close();                      
                            $scope.selectedusers = homeCtrl.selectedUsers;
                            UserService.setSelectedUsers(homeCtrl.selectedUsers);
                            $state.go('selectedusers');
                        };      
                        $scope.cancel = function() {
                            homeCtrl.selectedUsers = [];
                            $state.go('userslist');
                            $uibModalInstance.close();
                        };
                        $scope.toggle = function(user) {
                            user.selected = !user.selected;
                            if (user.selected) {
                                homeCtrl.selectedUsers.push(user);
                            } else {
                                let index = homeCtrl.selectedUsers.findIndex((obj, i) => {
                                    return userAvatar.id === obj.id? i: -1;
                                });
                                if (index != -1) {
                                    homeCtrl.selectedUsers.splice(index, 1);
                                }
                            }
                        };
                        $scope.filterUsers = function() {
                            $scope.users = $filter('filter')(homeCtrl.data, homeCtrl.searchTerm);
                        };
                        $scope.back = function() {
                            let selectedUsers = UserService.getSelectedUsers();
                            $state.go('userslist');                            
                        };
                    }
                  });
            }, errorHandler);            
        };

        function errorHandler(response) {
            // Note: For now just log the error
            console.log(response);
        };

        function User(id, name, avatar) {
            this.id = id;
            this.name = name;
            this.avatar = avatar;
        };
    }
})();