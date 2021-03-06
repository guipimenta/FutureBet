(function() {
	'use strict';

	angular
		.module(APP_NAME)
		.config(BetsRoutes);

	function BetsRoutes($routeProvider, $locationProvider) {
		$routeProvider
            .when('/bets/:id', {
                templateUrl: 'partials/bets/bets.html',
                controller: 'BetsController',
				controllerAs: 'Ctrl'
			});
		$locationProvider
		  .html5Mode(true);
    }
})();