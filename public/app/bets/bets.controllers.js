(function() {
	'use strict';

	angular
		.module(APP_NAME)
		.controller('BetsController', BetsController);

	BetsController
		.$inject = [
			'Bet',
			'$routeParams'
		]

	function BetsController(Bet, $routeParams) {
		var vm = this;
		vm.bets = [];
		activate();

		function activate() {
			Bet.query({id: $routeParams.id}, function(data) {
				vm.bets = data;
			});
		}
	}
})();