(function() {
    'use strict';

    angular.module('Op_Central')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'index.html',
                controller: 'HomeCtrl',
                controllerAs: 'homeCtrl'
            })
            .state('userslist', {
                url: '/userslist',
                templateUrl: 'views/users-list.html'
            })
            .state('selectedusers', {
                url: '/selectedusers',
                templateUrl: 'views/users-selected.html'
            })

            $urlRouterProvider.otherwise('/userslist');
    }
})();