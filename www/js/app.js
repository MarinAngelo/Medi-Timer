// Ionic mediApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mediApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'mediApp.controllers' is found in controllers.js
angular.module('mediApp', ['ionic', 'mediApp.controllers', 'mediApp.services'])

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

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
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
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/medis');
});
