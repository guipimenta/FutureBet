(function() {
	'use strict';
	angular
        .module(APP_NAME)
        .factory('Match', Match);

    Match.$inject = ['$resource'];

    function Match($resource){ 
    	return $resource('matches/all');
    }
})();