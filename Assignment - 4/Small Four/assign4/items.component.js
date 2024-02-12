(function () {
  'use strict';

  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'items.template.html',
      controller: ItemsController,
      bindings: {
        categoryShortName: '<'
      }
    });

  ItemsController.$inject = ['MenuDataService'];
  function ItemsController(MenuDataService) {
    var $ctrl = this;
    $ctrl.items = [];

    // Fetch and display items for the specified category
    $ctrl.$onInit = function () {
      if ($ctrl.categoryShortName) {
        MenuDataService.getItemsForCategory($ctrl.categoryShortName)
          .then(function (response) {
            $ctrl.items = response.data.menu_items;
          })
          .catch(function (error) {
            console.error('Error fetching items:', error);
          });
      }
    };
  }
})();
