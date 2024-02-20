(function () {
  angular.module('yourApp').controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['$scope', 'YourService'];

  function MyInfoController($scope, YourService) {
    $scope.userRegistered = YourService.isUserRegistered();
    $scope.userPreference = YourService.getUserPreference();

    // If the user is registered, retrieve detailed menu item information
    if ($scope.userRegistered) {
      YourService.checkMenuNumber($scope.userPreference.menuNumber)
        .then(function (response) {
          if (response.data) {
            // Update properties with detailed menu item information
            $scope.menuItemImageUrl = response.data.image_url;
            $scope.menuItemTitle = response.data.title;
            $scope.menuItemDescription = response.data.description;
          } else {
            console.error('No such menu number exists');
          }
        })
        .catch(function (error) {
          console.error('Error checking menu number:', error);
        });
    }
  }
})();