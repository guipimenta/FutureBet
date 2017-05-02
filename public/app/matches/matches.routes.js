(function() {
	'use strict';

	angular
		.module(APP_NAME)
		.config(BetsRoutes);

	function BetsRoutes($routeProvider, $locationProvider) {
		$routeProvider
            .when('/matches', {
                templateUrl: 'partials/matches/matches.html',
                controller: 'MatchesController',
				controllerAs: 'Ctrl'
			});
		$locationProvider
		  .html5Mode(true);
    }
})();