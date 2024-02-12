(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'categories.template.html',
      controller: CategoriesController
    });

  CategoriesController.$inject = ['MenuDataService'];
  function CategoriesController(MenuDataService) {
    var $ctrl = this;
    $ctrl.categories = [];

    // Fetch and display categories
    $ctrl.$onInit = function () {
      MenuDataService.getAllCategories()
        .then(function (response) {
          $ctrl.categories = response.data;
        })
        .catch(function (error) {
          console.error('Error fetching categories:', error);
        });
    };
  }
})();
