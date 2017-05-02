(function() {
	'use strict';
	angular
        .module(APP_NAME)
        .factory('Bet', Bet);

    Bet.$inject = [
    	'$resource'
    ];

    function Bet($resource){ 
    	return $resource('bets/all/:id');
    }
})();