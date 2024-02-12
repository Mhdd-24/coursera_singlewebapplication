(function () {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function () {
      // Implement logic to fetch categories from REST API
      var url = 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json';

      return $http.get(url);
    };

    service.getItemsForCategory = function (categoryShortName) {
      // Implement logic to fetch items for a category from REST API
      var url = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' + categoryShortName + '.json';

      return $http.get(url);
    };
  }
})();
