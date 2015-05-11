angular.module('mediApp.services', [])

.factory('Medis', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var medis = [{
    id: 0,
    name: 'Aspirin',
  }, {
    id: 1,
    name: 'Panodol',
  }];

  return {
    all: function() {
      return medis;
    },
    remove: function(medi) {
      medis.splice(medis.indexOf(medi), 1);
    },
    get: function(mediId) {
      for (var i = 0; i < medis.length; i++) {
        if (medis[i].id === parseInt(mediId)) {
          return medis[i];
        }
      }
      return null;
    }
  };
});
