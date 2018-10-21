(function() {
    'use strict';
    angular.module('Op_Central')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$uibModal', 'UserService'];
    function HomeCtrl($scope, $uibModal, UserService) {
        var homeCtrl = this;
        homeCtrl.users = [];

        homeCtrl.openUsersModal = function() {
            let userAvatar = null;
            let userAvatars = [];
            UserService.fetchUsers().then(function(response) {
                var users = response.data;
                // homeCtrl.users = users;
                console.log(users);
                for (let i = 0; i < users.length; i++) {
                    let userObj = users[i];
                    UserService.fetchUserAvatar(userObj.id)
                        .then(function(response) {
                            var avatar = response;
                            if (avatar) {
                                userAvatar = new User(userObj.id, userObj.full_name, avatar.avatar)
                                console.log(userAvatar);
                                userAvatars.push(userAvatar);
                            }
                        })
                }

                homeCtrl.users = userAvatars;

                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'views/users.html',
                    backdrop: 'static',
                    windowClass: 'modal-fit',
                    scope: $scope,
                    controller: function($scope, $uibModalInstance) {
                        $scope.ok = function() {                        
                            $uibModalInstance.close();
                        };
      
                        $scope.cancel = function() {
                            $uibModalInstance.close();
                        };
                        $scope.users = homeCtrl.users;          
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