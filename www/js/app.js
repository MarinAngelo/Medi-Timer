// Ionic mediApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mediApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'mediApp.controllers' is found in controllers.js
angular.module('mediApp', ['ionic', 'mediApp.controllers', 'mediApp.services', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });



})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    //Medi hinzufügen
    .state('app.addMedi', {
            url: "/addMedi",
            views: {
                'menuContent': {
                    templateUrl: "templates/addMedi.html",
                    controller: 'AddMediController'
                }
            }
        })
        //Listen-Ansicht
        .state('app.medis', {
            url: "/medis",
            cache: "false",
            views: {
                'menuContent': {
                    templateUrl: "templates/medis.html",
                    controller: 'MedisController'
                }
            }
        })
        //Detail-Ansicht
        .state('app.single', {
            url: "/medis/:mediId",
            views: {
                'menuContent': {
                    templateUrl: "templates/medi.html",
                    controller: 'MediController'
                }
            }
        })
        //Notifications
        .state('app.notifications', {
            url: "/notifications",
            views: {
                'menuContent': {
                    templateUrl: "templates/notifications.html",
                    controller: 'AppCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/medis');

});
// page reloader
// .config(function($provide) {
//     $provide.decorator('$state', function($delegate, $stateParams) {
//         $delegate.forceReload = function() {
//             return $delegate.go($delegate.current, $stateParams, {
//                 reload: true,
//                 inherit: false,
//                 notify: true
//             });
//         };
//         return $delegate;
//     });
// });

// .run(function($ionicPlatform, $rootScope, Timer, $cordovaLocalNotification) {
//     var local, granted;

//     // document.addEventListener('deviceready', function deviceready() {
//         ionic.Platform.ready(function(){
//         // local = window.cordova.plugins.notification.local;
//         local = $cordovaLocalNotification;
//         local.hasPermission(function(g) {
//             granted = g;
//             if (!granted) {
//                 local.registerPermission(function(g) {
//                     granted = g;
//                 });
//             }
//         });

//         local.cancelAll();
//         document.addEventListener('resume', function resume() {
//             local.cancelAll();
//         });

//         local.on('click', function click(notification, state) {
//             var data = JSON.parse(notification.data);
//         });

//         document.addEventListener('pause', function unload() {
//             // if (!granted) {
//             //     return;
//             // }
//             var timers = Timer.timerData();
//             var days = ["sonntag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag"];
//             var now = new Date();
//             var today = new Date();
//             var end = new Date();
//             end.setMonth(now.getMonth() + 1);
//             var i = 0;
//             var notifications = [];
//             while (today.getTime() <= end.getTime()) {
//                 timers.forEach(function(timer) {
//                     var time = timer.timer.split(/[\s:.]+/);
//                     var day = days.indexOf(time[0].toLowerCase());
//                     var hour = parseInt(time[1], 10);
//                     var minute = parseInt(time[2], 10);
//                     if (today.getDay() !== day) {
//                         return;
//                     }
//                     var notificationTime = new Date(today.getTime());
//                     notificationTime.setHours(hour, minute);
//                     if (notificationTime.getTime() < now.getTime()) {
//                         return;
//                     }
//                     notifications.push({
//                         title: "" + timer.name + " jetzt einnehmen",
//                         text: "" + timer.menge + " " + timer.anwendungsform + " " + timer.info + " ist jetzt fällig.",
//                         at: notificationTime,
//                         badge: 1,
//                         data: timer
//                     });
//                 });
//                 today.setDate(today.getDate() + 1);
//             }
//             local.schedule(notifications);
//             console.log(notifications);
//         }, false);
//     }, false);

// });


// .run(function($ionicPlatform, $rootScope, Timer, $cordovaLocalNotification) {

//     //local notification
//     //*************************************
//     // will execute when device is ready, or immediately if the device is already ready.
//     $ionicPlatform.ready(function() {

//         var cancel = function() {
//             $cordovaLocalNotification.cancelAll();
//         };
//         cancel();

//         $rootScope.$on('$cordovaLocalNotification:cancelall',
//             function(event, state) {
//                 alert("notifications cancelled");
//             });

//         document.addEventListener('resume', function resume() {
//             cancel();
//             $rootScope.$on('$cordovaLocalNotification:cancelall',
//                 function(event, state) {
//                     alert("cancelled after resume: " + notification.id + " " + notification.at);
//                 });
//         });

//         //wenn app im hintergrund ist
//         document.addEventListener('pause', function unload() {

//                 var timers = Timer.timerData();
//         console.log(timers);
//         var days = ["sonntag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag"];
//         var now = new Date();
//         var today = new Date();
//         var end = new Date();
//         end.setMonth(now.getMonth() + 0.5);
//         // var i = 0;
//         console.log(end);
//         var notifications = [];
//         //range von daten in die zukunft, mit enddatum projeziert
//         while (today.getTime() <= end.getTime()) {
//             timers.forEach(function(timer) {
//                 var time = timer.timer.split(/[\s:.]+/);
//                 console.log(time);
//                 //gibt Wochentag index zurück, der bei sonntag = 0 beginnt
//                 var day = days.indexOf(time[0].toLowerCase());
//                 console.log(day);
//                 var hour = parseInt(time[1], 10);
//                 console.log(hour);
//                 var minute = parseInt(time[2], 10);
//                 console.log(minute);
//                 console.log(today.getDay());
//                 //stellt sicher, dass vom aktuellen Tag an in die Zukunft hinein Notifications generiert werden
//                 if (today.getDay() !== day) {
//                     return;
//                 }
//                 var notificationTime = new Date(today.getTime());
//                 notificationTime.setHours(hour, minute);
//                 console.log(notificationTime);
//                 //stellt sicher, dass keine Notificatins mit Datum in der Vergangenheit erstellt werden
//                 if (notificationTime.getTime() < now.getTime()) {
//                     return;
//                 }
//                 notifications.push({
//                     id: timer.id,
//                     title: "" + timer.name + " jetzt einnehmen",
//                     text: "" + timer.menge + " " + timer.anwendungsform + " " + timer.info + " ist jetzt fällig.",
//                     at: notificationTime,
//                     badge: 1,
//                     data: timer
//                 });
//             });

//             today.setDate(today.getDate() + 1);
//         }
//         console.log(notifications);

//         //ngCordova methode funktioniert nicht?????????????????
//         // $scope.scheduleSingleNotification = function() {
//         //     $cordovaLocalNotification.schedule(notifications).then(function(result) {
//         //         console.log("The Medi-Timer notification has been set");
//         //     });
//         // };

//         var notifi = function() {
//             $cordovaLocalNotification.schedule(notifications, console.log("The Medi-Timer notification has been set"));
//         };
//         notifi();

//         $rootScope.$on('$cordovaLocalNotification:schedule',
//             function(event, notification, state) {
//                 alert("scheduled: " + notification.id + " " + notification.at);
//             });

//         $rootScope.$on('$cordovaLocalNotification:trigger',
//             function(event, notification, state) {
//                 alert("triggered: " + notification.id + " " + notification.at);
//             });
//             console.log('ich bin in Pause');

//         }, false);

//     });

// });
