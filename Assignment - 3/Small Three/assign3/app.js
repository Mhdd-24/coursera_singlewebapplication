(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;
    narrowCtrl.searchTerm = '';
    narrowCtrl.found = [];

    narrowCtrl.narrowItDown = function () {
      if (narrowCtrl.searchTerm.trim() === '') {
        narrowCtrl.found = [];
        return;
      }

      MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
        .then(function (result) {
          narrowCtrl.found = result;
        });
    };

    narrowCtrl.removeItem = function (index) {
      narrowCtrl.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      }).then(function (result) {
        var foundItems = [];

        // Process result and keep items that match
        var menuItems = result.data.menu_items;
        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(menuItems[i]);
          }
        }

        // Return processed items
        return foundItems;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }
})();
