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

.run(function($cordovaSplashscreen) {
    setTimeout(function() {
        $cordovaSplashscreen.hide();
    }, 8000);
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: "/app",
        //????????????
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    //Medi hinzufügen
    .state('app.addMedi', {
            url: "/addMedi",
            cache: "false",
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
            cache: "false",
            views: {
                'menuContent': {
                    templateUrl: "templates/notifications.html",
                    controller: 'AppCtrl'
                }
            }
        })
        //Cover
        //wird nur in den navi-stack einbezogen wenn aufgerufen
        .state('cover', {
            url: "/cover",
            templateUrl: "templates/cover.html",
            controller: "CoverController"
            // controller: "AppCtrl"
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/medis');
    // $urlRouterProvider.otherwise('/app/notifications');
});
