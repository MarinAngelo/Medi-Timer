angular.module('mediApp.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicPlatform, $ionicModal, $ionicPopup, $timeout,
    $localstorage, $interval, Timer, $window, $state, $cordovaLocalNotification) {
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

    // helper für navigation via button, version mit $state, spezifisch
    $scope.goAddMedi = function() {
        $state.go('app.addMedi');
    };

    //page refresher
    $scope.reload = function() {
        $state.forceReload();
    };


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

        // var cancel = function() {
        //     $cordovaLocalNotification.cancelAll();
        // };
        // cancel();

        // $rootScope.$on('$cordovaLocalNotification:cancelall',
        //     function(event, state) {
        //         alert("notifications cancelled");
        //     });

        // document.addEventListener('resume', function resume() {
        //     cancel();
        //     $rootScope.$on('$cordovaLocalNotification:cancelall',
        //         function(event, state) {
        //             alert("cancelled after resume");
        //         });
        // });


        //**********local notification generieren****************
        // var timers = Timer.timerData();
        var timers = $scope.timersData;
        console.log(timers);
        var days = ["sonntag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag"];
        var now = new Date();
        var today = new Date();
        var end = new Date();
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
                i++;
                console.log(i);
                notifications.push({
                    id: i,
                    title: "" + timer.name + " jetzt einnehmen",
                    text: "" + timer.menge + " " + timer.anwendungsform + " " + timer.info + " ist jetzt fällig.",
                    at: notificationTime,
                    badge: 1,
                    data: timer
                });
            });

            today.setDate(today.getDate() + 1);
        }

        console.log(notifications);

        //ngCordova methode funktioniert nicht?????????????????
        // $scope.scheduleSingleNotification = function() {
        //     $cordovaLocalNotification.schedule(notifications).then(function(result) {
        //         console.log("The Medi-Timer notification has been set");
        //     });
        // };

        var notifi = function() {
            $cordovaLocalNotification.schedule(notifications, console.log("The Medi-Timer notification has been set"));
        };
        notifi();

        //alle notifications an scope heften um in "Benachrichtigungen" anzuzeigen
        cordova.plugins.notification.local.getAll(function(notifications) {

            $scope.allNotifications = notifications;
            console.log(new Date($scope.allNotifications[0].at * 1000));

            for (var i = 0; i < $scope.allNotifications.length; i++) {
                $scope.allNotifications[i].at = new Date($scope.allNotifications[i].at * 1000);

            }

        });



        // cordova.plugins.notification.local.on("schedule", function(notification) {
        //     alert("scheduled: " + notification.id);
        // });

        // $rootScope.$on('$cordovaLocalNotification:schedule',
        //     function(event, notification, state) {
        //         alert("scheduled: " + notification.id + " " + new Date(notification.at * 1000));
        //     });

        $rootScope.$on('$cordovaLocalNotification:trigger',
            function(event, notification, state) {
                alert("triggered: " + notification.id + " " + new Date(notification.at * 1000));
            });

    });
    //**********local notification generieren****************

    //wenn app in den hintergrund geht
    document.addEventListener('pause', function unload() {

        console.log('ich bin in Pause');

    });

})

//templeate medis.html (Liste)
.controller('MedisController', function($scope, $localstorage, $interval, $window, $location,
    $state, $cordovaLocalNotification, Timer) {

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

    //teste ob key "medis" im Local Storage vorhanden ist
    if (localStorage.medis === undefined) {
        //wenn nicht speichere initial Daten
        $localstorage.setInitialData('medis');
        //zeige inizial Daten an
        $scope.medis = $localstorage.getObject('medis');

    } else {

        $scope.medis = $localstorage.getObject('medis');

    }



    //helper für navigation via button, version mit $state, generisch
    //         $scope.go = function(path) {
    //     $state.go(path);
    // };

    // helper für navigation via button, version mit $state, spezifisch
    $scope.goAddMedi = function() {
        $state.go('app.addMedi');
    };
    //helper für navigation via button Version mit $location,
    // sollte gemäss einigen posts auf stackoverflow nicht verwendet werden
    // $scope.go = function(path) {
    //     $location.path(path);
    //     console.log(path);
    // };

})

.controller('AddMediController', function($scope, $localstorage, Timer, $window, $state) {

    //vorhandene Objekte im "medis" Array in Variable speichern
    var existMedis = $localstorage.getObject('medis') || [];

    $scope.zeiten = Timer.alleZeiten();

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

.controller('MediController', function($scope, $stateParams, $localstorage, Timer, $location, $window, $state) {

    $scope.$on('$ionicView.beforeEnter',
        function() {
            // Code here is always executed when entering this state
            //reload page each time when routed
            // $state.forceReload();
        }
    );


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

    //Einzelner Medi Eintrag editieren
    //

    $scope.editing = false;


    $scope.toggleEditing = function() {
        // if ($scope.editing) {
        save();
        // }
        $scope.editing = !$scope.editing;
    };

    $scope.zeiten = Timer.alleZeiten();

    // vorhandenes medi muss im medis arry mit dem väränderten medi ausgewechselt werden 
    function save() {
        var medis = $localstorage.getObject('medis');

        for (var i = 0; i < medis.length; i++) {
            if (medis[i].id === $scope.medi.id) {
                medis[i] = $scope.medi;
                $localstorage.setObject('medis', medis);
                $state.go('app.single');
            }
        }
        return null;
    }

    //****************Medi löschen**********************
    //http://stackoverflow.com/questions/8127075/localstorage-json-how-can-i-delete-only-1-array-inside-a-key-since-localstora
    $scope.deleteMedi = function(mediId) {

        var medis = $localstorage.getObject('medis');

        for (var i = 0; i < medis.length; i++) {
            if (medis[i].id === $stateParams.mediId) {
                medis.splice(i, 1);

                //daten aktualisieren
                // $window.location.reload(true);
                return $localstorage.setObject('medis', medis);

            }

        }
        //redirect to List
        $state.go('app.medis');
    };
});
