(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>Welcome to our Restaurant</h1>'
      })
      .state('categories', {
        url: '/categories',
        template: '<categories></categories>'
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        template: '<items category-short-name="$resolve.categoryShortName"></items>',
        resolve: {
          categoryShortName: ['$stateParams', function ($stateParams) {
            return $stateParams.categoryShortName;
          }]
        }
      });
  }
})();
