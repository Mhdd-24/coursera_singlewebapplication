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
        template: '<categories categories-list="$resolve.categories"></categories>',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories().then(function (response) {
              return response.data;
            });
          }]
        }
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        template: '<items items-list="$resolve.items"></items>',
        resolve: {
          items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName).then(function (response) {
              return response.data.menu_items;
            });
          }]
        }
      });
  }

})();