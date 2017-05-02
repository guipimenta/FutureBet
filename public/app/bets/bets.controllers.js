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
		vm.matchName = "";
		activate();

		function activate() {
			Bet.get({id: $routeParams.id}, function(data) {
				vm.bets = data.bets;
				vm.matchName = data.matchName;
			});
		}
	}
})();