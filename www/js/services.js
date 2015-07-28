angular.module('mediApp.services', [])

.factory('$localstorage', ['$window', function($window) {

    //Initial-Daten || nur während dev
    // var initialData = [{

    //     id: '2015-06-05T08:58:53.372Z',
    //     name: 'Actiq®',
    //     menge: 500,
    //     einheit: 'Mikrogramm',
    //     anwendungsform: 'Lutschtabletten',
    //     packungsgroesse: 20,
    //     rezeptpflichtig: true,
    //     rezeptende: '16.07.2015',
    //     timers: {
    //         tage: {
    //             montag: 'Montag',
    //             dienstag: 'Dienstag'
    //         },
    //         zeiten: ['08:00', '18:30'],
    //         info: 'vor den Mahlzeiten',
    //         menge: 1
    //     }
    // }, {
    //     id: '2015-07-05T08:58:53.372Z',
    //     name: 'Acidum folicum Streuli®',
    //     menge: 5,
    //     einheit: 'mg',
    //     anwendungsform: 'Tabletten',
    //     packungsgroesse: 25,
    //     rezeptpflichtig: false,
    //     rezeptende: '',
    //     timers: {
    //         tage: {
    //             montag: 'Montag',
    //             dienstag: 'Dienstag',
    //             mittwoch: 'Mittwoch'
    //         },
    //         zeiten: ['08:00'],
    //         info: 'vor den Mahlzeiten',
    //         menge: 2
    //     }

    // }];

    return {
        // set: function(key, value) {
        //     $window.localStorage[key] = value;
        // },
        // get: function(key, defaultValue) {
        //     return $window.localStorage[key] || defaultValue;
        // },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '[]');
        }
        //Initial-Daten in den Local Storag speichern || nur während dev
        // setInitialData: function(key, value) {
        //     $window.localStorage[key] = JSON.stringify(initialData);
        // }

    };

}])

.factory('Timer', function() {

    //Datenstruktur, zur Verwendung der Funktion "Timewatcher" || nur während dev
    // var timerData = [{
    //     id: 1,
    //     timer: 'Freitag 19:08',
    //     name: 'Aspirin',
    //     menge: 1,
    //     info: 'vor den Mahlzeiten',
    //     anwendungsform: "Tabletten"
    // }, {
    //     id: 2,
    //     timer: 'Samstag 08:09',
    //     name: 'Dafalgan',
    //     menge: 2,
    //     info: 'vor den Mahlzeiten',
    //     anwendungsform: "Tabletten"
    // }, {
    //     id: 3,
    //     timer: 'Sonntag 19:10',
    //     name: 'Meridon',
    //     menge: 2,
    //     info: 'vor den Mahlzeiten',
    //     anwendungsform: "Tabletten"
    // }];

        //zeiten generieren
    //plugin twix hilft moment für time ranges
    var startTime = moment("2015-06-19 06:00", "YYYY-MM-DD HH:mm");
    var endTime = moment("2015-06-20 05:30", "YYYY-MM-DD HH:mm");

    var itr = moment.twix(startTime, endTime).iterate(0.5, "hours");
    var range = [];
    while (itr.hasNext()) {
        range.push(itr.next().format('LT'));
    }

    range.push("05:30", "17:20");

    return {

        //zeiten für Formular bereitstellen
        alleZeiten: function() {
            return range;
        }
        
        // || nur während dev
        // timerData: function() {
        //     return timerData;
        // }

        // timersData: function() {
            // return convertArr();
        // }

    };
});


