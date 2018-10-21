(function() {
    'use strict';
    angular.module('Op_Central')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$uibModal'];
    function HomeCtrl($scope, $uibModal) {
        var homeCtrl = this;

        homeCtrl.openUsersModal = function() {
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
                }
              });
        };
    }
})();