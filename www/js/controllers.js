angular.module('mediApp.controllers', [])

.controller('CoverController', function($scope, $state, $ionicHistory) {

    // helper für navigation via button, version mit $state, spezifisch (Cover)
    $scope.goAddMedis = function() {
        $state.go('app.addMedi');
    };

})

.controller('AppCtrl', function($scope, $rootScope, $ionicPlatform, $ionicModal, $ionicPopup, $timeout,
    $localstorage, $interval, Timer, $window, $state, $cordovaLocalNotification) {


    //Local Storage Array "medis" holen, um in gewünschtes Format umzuwandeln
    //************************************************************************

    var medis = $localstorage.getObject('medis');
    console.log(medis);

    var allTimerData = [];

    //enferne falsy value "false" aus tage array
    function cleanArray(tage) {
        var newArray = [];
        for (var i = 0; i < tage.length; i++) {
            if (tage[i]) {
                newArray.push(tage[i]);
            }
        }
        return newArray;
    }

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

    //tagesZeiten auf einzelne arrays verteilen
    function spliceArr(tagesZeiten) {
        var newArray = [];
        while (tagesZeiten.length > 0) {
            newArray.push(tagesZeiten.splice(0, 2));
        }
        return newArray;
    }

    //duplikate entfernen (liesse sich evtl. auch vermeiden durch verbesserung von funktion mergeArray)
    function uniqBy(tagesZeiten, key) {
        var seen = {};
        return tagesZeiten.filter(function(item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
    }

    //tagesZeiten in strings umwandeln und in neuem array speichern
    function arrToString(tagesZeiten) {
        newArray = [];
        for (var i = 0; i < tagesZeiten.length; i++) {
            newArray.push(tagesZeiten[i].join(' '));
        }
        return newArray;
    }

    //je array in medi folgenden prozess ausführen:
    for (var i = 0; i < medis.length; i++) {

        //object tage und array zeiten gemäss allgorythmus mergen

        //isoliere tage object
        var tage = medis[i].timers.tage;

        //mache aus tage object ein array nur mit den werten
        tage = Object.keys(tage).map(function(k) {
            return tage[k];
        });

        //enferne falsy value "false" aus tage array
        tage = cleanArray(tage);
        console.log(tage);

        //isoliere zeiten array
        var zeiten = medis[i].timers.zeiten;
        console.log(zeiten);

        //den array tage soviel mal kopieren wie entsprechende Zeiten
        var combiTage = combiArray(zeiten, tage);
        console.log(combiTage);

        //die Zeiten den tages-arrays hinzufügen
        var tagesZeiten = mergeArray(combiTage, zeiten);

        //tagesZeiten auf einzelne arrays verteilen
        tagesZeiten = spliceArr(tagesZeiten);

        //duplikate entfernen (liesse sich evtl. auch vermeiden durch verbesserung von funktion mergeArray)
        tagesZeiten = uniqBy(tagesZeiten, JSON.stringify);

        //tagesZeiten in strings umwandeln und in neuem array speichern
        tagesZeiten = arrToString(tagesZeiten);
        console.log(tagesZeiten);

        //neues Objekt generieten, 
        var timerData = [];

        for (var j = 0; j < tagesZeiten.length; j++) {
            timerData[j] = {
                timer: tagesZeiten[j],
                id: medis[i].id,
                name: medis[i].name,
                menge: medis[i].timers.menge,
                info: medis[i].timers.info,
                anwendungsform: medis[i].anwendungsform,
                trigered: false,
                confirmed: false
            };
        }
        console.log(timerData);

        allTimerData.push(timerData);
        console.log(allTimerData);

    }

    //2d arr in 1d arr verwandeln
    function get1DArray(arr) {
        var result = [];
        for (var x = 0; x < arr.length; x++) {
            for (var y = 0; y < arr[x].length; y++) {
                result.push(arr[x][y]);
            }
        }
        return result;
    }

    allTimerData1d = get1DArray(allTimerData);

    //Fake timerData aus service 
    // $scope.timerData = Timer.timerData();
    //real von form
    $scope.timersData = allTimerData1d;
    console.log($scope.timersData);
    //**********ende local storage load*******************

    //local notification
    //*************************************
    // will execute when device is ready, or immediately if the device is already ready.
    $ionicPlatform.ready(function() {

        //Alle Notifications werden vorerst gelöscht
        //auskommentieren bei ionic serve
        (function() {
            $cordovaLocalNotification.cancelAll();
        })();


        //**********local notification generieren****************
        // var timers = Timer.timerData();
        var timers = $scope.timersData;
        console.log(timers);
        var days = ["sonntag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag"];
        var now = new Date();
        var today = new Date();
        var end = new Date();
        //anzahl Monate der Zukunftsprojektion
        end.setMonth(now.getMonth() + 1);
        var i = 0;
        console.log("Endtime: " + end);
        var notifications = [];
        //range von daten in die zukunft, mit enddatum projeziert
        while (today.getTime() <= end.getTime()) {
            timers.forEach(function(timer) {
                var time = timer.timer.split(/[\s:.]+/);
                console.log("time= " + time);
                //gibt Wochentag index zurück, der bei sonntag = 0 beginnt
                var day = days.indexOf(time[0].toLowerCase());
                console.log("day: " + day);
                var hour = parseInt(time[1], 10);
                console.log("hour: " + hour);
                var minute = parseInt(time[2], 10);
                console.log("minute: " + minute);
                console.log("today: " + today.getDay());
                //stellt sicher, dass vom aktuellen Tag an in die Zukunft hinein Notifications generiert werden
                if (today.getDay() !== day) {
                    //wenn today in der vergangenhiet liegt kommt die schlaufe nie zum ende
                    // today.setDate(today.getDate() + 1);
                    console.log("today nach Vergangenheits-Test: " + today);
                    return;
                }
                //generieren der notification time
                var notificationTime = new Date(today.getTime());
                notificationTime.setHours(hour, minute);
                console.log("notification time: " + notificationTime);

                //stellt sicher, dass keine Notificatins mit Datum in der Vergangenheit erstellt werden
                if (notificationTime.getTime() < now.getTime()) {
                    return;
                }
                console.log("notification time after return: " + notificationTime);
                console.log("timer id: " + timer.id);

                //increment i to generate notification id
                i++;

                if (timer.menge === undefined) {
                    timer.menge = ' ';
                }

                if (timer.anwendungsform === undefined) {
                    timer.anwendungsform = ' ';
                }

                if (timer.info === undefined) {
                    timer.info = ' ';
                }

                notifications.push({
                    id: i,
                    title: timer.name,
                    text: "Jetzt " + timer.menge + " " + timer.anwendungsform + " " + timer.name + " einnehmen, " + timer.info,
                    at: notificationTime,
                    badge: 1,
                    data: timer
                });
            });

            today.setDate(today.getDate() + 1);
        }

        //console.log(notifications);

        //ngCordova methode funktioniert nicht?????????????????
        // $scope.scheduleSingleNotification = function() {
        //     $cordovaLocalNotification.schedule(notifications).then(function(result) {
        //         console.log("The Medi-Timer notification has been set");
        //     });
        // };

        //replaces function above, auskommentieren bei ionic serve
        // var notifi = function() {
        //     $cordovaLocalNotification.schedule(notifications, console.log("The Medi-Timer notification has been set"));
        // };
        // notifi();

        //attach notifications to the notificatin center
        (function() {
            $cordovaLocalNotification.schedule(notifications, console.log("The Medi-Timer notification has been set"));
        })();

        //alle notifications an scope heften um in "Benachrichtigungen" anzuzeigen
        var allNotifications = [];
        //event fires when notifications are scheduled
        $rootScope.$on('$cordovaLocalNotification:schedule',
            function(event, notification, state) {
                allNotifications.push({
                    name: notification.title,
                    //new Date() wandelt unix timestamp in normales Datumsvormat um
                    date: new Date(notification.at * 1000)
                });
                $scope.allNotifications = allNotifications;
                // alert("scheduled: " + notification.id + " " + new Date(notification.at * 1000));
            });


        //kommt immer 2x je notification, warum blos?
        // $rootScope.$on('$cordovaLocalNotification:trigger',
        //     function(event, notification, state) {
        //         alert("triggered: " + notification.id + " " + new Date(notification.at * 1000));
        //     });

    });
    //**********ende local notification generieren****************

    //Wellcome Screen anzeigen, wenn noch keine Medis gespeicheret sind
    //sonst wird der Benachrichtigungs-Plan angezeigt
    //teste ob key "medis" im Local Storage vorhanden ist (produktion)
    // if (localStorage.medis === undefined) {
    //     $state.go('cover');

    // } else {

    //     $scope.medis = $localstorage.getObject('medis');

    // }

})

.controller('MedisController', function($scope, $localstorage, $interval, $window, $location,
    $state, $cordovaLocalNotification, Timer) {

    // helper für navigation via button, version mit $state, spezifisch (+ button in nav bar)
    $scope.goAddMedi = function() {
        $state.go('app.addMedi');
    };

    //Wellcome Screen anzeigen, wenn noch keine Medis gespeicheret sind
    //sonst wird die Medikamenten Liste angezeigt
    //teste ob key "medis" im Local Storage vorhanden ist (produktion)
    if (localStorage.medis === undefined) {
        $state.go('cover');

    } else {

        $scope.medis = $localstorage.getObject('medis');

    }


})

.controller('AddMediController', function($scope, $localstorage, Timer, $window, $state, $ionicHistory) {

    //vorhandene Objekte im "medis" Array in Variable speichern
    var existMedis = $localstorage.getObject('medis') || [];

    $scope.zeiten = Timer.alleZeiten();

    //Verhindert zurück Navi
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
    });

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

        //redirect to List
        $state.go('app.medis');

    };

})

.controller('MediController', function($scope, $stateParams, $localstorage, Timer, $location, $window, $state) {

    //***************Einzelnes Medi anzeigen********************************
    $scope.zeiten = Timer.alleZeiten();

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

    //Einzelner Medi Eintrag editieren
    $scope.editing = false;

    $scope.toggleEditing = function() {
        if ($scope.editing) {
            save();
        }
        $scope.editing = !$scope.editing;
    };

    // speichern: altes medi im medis arry mit neuem medi ausgewechsln 
    function save() {
        var medis = $localstorage.getObject('medis');
        for (var i = 0; i < medis.length; i++) {
            if (medis[i].id === $scope.medi.id) {
                medis[i] = $scope.medi;
                $localstorage.setObject('medis', medis);
                $state.go('app.medis');
            }
        }
    }

    //****************Medi löschen**********************
    //http://stackoverflow.com/questions/8127075/localstorage-json-how-can-i-delete-only-1-array-inside-a-key-since-localstora
    $scope.deleteMedi = function(mediId) {
        var medis = $localstorage.getObject('medis');
        for (var i = 0; i < medis.length; i++) {
            if (medis[i].id === $stateParams.mediId) {
                medis.splice(i, 1);
                //redirect to List
                $state.go('app.medis');
                return $localstorage.setObject('medis', medis);
            }
        }

    };
});

// $scope.$on('$ionicView.beforeEnter',
//     function() {
//         // Code here is always executed when entering this state
//         //reload page each time when routed
//         // $state.forceReload();
//     }
// );

//alle notifications an scope heften um in "Benachrichtigungen" anzuzeigen 
//- auch alte werden angezeigt??
// cordova.plugins.notification.local.getAll(function(notifications) {

//     $scope.allNotifications = notifications;
//     console.log(new Date($scope.allNotifications[0].at * 1000));

//     for (var i = 0; i < $scope.allNotifications.length; i++) {
//         $scope.allNotifications[i].at = new Date($scope.allNotifications[i].at * 1000);

//     }

// });

//daten aktualisieren
// , $other, $depencies (zugehörige dependencies)
// $scope.$on('$ionicView.beforeEnter',
//     function() {
//         // Code here is always executed when entering this state
//         //reload page each time when routed
//         // $state.forceReload();
//         // $window.location.reload(true);
//     }
// );


//local notification test
//***************************************************
// $scope.add = function() {
//     var alarmTime = new Date();
//     alarmTime.setMinutes(alarmTime.getMinutes() + 1);
//     $cordovaLocalNotification.add({
//         id: "1234",
//         date: alarmTime,
//         message: "This is a message",
//         title: "This is a title",
//         autoCancel: true,
//         sound: null
//     }).then(function() {
//         console.log("The notification has been set");
//     });
// };

// $scope.isScheduled = function() {
//     $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
//         alert("Notification 1234 Scheduled: " + isScheduled);
//     });
// };
//*********************************************************************

//wenn app in den hintergrund geht
// document.addEventListener('pause', function unload() {

//     console.log('ich bin in Pause');

// });
