(function() {
	'use strict';

	angular
		.module(APP_NAME)
		.config(BetsRoutes);

	function BetsRoutes($routeProvider, $locationProvider) {
		$routeProvider
            .when('/bets', {
                templateUrl: 'partials/bets/bets.html',
                controller: 'BetsController',
				controllerAs: 'Ctrl'
			})
			.otherwise({
				redirect: '/aaa'
			});
		$locationProvider
		  .html5Mode(true);
    }
})();