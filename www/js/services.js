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
        },
        //Initial-Daten in den Local Storag speichern
        setInitialData: function(key, value) {
            $window.localStorage[key] = JSON.stringify(initialData);
        }

    };

}])

.factory('Timer', function() {

    //Datenstruktur, zur Verwendung der Funktion "Timewatcher"
    var timerData = [{
        id: 1,
        timer: 'Freitag 19:08',
        name: 'Aspirin',
        menge: 1,
        info: 'vor den Mahlzeiten',
        anwendungsform: "Tabletten"
    }, {
        id: 2,
        timer: 'Freitag 19:09',
        name: 'Dafalgan',
        menge: 2,
        info: 'vor den Mahlzeiten',
        anwendungsform: "Tabletten"
    }, {
        id: 3,
        timer: 'Freitag 19:10',
        name: 'Meridon',
        menge: 2,
        info: 'vor den Mahlzeiten',
        anwendungsform: "Tabletten"
    }];

    //Local Storage Array "medis" holen, um in gewünschtes Format umzuwandeln
    //************************************************************************

//     var convertArr = function() {

//     var medis = $localstorage.getObject('medis');
//     // console.log(medis);

//     var allTimerData = [];

//     //enferne falsy value "false" aus tage array
//     function cleanArray(tage) {
//         var newArray = [];
//         for (var i = 0; i < tage.length; i++) {
//             if (tage[i]) {
//                 newArray.push(tage[i]);
//             }
//         }
//         return newArray;
//     }

//     //den array tage soviel mal kopieren wie entsprechende Zeiten
//     function combiArray(zeiten, tage) {
//         var newArray = [];
//         for (var i = 0; i < zeiten.length; i++) {
//             if (zeiten[i]) {
//                 newArray.push(tage);
//             }
//         }
//         return newArray;
//     }

//     //die Zeiten den tages-arrays hinzufügen
//     function mergeArray(combiTage, zeiten) {
//         var advancedArray = [];
//         for (var i = 0; i < combiTage.length; i++) {
//             var innerArray = combiTage[i];
//             for (var j = 0; j < innerArray.length; j++) {
//                 for (var z = 0; z < zeiten.length; z++) {
//                     advancedArray.push(innerArray[j]);
//                     advancedArray.push(zeiten[z]);
//                 }
//             }
//         }
//         return advancedArray;
//     }

//     //tagesZeiten auf einzelne arrays verteilen
//     function spliceArr(tagesZeiten) {
//         var newArray = [];
//         while (tagesZeiten.length > 0) {
//             newArray.push(tagesZeiten.splice(0, 2));
//         }
//         return newArray;
//     }

//     //duplikate entfernen (liesse sich evtl. auch vermeiden durch verbesserung von funktion mergeArray)
//     function uniqBy(tagesZeiten, key) {
//         var seen = {};
//         return tagesZeiten.filter(function(item) {
//             var k = key(item);
//             return seen.hasOwnProperty(k) ? false : (seen[k] = true);
//         });
//     }

//     //tagesZeiten in strings umwandeln und in neuem array speichern
//     function arrToString(tagesZeiten) {
//         newArray = [];
//         for (var i = 0; i < tagesZeiten.length; i++) {
//             newArray.push(tagesZeiten[i].join(' '));
//         }
//         return newArray;
//     }

//     //je array in medi folgenden prozess ausführen:
//     for (var i = 0; i < medis.length; i++) {

//         //object tage und array zeiten gemäss allgorythmus mergen

//         //isoliere tage object
//         var tage = medis[i].timers.tage;

//         //mache aus tage object ein array nur mit den werten
//         tage = Object.keys(tage).map(function(k) {
//             return tage[k];
//         });

//         //enferne falsy value "false" aus tage array
//         tage = cleanArray(tage);
//         // console.log(tage);

//         //isoliere zeiten array
//         var zeiten = medis[i].timers.zeiten;
//         // console.log(zeiten);

//         //den array tage soviel mal kopieren wie entsprechende Zeiten
//         var combiTage = combiArray(zeiten, tage);
//         // console.log(combiTage);

//         //die Zeiten den tages-arrays hinzufügen
//         var tagesZeiten = mergeArray(combiTage, zeiten);

//         //tagesZeiten auf einzelne arrays verteilen
//         tagesZeiten = spliceArr(tagesZeiten);

//         //duplikate entfernen (liesse sich evtl. auch vermeiden durch verbesserung von funktion mergeArray)
//         tagesZeiten = uniqBy(tagesZeiten, JSON.stringify);

//         //tagesZeiten in strings umwandeln und in neuem array speichern
//         tagesZeiten = arrToString(tagesZeiten);
//         // console.log(tagesZeiten);

//         //neues Objekt generieten, 
//         var timerData = [];

//         for (var j = 0; j < tagesZeiten.length; j++) {
//             timerData[j] = {
//                 timer: tagesZeiten[j],
//                 id: medis[i].id,
//                 name: medis[i].name,
//                 menge: medis[i].timers.menge,
//                 info: medis[i].timers.info,
//                 anwendungsform: medis[i].anwendungsform,
//                 trigered: false,
//                 confirmed: false
//             };
//         }
//         // console.log(timerData);

//         allTimerData.push(timerData);
//         // console.log(allTimerData);

//     }

//     //2d arr in 1d arr verwandeln
//         function get1DArray(arr){

//         var result = [];

//         for (var x = 0; x < arr.length; x++){
//             for (var y = 0; y < arr[x].length; y++){

//             result.push(arr[x][y]);

//             }
//         }

//         return result;
//     }

//     allTimerData1d = get1DArray(allTimerData);

//     var timersData = allTimerData1d;
//     // console.log($scope.timerData);
//     return timersData;
// };

    //*****Ende Local Storage Array "medis" holen, um in gewünschtes Format umzuwandeln
    

    //zeiten generieren
    //plugin twix hilft moment für time ranges
    var startTime = moment("2015-06-19 06:00", "YYYY-MM-DD HH:mm");
    var endTime = moment("2015-06-20 05:30", "YYYY-MM-DD HH:mm");

    var itr = moment.twix(startTime, endTime).iterate(0.5, "hours");
    var range = [];
    while (itr.hasNext()) {
        range.push(itr.next().format('LT'));
    }

    range.push("05:30");

    return {

        //zeiten für Formular bereitstellen
        alleZeiten: function() {
            return range;
        },

        timerData: function() {
            return timerData;
        },

        timersData: function() {
            // return convertArr();
        }

    };
});


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
