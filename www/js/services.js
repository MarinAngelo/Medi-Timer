angular.module('mediApp.services', [])

.factory('$localstorage', ['$window', function($window) {

    //Initial-Daten
    var initialData = [{

        id: '2015-06-05T08:58:53.372Z',
        name: 'Actiq®',
        menge: 500,
        einheit: 'Mikrogramm',
        anwendungsform: 'Lutschtabletten',
        packungsgroesse: 20,
        rezeptpflichtig: true,
        rezeptende: '16.07.2015',
        timers: {
            tage: {
                montag: 'Montag',
                dienstag: 'Dienstag'
            },
            zeiten: ['08:00', '18:30'],
            info: 'vor den Mahlzeiten',
            menge: 1
        }
    }, {
        id: '2015-07-05T08:58:53.372Z',
        name: 'Acidum folicum Streuli®',
        menge: 5,
        einheit: 'mg',
        anwendungsform: 'Tabletten',
        packungsgroesse: 25,
        rezeptpflichtig: false,
        rezeptende: '',
        timers: {
            tage: {
                montag: 'Montag',
                dienstag: 'Dienstag',
                mittwoch: 'Mittwoch'
            },
            zeiten: ['08:00'],
            info: 'vor den Mahlzeiten',
            menge: 2
        }

    }];

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
        //Initial-Daten in den Local Storag speichern
        setInitialData: function(key, value) {
            $window.localStorage[key] = JSON.stringify(initialData);
        }

    }

}])

.factory('Timer', function() {

    //Datenstruktur, zur Verwendung der Funktion "Timewatcher"
    var timerData = [{
        timer : 'Montag 08:30',
        name : 'Aspirin',
        menge : 1
    }, {
        timer : 'Mittwoch 14:50',
        name : 'Aspirin',
        menge : 2
    }];

    var zeiten = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30'];


    return {

        //zeiten für Formular bereitstellen
        alleZeiten: function() {
            return zeiten;
        },

        timerData: function() {
            return timerData;
        }

    }
});


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

// [{
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

//für Variante mit ng-repeat
// var tage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

// var tage = {
//     timers: [{
//         tage: {
//             montag: 'Montag',
//             dienstag: 'Dienstag',
//             mittwoch: 'Mittwoch',
//             donnerstag: 'Donnerstag',
//             freitag: 'Freitag',
//             samstag: 'Samstag',
//             sonntag: 'Sonntag'
//         }
//     }]
// };

// ,
// alleTage: function() {
//     return tage;
// }

//struktur mit mehreren Timern
        //             id: '2015-06-05T08:58:53.372Z',
        //             name: 'Actiq®',
        //             menge: 500,
        //             einheit: 'Mikrogramm',
        //             anwendungsform: 'Lutschtabletten',
        //             packungsgroesse: 20,
        //             rezeptpflichtig: true,
        //             rezeptende: '16.07.2015',
        //             timers: [{
        //                 timerId : 1,
        //                 tage: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
        //                 zeiten: ['08:00', '18:30'],
        //                 info: 'vor den Mahlzeiten'
        //             }]
        //         }, {
        //             id: '2015-07-05T08:58:53.372Z',
        //             name: 'Acidum folicum Streuli®',
        //             menge: 5,
        //             einheit: 'mg',
        //             anwendungsform: 'Tabletten',
        //             packungsgroesse: 25,
        //             rezeptpflichtig: false,
        //             rezeptende: '',
        //             timers: [{
        //                 timerId : 1,
        //                 tage: ['Montag', 'Mittwoch', 'Freitag', 'Sonntag'],
        //                 zeiten: ['08:00'],
        //                 info: 'vor den Mahlzeiten'
        //             }, {
        //                 timerId : 2,
        //                 tage: ['Dienstag', 'Donnerstag', 'Samstag'],
        //                 zeiten: ['18:30'],
        //                 info: 'nach den Mahlzeiten'
        //             }]