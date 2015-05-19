angular.module('mediApp.services', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
}
}]);

// .factory('Medis', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data

    // var medis = [{
    //     id: 0,
    //     name: 'Actiq®',
    //     einheit: '800 Mikrogramm',
    //     anwendungsform: 'Lutschtabletten',
    //     packungsgroesse: '20 Stk',
    //     rezeptpflichtig: true,
    //     rezeptende: '16.07.2015'
    // },
    // {
    //     id: 1,
    //     name: 'Alkaselzer®',
    //     einheit: '80 mg',
    //     anwendungsform: 'Tabletten',
    //     packungsgroesse: '20 Stk',
    //     rezeptpflichtig: false,
    //     rezeptende: ''
    // }];

    // // untenstehende 2 ausdrücke machen aus dem medis objekt einen String
    // window.localStorage['medis'] = JSON.stringify(medis);

    // var medis = JSON.parse(window.localStorage['medis'] || '{}');

    // return {
    //     all: function() {

    //         return medis;
    //     },
    //     remove: function(medi) {
    //         medis.splice(medis.indexOf(medi), 1);
    //     },
    //     get: function(mediId) {
    //         for (var i = 0; i < medis.length; i++) {
    //             if (medis[i].id === parseInt(mediId)) {
    //                 return medis[i];
    //             }
    //         }
    //         return null;
    //     }
    // };


// });
