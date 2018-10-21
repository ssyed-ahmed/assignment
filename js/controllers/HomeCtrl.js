(function() {
    'use strict';
    angular.module('Op_Central')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$uibModal', 'UserService'];
    function HomeCtrl($scope, $uibModal, UserService) {
        var homeCtrl = this;
        homeCtrl.users = [];

        homeCtrl.openUsersModal = function() {
            UserService.fetchUsers().then(function(response) {
                var users = response.data;
                homeCtrl.users = users;

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
    }
})();