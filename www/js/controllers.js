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

//templeate medis.html (Liste)
.controller('MedisController', function($scope, $localstorage) {

    if($localstorage.getObject('medis') !== [] ) {

        $scope.medis = $localstorage.getObject('medis');
    
    //kommt nicht auf else Block
    } else {

        $scope.medis = $localstorage.initialData();
        console.log('keine medis');
    }

    console.log($scope.medis);
})

.controller('AddMediController', function($scope, $localstorage) {

    //vorhandene Objekte im "medis" Array in Variable speichern
    var existMedis = $localstorage.getObject('medis') || [];

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

    //***************Einzelnes Medi anzeigen********************************
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
    console.log($stateParams.mediId);

    $scope.checkTag = {
        Montag : true,
        Dienstag : true,
        Mittwoch : true,
        Donnerstag : true,
        Freitag : true,
        Samstag : true,
        Sonntag : true
    };

    $scope.zeiten = [
    {zeitD: '00:00', zeitE: '00-00'},
    {zeitD: '00:30', zeitE: '00-30'},
    {zeitD: '01:00', zeitE: '01-00'},
    {zeitD: '01:30', zeitE: '01-30'},
    {zeitD: '02:00', zeitE: '02-00'},
    {zeitD: '02:30', zeitE: '02-30'},
    {zeitD: '03:00', zeitE: '03-00'},
    {zeitD: '03:30', zeitE: '03-30'},
    {zeitD: '04:00', zeitE: '04-00'},
    {zeitD: '04:30', zeitE: '04-30'},
    {zeitD: '05:00', zeitE: '05-00'},
    {zeitD: '05:30', zeitE: '05-30'},
    {zeitD: '06:00', zeitE: '06-00'},
    {zeitD: '06:30', zeitE: '06-30'}
    ];

    $scope.myDay = $scope.zeiten[0];


    //****************Medi löschen**********************
    //http://stackoverflow.com/questions/8127075/localstorage-json-how-can-i-delete-only-1-array-inside-a-key-since-localstora
    $scope.deleteMedi = function(mediId) {

        var medis = $localstorage.getObject('medis');

        for (var i = 0; i < medis.length; i++) {
            if (medis[i].id === $stateParams.mediId) {
                medis.splice(i, 1);
                return $localstorage.setObject('medis', medis);
            }
        }
        // return null
        // $scope.medis = $localstorage.getObject('medis');
        // console.log($scope.medis);

        // //entsprechendes objekt im medi-array kann nicht identifiziert werden
        // var index = $scope.medis.indexOf();
        // console.log(index);

        // console.log($scope.medi);
        // $scope.thisMedi = $scope.medi;
        // console.log($scope.thisMedi);
        // var index = $scope.thisMedi.indexOf($stateParams.mediId);

        // var existMedis = $localstorage.getObject('medis');

        // var index = existMedis.indexOf($stateParams.mediId);

        // console.log(index);

        // if (index > -1) {
        //     var newMedis = existMedis.splice(index, 1);

        //     console.log(newMedis);

        //     $localstorage.setObject('medis', newMedis);
        // } else {
        //     localStorage.removeItem('medis');
        // }

    };
  });


