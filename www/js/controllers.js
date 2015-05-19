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

.controller('MedisController', function($scope, $localstorage) {

    $scope.medis = [];

    $scope.medis = $localstorage.getObject('medis');
})

.controller('AddMediController', function($scope, $localstorage) {

    //vorhandene Objekte im "medis" Array in Variable speichern
    var existMedis = $localstorage.getObject('medis');

    $scope.addMedi = function(medi) {

        //Feld "id" generieren und dem "medi"-Objekt hinzufügen
        var keygen = new Date().toISOString();
        medi.id = keygen;

        //neu erzeugtes medi-Objekt ins Variable speichern
        var newMedi = medi;

        //dem medis-Array das neue Objekt hinzufügen
        existMedis.push(newMedi);

        //den ergänzten Array in den Local Storage speichern
        //"setObject ist die definierte Funktion des Services "$localstorage",
        //mit den Parametern key=medis und value=existMedis
        $localstorage.setObject('medis', existMedis);

    };
})

.controller('MediController', function($scope, $stateParams, $localstorage) {

    //ein Einzelnes Medi aus dem Objekt "medis" rauslesen
    var getMedi = function(mediId) {

        var medis = $localstorage.getObject('medis');

        for (var i = 0; i < medis.length; i++) {
            if (medis[i].id === mediId) {
                return medis[i];
            }
        }
        return null;
    };

    $scope.medi = getMedi($stateParams.mediId);

    console.log($scope.medi);

    $scope.deleteMedi = function(){

        var existMedis = $localstorage.getObject('medis');

        var index = existMedis.indexOf($stateParams.mediId);

        console.log(index);

        // if (index > -1) {
    var newMedis = existMedis.splice(index, 1);

    console.log(newMedis);

    $localstorage.setObject('medis', newMedis);
// };
         
    };

});
