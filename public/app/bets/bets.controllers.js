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
		vm.buyBets = [];
        vm.sellBets = [];
		vm.matchName = "";
		activate();

		function activate() {
			Bet.get({id: $routeParams.id}, function(data) {
				vm.buyBets = data.buyBets;
                vm.sellBets = data.sellBets;
				vm.matchName = data.matchName;
			});
		}
	}
})();