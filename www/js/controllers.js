angular.module('mediApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/addMedi.html', {
        // $ionicModal.fromTemplateUrl('templates/login.html', {
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
.controller('MedisController', function($scope, $localstorage, $interval) {

    if ($localstorage.getObject('medis') !== []) {

        $scope.medis = $localstorage.getObject('medis');

        //kommt nicht auf else Block
    } else {

        $scope.medis = $localstorage.initialData();
        console.log('keine medis');
    }

    //initial Datum holen
    $scope.date = moment().format('dddd h:mm');
    console.log('inizial:' + $scope.date);

    // jede Minute Datum holen
    $scope.holeDatum = function() {
        $scope.date = moment().format('dddd h:mm');
        console.log('jede Minute:' + $scope.date);
    }

    $interval(function() {
        $scope.holeDatum();
    }, 60000, 0);
})

.controller('AddMediController', function($scope, $localstorage, Timer) {

    //vorhandene Objekte im "medis" Array in Variable speichern
    var existMedis = $localstorage.getObject('medis') || [];

    //zeiten aus Servece um im select anzuzeigen
    $scope.zeiten = Timer.alleZeiten();

    $scope.timers = [];

    $scope.addMedi = function(medi) {

        //Feld "id" generieren und dem "medi"-Objekt hinzufügen
        var keygen = new Date().toISOString();
        medi.id = keygen;

        //neu erzeugtes medi-Objekt als Variable speichern
        var newMedi = medi;

        //dem medis-Array das neue Objekt hinzufügen
        existMedis.push(newMedi);

        //den ergänzten Array in den Local Storage speichern
        //"setObject ist die definierte Funktion des Services "$localstorage",
        //mit den Parametern key=medis und value=existMedis
        $localstorage.setObject('medis', existMedis);

    };

})

.controller('MediController', function($scope, $stateParams, $localstorage, Timer) {

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

    //********************Timer zu Medi hinzufügen***********************

    // $scope.timers = [{}];

    //Tage aus Service
    // $scope.tage = Timer.alleTage();

    //zeiten aus Servece
    // $scope.zeiten = Timer.alleZeiten();

    //Vorausgewählte Zeit
    // $scope.timers.zeiten = ['06:30'];

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

    };
});

//Zeiten für Timer-Formulsr
// $scope.zeiten = [{
//     zeitD: '00:00',
//     zeitE: '00-00'
// }, {
//     zeitD: '00:30',
//     zeitE: '00-30'
// }, {
//     zeitD: '01:00',
//     zeitE: '01-00'
// }, {
//     zeitD: '01:30',
//     zeitE: '01-30'
// }];


// $scope.timers.tage = {
//         'Monday':true,
//         'Tuesday':true,
//         'Wednesday':true,
//         'Thursday':true,
//         'Friday':true,
//         'Saturday':true,
//         'Sunday':true
// };

// $scope.zeiten = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30'];

// $scope.tage = [{
//     'tagD': 'Montag',
//     'tagE': 'Monday'
// }, {
//     'tagD': 'Dienstag',
//     'tagE': 'Tuesday'
// }, {
//     'tagD': 'Mittwoch',
//     'tagE': 'Wednesday'
// }, {
//     'tagD': 'Donnerstag',
//     'tagE': 'Thursday'
// }, {
//     'tagD': 'Freitag',
//     'tagE': 'Friday'
// }, {
//     'tagD': 'Samstag',
//     'tagE': 'Saturday'
// }, {
//     'tagD': 'Sonntag',
//     'tagE': 'Sunday'
// }];

//Vorausgewählte Zeit
// $scope.timers = [{}];
// $scope.timers.zeiten = ['06:30'];
