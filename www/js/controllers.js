angular.module('mediApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MedisController', function($scope, $localstorage) { //Medis
    // $scope.medis = Medis.all();
    $scope.medis = $localstorage.getObject('medis');
})

.controller('AddMediController', function($scope, $localstorage){

  $scope.medis = {};

  $scope.addMedi = function(medi) {
    
    $scope.medis = medi; 

    var keygen = new Date().toISOString();

    console.log(keygen);

    $localstorage.setObject('medis', $scope.medis);
    
  // $localstorage.setObject('medis', {
  //   id: new Date().toISOString(),
  //   name: $scope.medi.name,
  //   einheit: $scope.medi.einheit,
  //   anwendungsform: $scope.medi.anwendungsform,
  //   packungsgroesse: $scope.medi.packungsgroesse,
  //   rezeptpflichtig: $scope.medi.rezeptpflichtig,
  //   rezeptende: $scope.medi.rezeptende
  // });
  };
})

// .controller('MediController', function($scope, $stateParams, Medis) {
//   $scope.medi = Medis.get($stateParams.mediId);
// });
