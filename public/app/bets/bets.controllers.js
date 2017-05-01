(function() {
	'use strict';

	angular
		.module(APP_NAME)
		.controller('BetsController', BetsController);

	function BetsController() {
		var vm = this;

		vm.helloWorld = 'Hello World!';
	}
})();