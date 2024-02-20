(function () {
  angular.module('yourApp').service('YourService', YourService);

  YourService.$inject = ['$http', '$localStorage'];

  function YourService($http, $localStorage) {
    var userPreference = $localStorage.userPreference || null;

    this.checkMenuNumber = function (menuNumber) {
      return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/' + menuNumber + '.json');
    };

    this.saveUserPreference = function (formData) {
      userPreference = formData;
      $localStorage.userPreference = formData;
    };

    this.isUserRegistered = function () {
      return userPreference !== null;
    };
  }
})();