angular.module('mediApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localstorage, $interval, Timer, $window) {
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

    //initial Datum holen
    $scope.date = moment().format('dddd HH:mm');
    console.log('inizial:' + $scope.date);

    // jede Minute Datum holen
    $scope.holeDatum = function() {
        $scope.date = moment().format('dddd HH:mm');
        console.log('jede Minute:' + $scope.date);
    }


    var compareTimer = function() {

        var sysTimer = $scope.date;
        var userTimers = $scope.timerData;

        for (var i = 0; i < userTimers.length; i++) {
            if (userTimers[i].timer == sysTimer) {

                var userTimer = JSON.stringify(userTimers[i], ['name', 'menge']);
                console.log(userTimer);
                $window.confirm('Es ist Zeit ' + JSON.stringify(userTimers[i].menge) + ' ' + JSON.stringify(userTimers[i].anwendungsform) + ' des Meikaments ' + JSON.stringify(userTimers[i].name) + ' einzunehmen, Info: ' + JSON.stringify(userTimers[i].info));
                // return userTimers[i];
                //variable ausserhalb der Funktion nicht verwendbar
                return userTimer;
            }
        }
        return null;
    }

    $interval(function() {
        $scope.holeDatum();
        $scope.userTimer = compareTimer();
        // nach OK von $window.confirm wird wert zurückgegeben
        console.log($scope.userTimer);
    }, 60000, 0);

    //Local Storage Array "medis" holen, um in gewünschtes Format umzuwandeln
    //************************************************************************

    var medis = $localstorage.getObject('medis');
    console.log(medis);

    //je array in medi folgenden prozess ausführen:
    for (i = 0; i < medis.length; i++) {

        //object tage und array zeiten gemäss allgorythmus mergen

        //isoliere tage object
        tage = medis[i].timers.tage;

        //mache aus tage object ein array nur mit den werten
        tage = Object.keys(tage).map(function(k) {
            return tage[k];
        });

        //enferne falsy values aus tage array
        function cleanArray(tage) {
            var newArray = new Array();
            for (var i = 0; i < tage.length; i++) {
                if (tage[i]) {
                    newArray.push(tage[i]);
                }
            }
            return newArray;
        }
        tage = cleanArray(tage);
        console.log(tage);

        //isoliere zeiten array
        var zeiten = medis[i].timers.zeiten;
        console.log(zeiten);

        //Schritt 3.1: die zwei arrays in gewünschter weise kombinieren und neu anordnen

        //den array tage soviel mal kopieren wie entsprechende Zeiten
        function combiArray(zeiten, tage) {
            var newArray = [];
            for (var i = 0; i < zeiten.length; i++) {
                if (zeiten[i]) {
                    newArray.push(tage);
                }
            }
            return newArray;
        }
        var combiTage = combiArray(zeiten, tage);
        console.log(combiTage);

        //die Zeiten den tages-arrays hinzufügen
        function mergeArray(combiTage, zeiten) {
            var advancedArray = [];
            for (var i = 0; i < combiTage.length; i++) {
                var innerArray = combiTage[i];
                for (var j = 0; j < innerArray.length; j++) {
                    for (var z = 0; z < zeiten.length; z++) {
                        advancedArray.push(innerArray[j]);
                        advancedArray.push(zeiten[z]);
                    }
                }
            }
            return advancedArray;
        }
        var tagesZeiten = mergeArray(combiTage, zeiten);

        //tagesZeiten auf einzelne arrays verteilen
        function spliceArr(tagesZeiten) {
            var newArray = [];
            while (tagesZeiten.length > 0) {
                newArray.push(tagesZeiten.splice(0, 2));
            }
            return newArray;
        }
        tagesZeiten = spliceArr(tagesZeiten);

        //duplikate entfernen (liesse sich evtl. auch vermeiden durch verbesserung von funktion mergeArray)
        function uniqBy(tagesZeiten, key) {
            var seen = {};
            return tagesZeiten.filter(function(item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
            })
        }
        tagesZeiten = uniqBy(tagesZeiten, JSON.stringify);

        //tagesZeiten in strings umwandeln und in neuem array speichern
        function arrToString(tagesZeiten) {
            newArray = [];
            for (i = 0; i < tagesZeiten.length; i++) {
                newArray.push(tagesZeiten[i].join(' '));
            }
            return newArray;
        }
        tagesZeiten = arrToString(tagesZeiten);
        console.log(tagesZeiten);

    }

        //Alle Key-Value Paare, die nicht gebraucht werden entfernen
    function delProps(medis) {

        for (i = 0; i < medis.length; i++) {
            var newMediObj = medis[i];

            delete newMediObj.einheit;
            delete newMediObj.menge;
            delete newMediObj.packungsgroesse;
            delete newMediObj.rezeptpflichtig;
            delete newMediObj.rezeptende;
            delete newMediObj.timers.tage;
            delete newMediObj.timers.zeiten;
        }

        return newMediObj;
    }
    var newMediObj = delProps(medis);
    console.log(newMediObj);

    
    

    //neues Objekt generieten, 
    var newTimerData = [];

    for (i = 0; i < tagesZeiten.length; i++) {
        newTimerData[i] = {
            timer: tagesZeiten[i],
            id: medis.id,
        }
    }
    console.log(newTimerData);



    //Fake timerData aus service 
    $scope.timerData = Timer.timerData();
    console.log($scope.timerData);

})

//templeate medis.html (Liste)
.controller('MedisController', function($scope, $localstorage, $interval, $window) {

    //teste ob key "medis" im Local Storage vorhanden ist
    if (localStorage['medis'] === undefined) {
        //wenn nicht speichere initial Daten
        $localstorage.setInitialData('medis');
        //zeige inizial Daten an
        $scope.medis = $localstorage.getObject('medis');

    } else {

        $scope.medis = $localstorage.getObject('medis');

    };

})

.controller('AddMediController', function($scope, $localstorage, Timer, $window, $state) {

    //vorhandene Objekte im "medis" Array in Variable speichern
    var existMedis = $localstorage.getObject('medis') || [];

    //zeiten aus Servece um im select anzuzeigen
    $scope.zeiten = Timer.alleZeiten();

    // $scope.timers = [];

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

        //daten aktualisieren
        $window.location.reload(true);

        //redirect to List
        $state.go('app.medis');


    };

})

.controller('MediController', function($scope, $stateParams, $localstorage, Timer, $location, $window) {

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
            //daten aktualisieren
            $window.location.reload(true);
            //redirect to Liste
            $location.path('/medis');
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

//Schritt 1
// var medisSlice = medis.slice(0, 1);

// //Schritt 2

// //löschen geht nur wenn array in object umgewandelt wird
// var medisSliceObj = medisSlice[0];
// delete medisSliceObj.einheit;
// delete medisSliceObj.menge;
// delete medisSliceObj.packungsgroesse;
// delete medisSliceObj.rezeptpflichtig;
// delete medisSliceObj.rezeptende;
// var medisSliceDel = medisSliceObj;
// console.log(medisSliceDel);

// //Property picking
// var medisSliceObjName = medisSliceObj.name;
// console.log(medisSliceObjName);

// //schritt 3

// //isoliere timers object
// mediSliceObjTimers = medisSliceObj.timers;
// console.log(mediSliceObjTimers);

// //isoliere tage object
// mediSliceObjTimersTage = medisSliceObj.timers.tage;
// console.log(mediSliceObjTimersTage);

// //mache aus tage object ein array nur mit den werten
// var mediSliceObjTimersTageArr = Object.keys(mediSliceObjTimersTage).map(function(k) {
//     return mediSliceObjTimersTage[k]
// });
// console.log(mediSliceObjTimersTageArr);

// //enferne falsy values aus array
// function cleanArray(actual) {
//     var newArray = new Array();
//     for (var i = 0; i < actual.length; i++) {
//         if (actual[i]) {
//             newArray.push(actual[i]);
//         }
//     }
//     return newArray;
// }
// var mediSliceObjTimersTageArrClean = cleanArray(mediSliceObjTimersTageArr);
// console.log(mediSliceObjTimersTageArrClean);

// // var mediSliceObjTimersTageArrCleanToJSON = angular.toJson(mediSliceObjTimersTageArrClean);
// // console.log(mediSliceObjTimersTageArrCleanToJSON);

// //isoliere zeiten array
// mediSliceObjTimersZeiten = medisSliceObj.timers.zeiten;
// console.log(mediSliceObjTimersZeiten);
