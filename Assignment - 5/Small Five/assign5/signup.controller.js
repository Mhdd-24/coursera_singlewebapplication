// signup.controller.js
(function () {
  angular.module('yourApp').controller('SignupController', SignupController);

  SignupController.$inject = ['$scope', '$http', 'YourService'];

  function SignupController($scope, $http, YourService) {
    $scope.formData = {};
    $scope.menuNotExist = false;
    $scope.infoSaved = false;

    $scope.submitForm = function () {
      // Reset error flags
      $scope.menuNotExist = false;
      $scope.infoSaved = false;

      // Validate form fields using AngularJS validation
      if ($scope.signupForm.$invalid) {
        // Form is invalid, don't proceed
        return;
      }

      // If validation is successful:
      YourService.checkMenuNumber($scope.formData.menuNumber)
        .then(function (response) {
          if (response.data) {
            // Save user's preference
            YourService.saveUserPreference($scope.formData);
            $scope.infoSaved = true;
          } else {
            $scope.menuNotExist = true;
          }
        })
        .catch(function (error) {
          console.error('Error checking menu number:', error);
        });
    };
  }
})();
