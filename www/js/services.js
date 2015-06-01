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
                menge: 500,
                einheit: 'Mikrogramm',
                anwendungsform: 'Lutschtabletten',
                packungsgroesse: 20,
                rezeptpflichtig: true,
                rezeptende: '16.07.2015',
                timers: [{
                    tage: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
                    zeiten: ['08:00', '18:30'],
                    info: 'vor den Mahlzeiten'
                }]
            }, {
                id: 1,
                name: 'Acidum folicum Streuli®',
                menge: 5,
                einheit: '',
                anwendungsform: 'Tabletten',
                packungsgroesse: 25,
                rezeptpflichtig: false,
                rezeptende: '',
                timers: [{
                    tage: ['Montag', 'Mittwoch', 'Freitag', 'Sonntag'],
                    zeiten: ['08:00'],
                    info: 'vor den Mahlzeiten'
                }, {
                    tage: ['Dienstag', 'Donnerstag', 'Samstag'],
                    zeiten: ['18:30'],
                    info: 'nach den Mahlzeiten'
                }]
            }, {
                id: 2,
                name: 'Advantan®',
                einheit: '0,1%',
                anwendungsform: 'Crème/Salbe/Fettsalbe',
                packungsgroesse: '1 Stk',
                rezeptpflichtig: true,
                rezeptende: '16.07.2015',
                timers: [{
                    tage: ['Montag'],
                    zeiten: ['08:00', '18:30'],
                    info: 'vor den Mahlzeiten'
                }]
            }, {
                id: 3,
                name: 'Alendron D3-Mepha',
                einheit: '70mg',
                anwendungsform: 'Wochentabletten',
                packungsgroesse: '40 Stk',
                rezeptpflichtig: true,
                rezeptende: '16.07.2015',
                timers: [{
                    tage: ['Dienstag', 'Samstag'],
                    zeiten: ['08:00', '14:00', '18:30'],
                    info: 'vor den Mahlzeiten, mit einem Glas Wasser'
                }]
            }, {
                id: 4,
                name: 'Aloxi®',
                einheit: '500 Mikrogramm',
                anwendungsform: 'Weichkapseln',
                packungsgroesse: '20 Stk',
                rezeptpflichtig: false,
                rezeptende: '',
                timers: [{
                    tage: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
                    zeiten: ['05:30', '08:00', '14:30', '18:30', '21:30'],
                    info: 'vor den Mahlzeiten'
                }]
            }, {
                id: 5,
                name: 'Amoxicillin Sandoz®',
                einheit: '',
                anwendungsform: 'dispergierbare Filmtabletten',
                packungsgroesse: '15 Stk',
                rezeptpflichtig: true,
                rezeptende: '16.07.2015',
                timers: [{
                    tage: ['Montag'],
                    zeiten: ['08:00'],
                    info: 'vor den Mahlzeiten'
                }, {
                    tage: ['Dienstag'],
                    zeiten: ['08:30'],
                    info: 'vor den Mahlzeiten'
                }, {
                    tage: ['Mittwoch'],
                    zeiten: ['09:00'],
                    info: 'vor den Mahlzeiten'
                }, {
                    tage: ['Donnerstag'],
                    zeiten: ['09:30'],
                    info: 'vor den Mahlzeiten'
                }, {
                    tage: ['Freitag'],
                    zeiten: ['09:30'],
                    info: 'vor den Mahlzeiten'
                }, {
                    tage: ['Samstag'],
                    zeiten: ['10:00'],
                    info: 'vor den Mahlzeiten'
                }, {
                    tage: ['Sonntag'],
                    zeiten: ['10:30'],
                    info: 'vor den Mahlzeiten'
                }]
            }];
        }

    }


}])

.factory('Timer', function() {

    //Datenstruktur, zur Verwendung der Funktion "Timewatcher"
    var timerData = [{
        dayTime: 'Wednesday-18-06',
        mediId: '2015-05-26T20:35:44.755Z'
    }, {
        dayTime: 'Wednesday-18-06',
        mediId: '2015-05-26T20:35:44.755Z'
    }];

    var zeiten = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30'];

    //für Variante mit ng-repeat
    // var tage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

    var tage = {
        timers: [{
            tage: {
                montag: 'Montag',
                dienstag: 'Dienstag',
                mittwoch: 'Mittwoch',
                donnerstag: 'Donnerstag',
                freitag: 'Freitag',
                samstag: 'Samstag',
                sonntag: 'Sonntag'
            }
        }]
    };


    // var tagZeit = moment().format('dddd h:mm:ss');

    // var datum = function() {
    //     var date = moment().format('dddd h:mm:ss');
    // }

    // $interval(function() {
    //     $scope.datum();
    // }, 6000, 0);

    return {

        //zeiten für Formular bereitstellen
        alleZeiten: function() {
            return zeiten;
        },
        alleTage: function() {
            return tage;
        }
        // holsDatum: function() {
        //     return date;
        // }
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
