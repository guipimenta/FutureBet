(function() {
	'use strict';

	angular
		.module(APP_NAME)
		.controller('MatchesController', MatchesController);

	MatchesController
		.$inject = [
			'Bet',
			'Match'
		]

	function MatchesController(Bet, Match) {
		var vm = this;
		vm.matches = [];
		activate();

		function activate() {
			Match.query(function(data) {
				vm.matches = data;
			});
		}
	}
})();