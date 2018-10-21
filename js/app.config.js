(function() {
    'use strict';

    angular.module('Op_Central')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        // $stateProvider
        //     .state('home', {
        //         url: '/home',
        //         templateUrl: 'views/home.html',
        //         controller: 'HomeCtrl',
        //         controllerAs: 'homeCtrl'
        //     });
        //     $urlRouterProvider.otherwise('/home');
    }
})();