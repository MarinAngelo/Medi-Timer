angular.module('mediApp.services', [])

.factory('$localstorage', ['$window', function($window) {

      return {
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '[]');
        }
    };

}])

.factory('Timer', function() {

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
        }
        
    };
});


