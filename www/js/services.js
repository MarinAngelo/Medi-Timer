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
            return JSON.parse($window.localStorage[key] || '[]');
        },
        initialData: function() {
            return [{
                id: 0,
                name: 'Actiq®',
                einheit: '800 Mikrogramm',
                anwendungsform: 'Lutschtabletten',
                packungsgroesse: '20 Stk',
                rezeptpflichtig: true,
                rezeptende: '16.07.2015'
            }, {
                id: 1,
                name: 'Acidum folicum Streuli®',
                einheit: '5 mg',
                anwendungsform: 'Tabletten',
                packungsgroesse: '25 Stk',
                rezeptpflichtig: false,
                rezeptende: ''
            }, {
                id: 2,
                name: 'Advantan®',
                einheit: '0,1%',
                anwendungsform: 'Crème/Salbe/Fettsalbe',
                packungsgroesse: '1 Stk',
                rezeptpflichtig: true,
                rezeptende: '16.07.2015'
            }, {
                id: 3,
                name: 'Alendron D3-Mepha',
                einheit: '70mg',
                anwendungsform: 'Wochentabletten',
                packungsgroesse: '40 Stk',
                rezeptpflichtig: true,
                rezeptende: '16.07.2015'
            }, {
                id: 4,
                name: 'Aloxi®',
                einheit: '500 Mikrogramm',
                anwendungsform: 'Weichkapseln',
                packungsgroesse: '20 Stk',
                rezeptpflichtig: false,
                rezeptende: ''
            }, {
                id: 5,
                name: 'Amoxicillin Sandoz®',
                einheit: '',
                anwendungsform: 'dispergierbare Filmtabletten',
                packungsgroesse: '15 Stk',
                rezeptpflichtig: true,
                rezeptende: '16.07.2015'
            }];
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
