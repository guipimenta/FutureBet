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
        vm.placeBet = placeBet;
		activate();

		function activate() {
			Bet.get({id: $routeParams.id}, function(data) {
				vm.buyBets = data.buyBets;
                vm.sellBets = data.sellBets;
				vm.matchName = data.matchName;
			});
		}

        function placeBet() {
            var bet = new Bet();
            bet.side = vm.side;
            bet.size = vm.size;
            bet.price = vm.price;
            bet.matchId = $routeParams.id;
            bet.$place(function() {
                activate();
            });
        }
	}
})();